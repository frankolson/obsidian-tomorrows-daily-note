import { TFile } from 'obsidian';
import {
  getAllDailyNotes,
  getDailyNote,
  createDailyNote,
  appHasDailyNotesPluginLoaded,
} from 'obsidian-daily-notes-interface';
import { getNextDailyNoteDate } from '../core/dates';
import { triggerDailyNotesDependencyNotice } from './notice';

export async function openNextDailyNote(skipWeekends: boolean, newTab: boolean = false): Promise<void> {
  if (!validateDailyNotesPluginLoaded()) return;

  const date = getNextDailyNoteDate(skipWeekends);
  const note = await getOrCreateNextDailyNote(date)
  
  if (note) openNote(note, newTab);
}

async function getOrCreateNextDailyNote(date: moment.Moment): Promise<TFile | void> {
  let nextDailyNote = getDailyNote(date, getAllDailyNotes())
  if (!nextDailyNote) {
    nextDailyNote = await createDailyNote(date)
  }

  return nextDailyNote
}

async function openNote(file: TFile, newTab: boolean): Promise<void> {
  const { workspace } = window.app;
  const leaf = workspace.getLeaf(newTab);
  await leaf.openFile(file, { active: true });
}

function validateDailyNotesPluginLoaded(): boolean {
  if (!appHasDailyNotesPluginLoaded()) {
    triggerDailyNotesDependencyNotice();
    return false;
  }

  return true;
}

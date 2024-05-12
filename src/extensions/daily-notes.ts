import { TFile } from 'obsidian';
import {
  getAllDailyNotes,
  getDailyNote,
  createDailyNote,
} from 'obsidian-daily-notes-interface';
import { getNextDailyNoteDate } from '../core/dates';

export async function openNextDailyNote(skipWeekends: boolean): Promise<void> {
  const date = getNextDailyNoteDate(skipWeekends);
  const note = await getOrCreateNextDailyNote(date)
  
  if (note) openNote(note);
}

async function getOrCreateNextDailyNote(date: moment.Moment): Promise<TFile | void> {
  let nextDailyNote = getDailyNote(date, getAllDailyNotes())
  if (!nextDailyNote) {
    nextDailyNote = await createDailyNote(date)
  }

  return nextDailyNote
}

async function openNote(file: TFile): Promise<void> {
  const { workspace } = window.app;
  const leaf = workspace.getLeaf(false);
  await leaf.openFile(file, { active: true });
}

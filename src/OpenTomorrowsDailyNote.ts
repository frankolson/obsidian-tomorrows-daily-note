import { Notice, TFile } from 'obsidian';
import {
  appHasDailyNotesPluginLoaded,
  getAllDailyNotes,
  getDailyNote,
  createDailyNote
} from 'obsidian-daily-notes-interface';

export async function openTomorrowsDailyNote(): Void {
  if (!appHasDailyNotesPluginLoaded()) {
    sendDisabledDailyNotesAlert()

    return
  }

  const tomorrowsDailyNote = await getOrCreateTomorrowsDailyNote()
  if (!tomorrowsDailyNote) { return }

  await openFile(tomorrowsDailyNote)
}

function sendDisabledDailyNotesAlert() {
  new Notice('The Daily Notes plugin needs to be enabled for this command to work')
  console.error('The Daily Notes plugin needs to be enabled to open tomorrow\'s daily note')
}

function sendFailedDailyNotesAlert(error: Error) {
  new Notice('Failed to find your daily notes folder')
  console.error('failed to find your daily notes folder', error)
}

async function getOrCreateTomorrowsDailyNote(): TFile | Void {
  try {
    let tomorrowsDailyNote = getTomorrowsDailyNote()
    if (!tomorrowsDailyNote) {
      tomorrowsDailyNote = await createDailyNote(getTomorrowsDate())
    }

    return tomorrowsDailyNote
  } catch (err) {
    sendFailedDailyNotesAlert(err)

    return
  }
}

function getTomorrowsDailyNote(): TFile | Void {
  try {
    return getDailyNote(
      getTomorrowsDate(),
      getAllDailyNotes()
    )
  } catch (err) {
    sendFailedDailyNotesAlert(err)

    return
  }
}

async function openFile(file): Void {
  const { workspace } = window.app
  const leaf = workspace.getUnpinnedLeaf()
  await leaf.openFile(file, { active: true });
}

function getTomorrowsDate() {
  const { moment } = window
  return moment().add(1, 'days')
}

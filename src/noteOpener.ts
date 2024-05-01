import { Notice, TFile } from 'obsidian';
import {
  appHasDailyNotesPluginLoaded,
  getAllDailyNotes,
  getDailyNote,
  createDailyNote
} from 'obsidian-daily-notes-interface';
import { openFile } from './utils';

export async function openTomorrowsDailyNote(skipWeekends: boolean = false): Promise<void> {
  if (!appHasDailyNotesPluginLoaded()) {
    sendDisabledDailyNotesAlert()

    return
  }

  const nextDailyNote = await getOrCreateNextDailyNote(skipWeekends)
  if (!nextDailyNote) { return }

  await openFile(nextDailyNote)
}

function sendDisabledDailyNotesAlert() {
  new Notice('The Daily Notes plugin needs to be enabled for this command to work')
  console.error('The Daily Notes plugin needs to be enabled to open tomorrow\'s daily note')
}

function sendFailedDailyNotesAlert(error: Error) {
  new Notice('Failed to find your daily notes folder')
  console.error('failed to find your daily notes folder', error)
}

async function getOrCreateNextDailyNote(skipWeekends: boolean): Promise<TFile | void> {
  try {
    const nextDate = getNextDate(skipWeekends)
    let nextDailyNote = getDailyNoteSafe(nextDate)
    if (!nextDailyNote) {
      nextDailyNote = await createDailyNote(nextDate)
    }

    return nextDailyNote
  } catch (err) {
    sendFailedDailyNotesAlert(err)

    return
  }
}

function getNextDate(skipWeekends: boolean): moment.Moment {
  let nextDate = window.moment().add(1, 'day')

  if (skipWeekends && isWeekend(nextDate)) {
    nextDate = getNextWeekday(nextDate)
  }

  return nextDate
}

function isWeekend(date: moment.Moment): boolean {
  return date.isoWeekday() > 5
}

function getNextWeekday(date: moment.Moment): moment.Moment {
  let nextDate = date
  while (isWeekend(nextDate)) {
    nextDate = nextDate.add(1, 'day')
  }

  return nextDate
}

function getDailyNoteSafe(date: moment.Moment): TFile | void {
  try {
    return getDailyNote(date, getAllDailyNotes())
  } catch (err) {
    sendFailedDailyNotesAlert(err)

    return
  }
}

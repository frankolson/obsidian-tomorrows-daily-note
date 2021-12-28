import { Plugin, Notice } from "obsidian";
import {
  appHasDailyNotesPluginLoaded,
  createDailyNote
} from "obsidian-daily-notes-interface";

export default class TomorrowsDailyNote extends Plugin {

  createTomorrowsDailyNote() {
    if (appHasDailyNotesPluginLoaded()) {
      const { moment } = window
      const tomorrow = moment().add(1, 'days')

      createDailyNote(tomorrow)
    } else {
      new Notice("The Daily Notes plugin needs to be enabled for this command to work")
    }
  }

  onload() {
    console.log("Loading plugin: Tomorrow's Daily Note")

    this.addCommand({
      id: 'create-tomorrows-daily-note',
      name: 'Create tomorrow\'s daily note',
      callback: () => {
        this.createTomorrowsDailyNote()
      }
    })
  }

	onunload() {
    console.log("Unloading plugin: Tomorrow's Daily Note")
  }
}

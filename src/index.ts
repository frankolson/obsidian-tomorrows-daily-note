import { Notice, Plugin } from "obsidian";
import { appHasDailyNotesPluginLoaded } from 'obsidian-daily-notes-interface';
import { openTomorrowsDailyNote } from "./OpenTomorrowsDailyNote";

export default class TomorrowsDailyNote extends Plugin {

  onload() {
    console.log("Loading plugin: Tomorrow's Daily Note")

    this.addCommand({
      id: 'create-tomorrows-daily-note',
      name: 'Open tomorrow\'s daily note',
      checkCallback: (checking: boolean) => {
        if (!checking) {
          if (appHasDailyNotesPluginLoaded()) {
            openTomorrowsDailyNote()
          } else {
            this.alertUserToEnableDailyNotesPlugin()
          }
        }

        return true
      }
    })

    this.addRibbonIcon('calendar-plus', 'Open tomorrow\'s daily note', () => {
      if (appHasDailyNotesPluginLoaded()) {
        openTomorrowsDailyNote()
      } else {
        this.alertUserToEnableDailyNotesPlugin()
      }
    })
  }

	onunload() {
    console.log("Unloading plugin: Tomorrow's Daily Note")
  }

  alertUserToEnableDailyNotesPlugin() {
    new Notice('Please enable the Daily Notes plugin to use this feature.')
  }
}

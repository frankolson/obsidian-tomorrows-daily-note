import { Plugin } from "obsidian";
import { appHasDailyNotesPluginLoaded } from 'obsidian-daily-notes-interface';
import { openTomorrowsDailyNote } from "./OpenTomorrowsDailyNote";

export default class TomorrowsDailyNote extends Plugin {

  onload() {
    console.log("Loading plugin: Tomorrow's Daily Note")

    this.addCommand({
      id: 'create-tomorrows-daily-note',
      name: 'Open tomorrow\'s daily note',
      checkCallback: (checking: boolean) => {
        if (appHasDailyNotesPluginLoaded()) {
          if (!checking) {
            openTomorrowsDailyNote()
          }

          return true
        }

        return false
      }
    })
  }

	onunload() {
    console.log("Unloading plugin: Tomorrow's Daily Note")
  }
}

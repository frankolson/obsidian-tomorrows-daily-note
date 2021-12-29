import { Plugin } from "obsidian";
import { openTomorrowsDailyNote } from "./OpenTomorrowsDailyNote";

export default class TomorrowsDailyNote extends Plugin {

  onload() {
    console.log("Loading plugin: Tomorrow's Daily Note")

    this.addCommand({
      id: 'create-tomorrows-daily-note',
      name: 'Open tomorrow\'s daily note',
      callback: () => openTomorrowsDailyNote()
    })
  }

	onunload() {
    console.log("Unloading plugin: Tomorrow's Daily Note")
  }
}

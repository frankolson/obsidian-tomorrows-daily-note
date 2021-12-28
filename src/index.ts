import { Plugin, Notice } from "obsidian";

export default class TomorrowsDailyNote extends Plugin {

  onload() {
    console.log("Loading plugin: Tomorrow's Daily Note");

    this.addCommand({
      id: 'create-tomorrows-daily-note',
      name: 'Create tomorrow\'s daily note',
      callback: () => {
        new Notice('Test for creating the next daily note...')
      }
    });
  }

	onunload() {
    console.log("Unloading plugin: Tomorrow's Daily Note");
  }
}

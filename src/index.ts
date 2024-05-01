import { Notice, Plugin } from "obsidian";
import { appHasDailyNotesPluginLoaded } from 'obsidian-daily-notes-interface';
import { openTomorrowsDailyNote } from "./OpenTomorrowsDailyNote";
import { TomorrowsDailyNoteSettingTab, TomorrowsDailyNoteSettings } from "./settings";

const DEFAULT_SETTINGS: Partial<TomorrowsDailyNoteSettings> = {
  skipWeekends: false
}

export default class TomorrowsDailyNote extends Plugin {
  settings: TomorrowsDailyNoteSettings;

  async onload() {
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

    await this.loadSettings();

    this.addSettingTab(new TomorrowsDailyNoteSettingTab(this.app, this));
  }

	onunload() {
    console.log("Unloading plugin: Tomorrow's Daily Note")
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  alertUserToEnableDailyNotesPlugin() {
    new Notice('Please enable the Daily Notes plugin to use this feature.')
  }
}

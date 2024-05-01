import { Notice, Plugin } from "obsidian";
import { appHasDailyNotesPluginLoaded } from 'obsidian-daily-notes-interface';
import { openTomorrowsDailyNote } from "./noteOpener";
import {
  TomorrowsDailyNoteSettingTab,
  TomorrowsDailyNoteSettings
} from "./settings";

const DEFAULT_SETTINGS: Partial<TomorrowsDailyNoteSettings> = {
  skipWeekends: false
}

export default class TomorrowsDailyNote extends Plugin {
  settings: TomorrowsDailyNoteSettings;

  async onload() {
    console.log("Loading plugin: Tomorrow's Daily Note")

    await this.initializeSettings()
    this.registerCommands()
    this.registerRibbonIcon()
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

  private async initializeSettings() {
    await this.loadSettings();
    this.addSettingTab(new TomorrowsDailyNoteSettingTab(this.app, this));
  }

  private registerCommands() {
    this.addCommand({
      id: 'create-tomorrows-daily-note',
      name: 'Open tomorrow\'s daily note',
      checkCallback: (checking: boolean) => {
        if (!checking) {
          if (appHasDailyNotesPluginLoaded()) {
            openTomorrowsDailyNote(this.settings.skipWeekends)
          } else {
            this.alertUserToEnableDailyNotesPlugin()
          }
        }

        return true
      }
    })
  }

  private registerRibbonIcon() {
    this.addRibbonIcon('calendar-plus', 'Open tomorrow\'s daily note', () => {
      if (appHasDailyNotesPluginLoaded()) {
        openTomorrowsDailyNote()
      } else {
        this.alertUserToEnableDailyNotesPlugin()
      }
    })
  }

  private alertUserToEnableDailyNotesPlugin() {
    new Notice('Please enable the Daily Notes plugin to use this feature.')
  }
}

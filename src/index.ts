import { Plugin } from "obsidian";
import { appHasDailyNotesPluginLoaded } from "obsidian-daily-notes-interface";
import {
  DEFAULT_SETTINGS,
  TomorrowsDailyNoteSettingTab,
  TomorrowsDailyNoteSettings
} from "./settings";
import { triggerDailyNotesDependencyNotice } from "./extensions/notice";
import { CommandHandler } from "./handlers/command-handler";
import { RibbonHandler } from "./handlers/ribbon-handler";

export default class TomorrowsDailyNote extends Plugin {
  settings: TomorrowsDailyNoteSettings;
  commandHandler: CommandHandler;
  ribbonHandler: RibbonHandler;

  async onload() {

    await this.loadSettings()
    
    this.commandHandler = new CommandHandler(this)
    this.ribbonHandler = new RibbonHandler(this)
    this.dependencyCheck()
  }

	onunload() {
    this.commandHandler.tearDown()
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.addSettingTab(new TomorrowsDailyNoteSettingTab(this.app, this));
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  dependencyCheck() {
    this.app.workspace.onLayoutReady(() => {
      if (!appHasDailyNotesPluginLoaded()) {
        triggerDailyNotesDependencyNotice();
      }
    })
  }
}

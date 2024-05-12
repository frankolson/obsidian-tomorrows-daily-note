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
    console.log("Loading plugin: Tomorrow's Daily Note")

    await this.loadSettings()

    if (!appHasDailyNotesPluginLoaded()) {
      triggerDailyNotesDependencyNotice();
    }
    
    this.commandHandler = new CommandHandler(this)
    this.ribbonHandler = new RibbonHandler(this)

    this.commandHandler.setup()
    this.ribbonHandler.setup()
  }

	onunload() {
    console.log("Unloading plugin: Tomorrow's Daily Note")
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.addSettingTab(new TomorrowsDailyNoteSettingTab(this.app, this));
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

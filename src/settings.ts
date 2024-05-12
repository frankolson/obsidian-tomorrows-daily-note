import TomorrowsDailyNote from "./index";
import { App, PluginSettingTab, Setting } from "obsidian";

export interface TomorrowsDailyNoteSettings {
  skipWeekends: boolean;
}

export const DEFAULT_SETTINGS: Partial<TomorrowsDailyNoteSettings> = {
  skipWeekends: false
};

export class TomorrowsDailyNoteSettingTab extends PluginSettingTab {
  plugin: TomorrowsDailyNote;

  constructor(app: App, plugin: TomorrowsDailyNote) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("Skip Weekends")
      .setDesc("Skip weekends when opening tomorrow's daily note")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.skipWeekends)
          .onChange(async (value) => {
            this.plugin.settings.skipWeekends = value;
            await this.plugin.saveSettings();
          })
      );
  }
}

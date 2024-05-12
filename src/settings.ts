import TomorrowsDailyNote from "./index";
import { App, PluginSettingTab, Setting } from "obsidian";

export interface TomorrowsDailyNoteSettings {
  skipWeekends: boolean;
  enableRibbonIcon: boolean;
}

export const DEFAULT_SETTINGS: Partial<TomorrowsDailyNoteSettings> = {
  skipWeekends: false,
  enableRibbonIcon: true,
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

    new Setting(containerEl)
      .setName("Show icon in sidebar")
      .setDesc("Show Tomorrow's Daily Note icon in the sidebar ribbon, allowing you to open tomorrow's daily note with a single click.")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.enableRibbonIcon)
          .onChange(async (enableRibbonIcon) => {
            this.plugin.settings.enableRibbonIcon = enableRibbonIcon;
            await this.plugin.saveSettings();

            if (enableRibbonIcon) {
              this.plugin.ribbonHandler.addRibbonIcon();
            } else {
              this.plugin.ribbonHandler.removeRibbonIcon();
            }
          })
      );
  }
}

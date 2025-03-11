import { Platform } from "obsidian";
import TomorrowsDailyNote from "src";
import { openNextDailyNote } from 'src/extensions/daily-notes';

export const RIBBON_ICON_ID = 'tomorrows-daily-note-ribbon-icon';

export class RibbonHandler {
  private plugin: TomorrowsDailyNote;

  constructor(plugin: TomorrowsDailyNote) {
    this.plugin = plugin;
    this.setup();
  }

  setup() {
    this.addRibbonIcon();
  }

  addRibbonIcon() {
    this.plugin
      .addRibbonIcon(
        'calendar-plus',
        'Open tomorrow\'s daily note',
        async (event: MouseEvent) => {
          await openNextDailyNote({
            skipWeekends: this.plugin.settings.skipWeekends,
            newTab: this.useNewTab(event)
          });
        }
      )
      .setAttribute("id", RIBBON_ICON_ID)
  }

  removeRibbonIcon() {
    document
      .getElementById(RIBBON_ICON_ID)
      ?.remove();
  }

  useNewTab(event: MouseEvent): boolean {
    const systemMetaKey = Platform.isMacOS ? event.metaKey : event.ctrlKey;
    return event.button === 1 || systemMetaKey;
  }
}
import { Platform } from "obsidian";
import { appHasDailyNotesPluginLoaded } from 'obsidian-daily-notes-interface';
import TomorrowsDailyNote from "src";
import { triggerDailyNotesDependencyNotice } from 'src/extensions/notice';
import { openNextDailyNote } from 'src/extensions/daily-notes';

export const RIBBON_ICON_ID = 'tomorrows-daily-note-ribbon-icon';

export class RibbonHandler {
  private plugin: TomorrowsDailyNote;

  constructor(plugin: TomorrowsDailyNote) {
    this.plugin = plugin;
  }

  setup() {
    if (this.plugin.settings.enableRibbonIcon) {
      this.addRibbonIcon();
    }
  }

  addRibbonIcon() {
    this.plugin
      .addRibbonIcon(
        'calendar-plus',
        'Open tomorrow\'s daily note',
        async (event: MouseEvent) => {
          if (!appHasDailyNotesPluginLoaded()) {
            triggerDailyNotesDependencyNotice();
            return;
          } else {
            const metaKey = Platform.isMacOS ? event.metaKey : event.ctrlKey;
            const newTab = event.button === 1 || metaKey;
            await openNextDailyNote(this.plugin.settings.skipWeekends, newTab);
          }
        }
      )
      .setAttribute("id", RIBBON_ICON_ID)
  }

  removeRibbonIcon() {
    document
      .getElementById(RIBBON_ICON_ID)
      ?.remove();
  }
}
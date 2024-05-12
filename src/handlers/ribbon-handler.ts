import { appHasDailyNotesPluginLoaded } from 'obsidian-daily-notes-interface';
import TomorrowsDailyNote from "src";
import { triggerDailyNotesDependencyNotice } from 'src/extensions/notice';
import { openNextDailyNote } from 'src/extensions/daily-notes';

export class RibbonHandler {
  private plugin: TomorrowsDailyNote;

  constructor(plugin: TomorrowsDailyNote) {
    this.plugin = plugin;
  }

  setup() {
    this.plugin.addRibbonIcon(
      'calendar-plus',
      'Open tomorrow\'s daily note',
      () => {
        if (!appHasDailyNotesPluginLoaded()) {
          triggerDailyNotesDependencyNotice();
          return;
        } else {
          openNextDailyNote(this.plugin.settings.skipWeekends);
        }
      }
    )
  }
}
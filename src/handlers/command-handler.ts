import { appHasDailyNotesPluginLoaded } from 'obsidian-daily-notes-interface';
import TomorrowsDailyNote from "src";
import { triggerDailyNotesDependencyNotice } from "src/extensions/notice";
import { openNextDailyNote } from "src/extensions/daily-notes";

export class CommandHandler {
  private plugin: TomorrowsDailyNote;

  constructor(plugin: TomorrowsDailyNote) {
    this.plugin = plugin;
  }

  setup() {
    this.plugin.addCommand({
      id: 'create-tomorrows-daily-note',
      name: 'Open tomorrow\'s daily note',
      checkCallback: (checking: boolean) => {
        if (!checking) {
          if (!appHasDailyNotesPluginLoaded()) {
            triggerDailyNotesDependencyNotice();
            return;
          } else {
            openNextDailyNote(this.plugin.settings.skipWeekends);
          }
        }

        return true
      }
    })
  }
}
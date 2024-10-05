import { Platform } from "obsidian";
import TomorrowsDailyNote from "src";
import { openNextDailyNote } from "src/extensions/daily-notes";

export class CommandHandler {
  private plugin: TomorrowsDailyNote;
  private systemModifierKeyPressed: boolean = false;

  constructor(plugin: TomorrowsDailyNote) {
    this.plugin = plugin;
  }

  setup() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));

    this.plugin.addCommand({
      id: 'create-tomorrows-daily-note',
      name: 'Open tomorrow\'s daily note',
      checkCallback: (checking: boolean) => {
        if (!checking) {
          openNextDailyNote(
            this.plugin.settings.skipWeekends,
            this.useNewTab()
          );
        }

        return true
      }
    })
  }

  tearDown() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
    document.removeEventListener('keyup', this.handleKeyUp.bind(this));
  }

  handleKeyDown(event: KeyboardEvent) {
    const systemMetaKey = Platform.isMacOS ? event.metaKey : event.ctrlKey;
    if (systemMetaKey) {
      this.systemModifierKeyPressed = true;
    }
  }

  handleKeyUp(event: KeyboardEvent) {
    const systemMetaKey = Platform.isMacOS ? event.metaKey : event.ctrlKey;
    if (systemMetaKey) {
      this.systemModifierKeyPressed = false;
    }
  }

  useNewTab(): boolean {
    return this.systemModifierKeyPressed;
  }
}
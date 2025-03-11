import { Platform, App, Modal, Setting } from "obsidian";
import TomorrowsDailyNote from "src";
import { openNextDailyNote } from "src/extensions/daily-notes";

export class CommandHandler {
  private plugin: TomorrowsDailyNote;
  private systemModifierKeyPressed: boolean = false;

  constructor(plugin: TomorrowsDailyNote) {
    this.plugin = plugin;
    this.setup();
  }

  setup() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));

    this.plugin.addCommand({
      id: 'create-tomorrows-daily-note',
      name: 'Open tomorrow\'s daily note',
      checkCallback: (checking: boolean) => {
        if (!checking) {
          openNextDailyNote({
            skipWeekends: this.plugin.settings.skipWeekends,
            newTab: this.useNewTab()
          });
        }

        return true
      }
    })

    this.plugin.addCommand({
      id: 'create-multiple-future-daily-notes',
      name: 'Open multiple future daily notes',
      checkCallback: (checking: boolean) => {
        if (!checking) {
          new FutureNotesModal(this.plugin.app, (result) => {
            for (let i = 0; i < result; i++) {
              openNextDailyNote({
                skipWeekends: this.plugin.settings.skipWeekends,
                newTab: this.useNewTab(),
                offset: i + 1
              });
            }
          }).open();
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

export class FutureNotesModal extends Modal {
  constructor(app: App, onSubmit: (result: number) => void) {
    super(app);
	  
	  let count = 1;
    new Setting(this.contentEl)
      .setName('How many future daily notes do you want to create?')
      .setDesc('Enter a number greater than 0')
      .addText((inputField) => {
        inputField.inputEl.type = "number";
        inputField.inputEl.min = "1";
        inputField.setValue(String(count));
        inputField.onChange(async (value) => {
          count = Number(value);
        });
      });

    new Setting(this.contentEl)
      .addButton((btn) =>
        btn
          .setButtonText('Create')
          .setDisabled(count <= 0)
          .setCta()
          .onClick(() => {
            this.close();
            onSubmit(count);
          }));
  }
}
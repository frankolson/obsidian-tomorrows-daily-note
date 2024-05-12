import { Notice } from "obsidian";

export function triggerDailyNotesDependencyNotice() {
  new Notice('Please enable the Daily Notes plugin to use this feature.')
}
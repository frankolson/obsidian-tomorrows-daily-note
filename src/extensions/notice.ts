import { Notice } from "obsidian";

export function triggerDailyNotesDependencyNotice() {
  new Notice('Please enable the "Daily Notes" plugin to use the "Tomorrow\'s Daily Note" plugin.')
}
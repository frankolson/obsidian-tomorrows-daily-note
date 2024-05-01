import { TFile } from 'obsidian';

export async function openFile(file: TFile): Promise<void> {
  const { workspace } = window.app;
  const leaf = workspace.getLeaf(false);
  await leaf.openFile(file, { active: true });
}

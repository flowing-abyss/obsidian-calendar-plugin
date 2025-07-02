import type { Moment } from "moment";
import type { TFile } from "obsidian";
import {
  createQuarterlyNote, // Ensure this function exists in the interface
  getQuarterlyNoteSettings,
} from "obsidian-daily-notes-interface";

import type { ISettings } from "src/settings";
import { createConfirmationDialog } from "src/ui/modal";

/**
 * Create a Quarterly Note for a given date.
 */
export async function tryToCreateQuarterlyNote(
  date: Moment,
  inNewSplit: boolean,
  settings: ISettings,
  cb?: (newFile: TFile) => void
): Promise<void> {
  const { workspace } = window.app;
  const { format } = getQuarterlyNoteSettings();
  const filename = date.format(format);

  const createFile = async () => {
    try {
      const quarterlyNote = await createQuarterlyNote(date);
      const leaf = inNewSplit
        ? workspace.splitActiveLeaf()
        : workspace.getUnpinnedLeaf();

      await leaf.openFile(quarterlyNote, { active: true });
      cb?.(quarterlyNote);
    } catch (error) {
      console.error(`Error creating quarterly note "${filename}":`, error);
    }
  };

  if (settings.shouldConfirmBeforeCreate) {
    createConfirmationDialog({
      cta: "Create",
      onAccept: createFile,
      text: `File "${filename}" does not exist. Would you like to create it?`,
      title: "New Quarterly Note",
    });
  } else {
    await createFile();
  }
}

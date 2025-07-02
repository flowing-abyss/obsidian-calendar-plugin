import type { ISettings } from "src/settings";

export function getDefaultSettings(
  overrides: Partial<ISettings> = {}
): ISettings {
  return Object.assign(
    {},
    {
      weekStart: "sunday",
      shouldConfirmBeforeCreate: false,
      ctrlClickOpensInNewTab: false,
      wordsPerDot: 50,
      showWeeklyNote: false,
      showQuarter: true,
      showWeeklyNoteRight: false,
      weeklyNoteFolder: "",
      weeklyNoteFormat: "",
      weeklyNoteTemplate: "",
    },
    overrides
  );
}

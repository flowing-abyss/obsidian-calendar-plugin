import type { Moment } from "moment";
import type { ICalendarSource, IDayMetadata } from "obsidian-calendar-ui";
import { getDailyNote, getWeeklyNote } from "obsidian-daily-notes-interface";
import { get } from "svelte/store";

import { dailyNotes, weeklyNotes } from "../stores";

function getNoteReviewed(note: TFile | null): string[] {
  if (!note) {
    return [];
  }

  const { metadataCache } = window.app;
  const frontmatter = metadataCache.getFileCache(note)?.frontmatter;

  return frontmatter.reviewed;
}

function getReviewedAttribute(note: TFile | null): Record<string, string> {
  const attrs: Record<string, string> = {};
  const isReviewed = getNoteReviewed(note);

  attrs["data-reviewed"] = isReviewed;

  return attrs;
}

export const customReviewedSource: ICalendarSource = {
  getDailyMetadata: async (date: Moment): Promise<IDayMetadata> => {
    const file = getDailyNote(date, get(dailyNotes));
    return {
      dataAttributes: getReviewedAttribute(file),
      dots: [],
    };
  },
  getWeeklyMetadata: async (date: Moment): Promise<IDayMetadata> => {
    const file = getWeeklyNote(date, get(weeklyNotes));
    return {
      dataAttributes: getReviewedAttribute(file),
      dots: [],
    };
  },
};

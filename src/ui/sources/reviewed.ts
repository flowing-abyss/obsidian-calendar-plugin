import type { Moment } from "moment";
import type { TFile } from "obsidian";
import type { ICalendarSource, IDayMetadata } from "obsidian-calendar-ui";
import { getDailyNote, getWeeklyNote } from "obsidian-daily-notes-interface";
import { get } from "svelte/store";

import { dailyNotes, weeklyNotes } from "../stores";

function getNoteReviewed(note: TFile | null): boolean | null {
  if (!note) {
    return null;
  }

  const { metadataCache } = window.app;
  const fileCache = metadataCache.getFileCache(note);
  if (!fileCache || !fileCache.frontmatter) {
    return null;
  }

  const reviewed = fileCache.frontmatter.reviewed;
  if (reviewed === undefined) {
    return null;
  }

  return reviewed === true || reviewed === "true";
}

function getReviewedAttribute(note: TFile | null): Record<string, string> {
  const attrs: Record<string, string> = {};
  const isReviewed = getNoteReviewed(note);

  if (isReviewed !== null) {
    attrs["data-reviewed"] = isReviewed ? "true" : "false";
  }

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

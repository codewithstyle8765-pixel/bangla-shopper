/** Type definitions for the header announcement bar (home page API `announcement_bar`). */
export interface AnnouncementItem {
  id: string;
  text: string;
  link?: string;
}

/** Fixed text on either side of the rotating messages; `icon` is "EMAIL" for the mail icon. */
export interface AnnouncementSide {
  icon?: string;
  text: string;
  link?: string;
}

export interface AnnouncementBarData {
  left?: AnnouncementSide;
  messages: AnnouncementItem[];
  right?: AnnouncementSide;
}

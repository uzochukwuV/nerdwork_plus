export type Comic = {
  id: number;
  image: string;
  title: string;
  short_description: string;
  status: "upcoming" | "draft" | "scheduled" | "published";
  chapters: number;
  last_updated: string;
};

export type Chapter = {
  id: number;
  image: string;
  title: string;
  description: string;
  pages: number;
  status: "published" | "scheduled" | "draft";
  date: string;
  views?: number;
};

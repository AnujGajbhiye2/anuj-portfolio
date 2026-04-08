export type BlogContentBlock =
  | {
      type: 'paragraph';
      content: string;
    }
  | {
      type: 'list';
      items: string[];
    }
  | {
      type: 'quote';
      content: string;
    };

export interface BlogMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
}

export interface BlogPost extends BlogMeta {
  content: BlogContentBlock[];
}

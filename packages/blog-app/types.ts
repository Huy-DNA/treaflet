export type PostCollection = PostMeta[];

export type PostMeta = Omit<Post, 'content'>;

export interface Post {
  title: string;
  slug: string;
  createdAt: Date;
  modifiedAt: Date;
  summary?: string;
  content: string;
  tags: Tag[];
  thumbnailUrl: string;
}

export interface Tag {
  name: string;
}

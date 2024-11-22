
export type PostCollection = PostMeta[];

export type PostMeta = Omit<Post, 'content'>;

export interface Post {
  title: string;
  slug: string;
  createdAt: string;
  summary?: string;
  content: string;
  tags: Tag[];
}

export interface Tag {
  name: string;
}

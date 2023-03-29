export { }

declare global {
  interface PostMeta {
    id: string
    title: string
    summary: string
    createdAt: string
    modifiedAt: string
    thumbnailUrl?: string
    tag: string[]
  }
}
export default function comparePostTitle(p1: PostMeta, p2: PostMeta): -1 | 0 | 1  {
    return p1.title.localeCompare(p2.title) as -1 | 0 | 1
}
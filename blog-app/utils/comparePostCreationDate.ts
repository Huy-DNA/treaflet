import { DateTime } from 'luxon'

export default function comparePostCreationDate(p1: PostMeta, p2: PostMeta): -1 | 0 | 1 {
    const dt1 = DateTime.fromISO(p1.createdAt)
    const dt2 = DateTime.fromISO(p2.createdAt)
    return dt1 < dt2 ? 1 : -1
}
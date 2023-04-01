import { DateTime } from 'luxon'

export default function comparePostCreationDate(p1: PostMeta, p2: PostMeta): -1 | 0 | 1 {
    const dt1 = DateTime.fromFormat(p1.createdAt, "dd/M/yyyy").toMillis()
    const dt2 = DateTime.fromFormat(p2.createdAt, "dd/M/yyyy").toMillis()
    return dt1 < dt2 ? 1 : -1
}
import { DateTime } from 'luxon'

export default function extractDate(ISOString: string): string {
    return DateTime.fromISO(ISOString).toISODate()
}
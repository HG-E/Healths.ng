import { format, parseISO } from 'date-fns'

export function formatDate(dateString: string, pattern = 'MMMM d, yyyy'): string {
  try {
    return format(parseISO(dateString), pattern)
  } catch {
    return dateString
  }
}

export function formatShortDate(dateString: string): string {
  return formatDate(dateString, 'MMM d, yyyy')
}

interface GetNextDailyNoteDateOptions {
  skipWeekends?: boolean
  offset?: number
}

export function getNextDailyNoteDate(options?: GetNextDailyNoteDateOptions): moment.Moment {
  const { skipWeekends = false, offset = 1 } = options || {}
  let daysRemaining = offset
  let newDate = window.moment().clone()

  while (daysRemaining > 0) {
    newDate = newDate.add(1, 'day')
    if (skipWeekends && isWeekend(newDate)) {
      continue
    }
    daysRemaining--
  }

  return newDate
}

export function isWeekend(date: moment.Moment): boolean {
  return date.isoWeekday() > 5
}

export function getNextWeekday(date: moment.Moment): moment.Moment {
  let nextDate = date.add(1, 'day')
  
  while (isWeekend(nextDate)) {
    nextDate = nextDate.add(1, 'day')
  }

  return nextDate
}

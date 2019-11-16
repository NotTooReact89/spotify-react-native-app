import * as DateTimeUtils from './DateTimeUtils'

const timestamp = '2018-10-24T13:48:32+13:00'
const epochTime = 1540342112000

describe('generating time stamps', () => {
  it('should return the correct UTC timestamp', () => {
    expect(DateTimeUtils.toUtcTimestamp(timestamp)).toEqual(
      '2018-10-24T00:48:32'
    )
    expect(DateTimeUtils.toUtcTimestamp(epochTime)).toEqual(
      '2018-10-24T00:48:32'
    )
  })

  it('should return the correct local timestamp', () => {
    expect(DateTimeUtils.toTimestamp(timestamp)).toEqual(
      '2018-10-24T13:48:32+13:00'
    )
    expect(DateTimeUtils.toTimestamp(epochTime)).toEqual(
      '2018-10-24T13:48:32+13:00'
    )
  })

  it('should return the correct local epoch time from utc', () => {
    expect(DateTimeUtils.fromUtcToLocalEpochTime(timestamp)).toEqual(
      1540342112000
    )
    expect(DateTimeUtils.fromUtcToLocalEpochTime(epochTime)).toEqual(
      1540342112000
    )
  })
})

describe('formatting utils', () => {
  it('should return 24 hour time', () => {
    expect(DateTimeUtils.toTime(timestamp)).toEqual('13:48')
    expect(DateTimeUtils.toTime(epochTime)).toEqual('13:48')
  })

  it('should return compact date', () => {
    expect(DateTimeUtils.toCompactDate(timestamp)).toEqual('24 Oct')
    expect(DateTimeUtils.toCompactDate(epochTime)).toEqual('24 Oct')
  })

  it('should return date with month and year', () => {
    expect(DateTimeUtils.toCalendarMonth(timestamp)).toEqual('October 2018')
    expect(DateTimeUtils.toCalendarMonth(epochTime)).toEqual('October 2018')
  })

  it('should return date with year', () => {
    expect(DateTimeUtils.toDate(timestamp)).toEqual('24 October 2018')
    expect(DateTimeUtils.toDate(epochTime)).toEqual('24 October 2018')
  })

  it('should return a date string', () => {
    expect(DateTimeUtils.toDateString(timestamp)).toEqual('20181024')
    expect(DateTimeUtils.toDateString(epochTime)).toEqual('20181024')
  })
})

describe('get details', () => {
  it('should return the correct month', () => {
    expect(DateTimeUtils.getMonth(timestamp)).toEqual(9)
    expect(DateTimeUtils.getMonth(epochTime)).toEqual(9)
  })

  it('should return the correct day of the month', () => {
    expect(DateTimeUtils.getDayOfMonth(timestamp)).toEqual(24)
    expect(DateTimeUtils.getDayOfMonth(epochTime)).toEqual(24)
  })

  it('should return the correct day of the week', () => {
    expect(DateTimeUtils.getDayOfWeek(timestamp)).toEqual(3)
    expect(DateTimeUtils.getDayOfWeek(epochTime)).toEqual(3)
  })

  it('should return the correct epoch time for the start of the day', () => {
    expect(DateTimeUtils.getStartOfDayInEpochTime(timestamp)).toEqual(
      1540292400000
    )
    expect(DateTimeUtils.getStartOfDayInEpochTime(epochTime)).toEqual(
      1540292400000
    )
  })
})

describe('get durations', () => {
  it('should return the correct duration', () => {
    expect(DateTimeUtils.getDuration('PT2H59M')).toEqual('2h 59m')
    expect(DateTimeUtils.getDuration(10740000)).toEqual('2h 59m')
  })

  it('should get milliseconds between moments', () => {
    const moment1 = 1540342927478
    const moment2 = 1540342112929

    expect(DateTimeUtils.getDurationInMilliseconds(moment1, moment2)).toEqual(
      814549
    )
  })

  it('should return the correct duration in words', () => {
    const duration = 10740000 // 2 hours 59 minutes

    expect(DateTimeUtils.getDurationInWords(duration)).toEqual('3 hours')
  })
})

describe('date time manipulations', () => {
  it('should tell if dates are in the same day', () => {
    const today1 = '2018-10-24T09:48:32'
    const today2 = '2018-10-24T13:48:32'
    const tomorrow = '2018-10-25T13:48:32'

    expect(DateTimeUtils.isSameDay(today1, today2)).toEqual(true)
    expect(DateTimeUtils.isSameDay(today1, tomorrow)).toEqual(false)
  })

  it('should tell if date is within range', () => {
    const dateWithinRange = '2018-10-24T13:48:32'
    const dateOutOfRange = '2018-10-24T13:48:31'
    const date1 = '2018-10-24T13:48:32'
    const date2 = '2018-10-24T13:49:32'

    expect(
      DateTimeUtils.isDateWithinRange(dateWithinRange, date1, date2)
    ).toEqual(true)
    expect(
      DateTimeUtils.isDateWithinRange(dateOutOfRange, date1, date2)
    ).toEqual(false)
  })

  it('should add days to a date', () => {
    expect(DateTimeUtils.addDays(timestamp, 1)).toEqual(1540428512000)
    expect(DateTimeUtils.addDays(epochTime, 1)).toEqual(1540428512000)
  })

  it('should subtract days from a date', () => {
    expect(DateTimeUtils.subtractDays(timestamp, 1)).toEqual(1540255712000)
    expect(DateTimeUtils.subtractDays(epochTime, 1)).toEqual(1540255712000)
  })
})

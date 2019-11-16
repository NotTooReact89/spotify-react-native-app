// @flow

import Moment from 'moment'

/*
  Terminology:
    epochTime: number e.g. 1540417568000 - seconds from the unix epoch
    timestamp: string e.g. 2018-10-21T23:55:00 or 2018-10-21T23:55:00+13:00 - ISO8601 format
    datetime: epochTime or timestamp, string or number - used as inputs to some util methods as Moment can handle both
*/

type Datetime = Datetime

/* ===================== current time ======================= */

export const now = (): number => Moment().valueOf()

/* ===================== timestamp ======================= */

export const toUtcTimestamp = (datetime: Datetime): string =>
  Moment(datetime)
    .utc()
    .format('YYYY-MM-DDTHH:mm:ss')

export const toTimestamp = (datetime: Datetime): string =>
  Moment(datetime).format('YYYY-MM-DDTHH:mm:ssZ')

export const fromUtcToLocalEpochTime = (datetime: Datetime): number =>
  Moment.utc(datetime)
    .local()
    .valueOf()

/* ===================== format ======================= */

export const toTime = (datetime: Datetime): string =>
  Moment(datetime).format('HH:mm')

export const toDate = (datetime: Datetime): string =>
  Moment(datetime).format('D MMMM YYYY')

export const toCompactDate = (datetime: Datetime): string =>
  Moment(datetime).format('D MMM')

export const toCalendarMonth = (datetime: Datetime) =>
  Moment(datetime).format('MMMM YYYY')

export const toDateString = (datetime: Datetime): string =>
  Moment(datetime).format('YYYYMMDD') // used mainly for tech, e.g. keys and id's

/* ===================== details ======================= */

export const getMonth = (datetime: Datetime): number => Moment(datetime).month()

export const getDayOfMonth = (datetime: Datetime): number =>
  Moment(datetime).date()

export const getDayOfWeek = (datetime: Datetime): number =>
  Moment(datetime).day()

export const getStartOfDayInEpochTime = (datetime: Datetime): number =>
  Moment(datetime)
    .startOf('day')
    .valueOf()

/* ===================== durations ======================= */

export const getDuration = (datetime: Datetime): string => {
  if (datetime) {
    const duration = Moment.duration(datetime)
    return `${duration.get('hours')}h ${duration.get('minutes')}m`
  }
  return ''
}

export const getDurationInMilliseconds = (
  epochTime1: number,
  epochTime2: number
): number => Moment.duration(epochTime1 - epochTime2).asMilliseconds()

export const getDurationInWords = (timeInMilliseconds: number): string =>
  Moment.duration(timeInMilliseconds).humanize()

/* ===================== comparisons and manipulations ======================= */

export const isSameDay = (datetime1: Datetime, datetime2: Datetime): boolean =>
  Moment(datetime1).isSame(datetime2, 'day')

export const isDateWithinRange = (
  datetime: Datetime,
  datetimeMin: Datetime,
  datetimeMax: Datetime
): boolean =>
  Moment(datetime).isSameOrBefore(datetimeMax) &&
  Moment(datetime).isSameOrAfter(datetimeMin)

export const subtractDays = (
  datetime: Datetime,
  numberOfDays: number
): number =>
  Moment(datetime)
    .subtract(numberOfDays, 'days')
    .valueOf()

export const addDays = (datetime: Datetime, numberOfDays: number): number =>
  Moment(datetime)
    .add(numberOfDays, 'days')
    .valueOf()

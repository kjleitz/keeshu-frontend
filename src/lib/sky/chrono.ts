import moment from "moment";

export const SECONDS_IN_DAY = 86400;
// days in a lunar month
export const DAYS_IN_LUNAR_MONTH = 29.530588853;
// "new moon" reference date
export const NEW_MOON_DATE = moment('2021-01-13 05:02+00:00').toDate();
// Using Feb 15th as the date that the moon is at its horniest (when the angle
// of tilt on the waxing crescent makes it *almost* completely under the rest of
// the moon, looking like a 'U' or 'horns'). Feb 15th is roughly 12.3% of the
// way through the year.
export const PERCENT_YEAR_ELAPSED_WHEN_MOON_IS_HORNY = 0.123; // ~Feb 15th

export const calcDayElapsed = (): number => {
  const midnight = moment().startOf('day');
  const now = moment();
  const secondsSinceMidnight = now.diff(midnight, 'seconds');
  return secondsSinceMidnight / SECONDS_IN_DAY;
};

export const calcLunarMonthElapsed = (): number => {
  const now = moment();
  const newMoon = moment(NEW_MOON_DATE);
  const daysSinceNewMoon = now.diff(newMoon, 'seconds') / SECONDS_IN_DAY;
  return (daysSinceNewMoon % DAYS_IN_LUNAR_MONTH) / DAYS_IN_LUNAR_MONTH;
};

export const calcYearElapsed = (): number => {
  const now = moment();
  const yearStart = moment().startOf('year');
  const yearEnd = moment().endOf('year');
  return now.diff(yearStart, 'seconds') / yearEnd.diff(yearStart, 'seconds');
};

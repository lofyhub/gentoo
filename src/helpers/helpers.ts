type dateString = (
  date: Date,
  hideYear?: boolean,
  preformattedDate?: string | null,
  onlyDate?: boolean
) => string;

const MONTH_NAMES = [
  `Jan`,
  `Feb`,
  `Mar`,
  `Apr`,
  `May`,
  `Jun`,
  `Jul`,
  `Aug`,
  `Sep`,
  `Oct`,
  `Nov`,
  `Dec`,
];

const getFormat: dateString = (
  date,
  hideYear = false,
  preformattedDate = null,
  onlyDate = false
) => {
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  if (onlyDate) {
    return `${day} ${month} ${year}`;
  }

  let minutesString = `${minutes}`;
  if (minutes < 10) {
    // Adding leading zero to minutes
    minutesString = `0${minutes}`;
  }

  if (preformattedDate) {
    // Today at 4:20
    return `${preformattedDate} at ${hours}:${minutesString}`;
  }

  if (hideYear) {
    return `${day} ${month} at ${hours}:${minutesString}`;
  }

  return `${day} ${month} ${year} at ${hours}:${minutesString}`;
};

export function formatDate(input: string | Date | number, dateOnly = false) {
  const date = input instanceof Date ? input : new Date(input);
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  const today = new Date();
  const seconds = Math.round((today.getTime() - date.getTime()) / 1000);

  if (seconds < 0 || dateOnly) {
    return getFormat(date, false, null, true);
  }

  if (seconds < 5) {
    return `now`;
  }
  if (seconds < 60) {
    return `${seconds} seconds ago`;
  }

  const minutes = Math.round(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minutes ago`;
  }

  const yesterday = new Date(today.getTime() - DAY_IN_MS);
  const isToday = today.toDateString() === date.toDateString();
  const isYesterday = yesterday.toDateString() === date.toDateString();
  if (isToday) {
    return getFormat(date, true, `Today`);
  }
  if (isYesterday) {
    return getFormat(date, true, `Yesterday`);
  }

  const isThisYear = today.getFullYear() === date.getFullYear();
  if (isThisYear) {
    return getFormat(date, true);
  }

  return getFormat(date);
}
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
export interface file {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  contentType: string;
  fileName: string;
}
export function convertBuffer(file: file) {
  let buffer;
  if (file?.data) {
    buffer = file.data.toString("base64");
  } else {
    return "";
  }

  const data = `data:${file.contentType};base64,${buffer}`;
  return data;
}

export function getAuthHeaders() {
  const minTokenLength = 1;

  const userInfo = localStorage.getItem("kikao-token");

  if (typeof userInfo !== "string") throw new Error("User info not found");

  if (!(typeof userInfo === "string" && userInfo.length >= minTokenLength)) {
    throw new Error("Invalid user access token");
  }
  const header = {
    "Content-Type": "application/json",
    "x-access-token": userInfo,
  };
  return header;
}
export function maskNumber(
  numberString: string,
  startDigits: number,
  endDigits: number
) {
  const start = numberString.slice(0, startDigits);
  const end = numberString.slice(-endDigits);
  const middle = "".padEnd(numberString.length - startDigits - endDigits, "x");
  return start + middle + end;
}

export function stringToHslColor(str: string, s = 40, l = 80) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const h = hash % 360;
  return "hsl(" + h + ", " + s + "%, " + l + "%)";
}

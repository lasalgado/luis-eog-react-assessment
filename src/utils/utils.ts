const dateFormat: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  year: 'numeric',
  month: 'short',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};
const dateLocale: string = 'en-US';

const unitsFormats: { [index:string]:string } = {
  F: '°F',
  PSI: 'PSI',
  '%': '%',
};

const arrayColors = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#2196f3',
  '#ff9800',
  '#357a38',
  '#008394',
  '#ffeb3b',
  '#795548',
];

/**
 * Conversion from celsius to fraenheit
 * @param c Receives a number in celsius to be converted
 * @returns Returns a number in farenheit units
 */
export const toF = (c: number) => (c * 9) / 5 + 32;

export const updateTime = (
  timestamp: number,
  minutes: number,
  add?: boolean,
) => {
  const time = minutes * 60 * 1000;

  return timestamp + (add ? time : -time);
};

export const formatDT = (timestamp: number) => (
  new Date(timestamp).toLocaleString(dateLocale, dateFormat)
);

export const timeToStringSingle = (timestamp: number) => new Date(timestamp).toLocaleString();

export const formatUnits = (unit: string) => (unit in unitsFormats ? unitsFormats[unit] : '');

export const timeToMins = (timestamp: number) => {
  const aux = new Date(timestamp);

  const format: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };

  return aux.toLocaleString(dateLocale, format);
};

export const getColor = (index: number): string => {
  if (index <= arrayColors.length) {
    return arrayColors[index];
  }

  return Math.floor(Math.random() * 16777215).toString(16);
};

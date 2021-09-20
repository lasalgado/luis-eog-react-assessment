const dateFormat: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  year: 'numeric',
  month: 'long',
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
  console.log(timestamp);
  const time = minutes * 60 * 1000;

  return timestamp + (add ? time : -time);
};

export const formatDT = ({ date, locale = dateLocale }: { date: Date; locale?: string }) => (
  date.toLocaleString(locale, dateFormat)
);

export const timeToStringSingle = (timestamp:number) => new Date(timestamp).toLocaleString();

export const formatUnits = (unit: string) => (unit in unitsFormats ? unitsFormats[unit] : '');

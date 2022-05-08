import { Consumption, Period } from './cnmc_data';
import { formatDate } from './date';

type PriceSegment = 'average' | 'aboveAverage' | 'belowAverage';
export const consumptionSearcher =
  (consumptions: Consumption) =>
  (date: string, hour: string): number =>
    consumptions[date][parseInt(hour)].consumption;

export const groupConsumptionByDate = (
  consumptions: Consumption,
): { name: string; data: number[] }[] =>
  Object.keys(consumptions).map((date) => {
    const endHour = Math.max(
      ...Object.keys(consumptions[date]).map((h) => parseInt(h)),
    );
    return {
      name: date,
      data: new Array(endHour)
        .fill(0)
        .map((_, index) => consumptions[date][index + 1]?.consumption),
    };
  });

export const groupConsumptionBySegment = (
  consumptions: Consumption,
): { [key in PriceSegment]: [number, number][] } =>
  Object.keys(consumptions).reduce(
    (
      acc: { [key in PriceSegment]: [number, number][] },
      date: string,
    ): { [key in PriceSegment]: [number, number][] } => ({
      average: [
        ...acc.average,
        ...Object.entries(consumptions[date])
          .filter((entry) => entry[1].period === 'llano')
          .map(([key, value]): [number, number] => [
            parseInt(key),
            value.consumption,
          ]),
      ],
      aboveAverage: [
        ...acc.aboveAverage,
        ...Object.entries(consumptions[date])
          .filter((entry) => entry[1].period === 'punta')
          .map(([key, value]): [number, number] => [
            parseInt(key),
            value.consumption,
          ]),
      ],
      belowAverage: [
        ...acc.belowAverage,
        ...Object.entries(consumptions[date])
          .filter((entry) => entry[1].period === 'valle')
          .map(([key, value]): [number, number] => [
            parseInt(key),
            value.consumption,
          ]),
      ],
    }),
    { average: [], aboveAverage: [], belowAverage: [] },
  );

export const getDates = (consumptions: Consumption): string[] =>
  Object.keys(consumptions).map(formatDate);

export const getDaysByYear = (consumptions: Consumption) =>
  getDates(consumptions)
    .map((date) => date.substring(0, 4))
    .reduce(
      (acc: { year: string; num: number }[], year: string) => [
        ...acc,
        {
          year,
          num: acc.find((days) => days.year === year)?.num ?? 1,
        },
      ],
      [],
    );

export const getConsumptionByDay = (consumptions: Consumption): number[] => {
  return Object.keys(consumptions).map((date) =>
    parseFloat(
      Object.keys(consumptions[date])
        .reduce(
          (acc, hour) => acc + consumptions[date][parseInt(hour)]?.consumption,
          0,
        )
        .toFixed(2),
    ),
  );
};

export const getTotalConsumption = (consumptions: Consumption): number => {
  return parseFloat(
    Object.keys(consumptions)
      .reduce(
        (acc, date) =>
          acc +
          Object.keys(consumptions[date]).reduce((acc, hour) => {
            const cost = consumptions[date][parseInt(hour)].consumption;
            return acc + cost;
          }, 0),
        0,
      )
      .toFixed(2),
  );
};

export const filterByPeriod = (
  consumptions: Consumption,
  period: Period,
): Consumption =>
  Object.entries(consumptions).reduce(
    (acc, [date, consumptionsByDay]) => ({
      ...acc,
      [date]: Object.entries(consumptionsByDay)
        .filter((entry) => entry[1].period === period)
        .reduce(
          (consumptionsByHour, [hour, consumption]) => ({
            ...consumptionsByHour,
            [parseInt(hour)]: consumption,
          }),
          {},
        ),
    }),
    {},
  );

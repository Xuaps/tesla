import { anyDayConsumption, anyHourConsumption } from './builders';
import {
  groupConsumptionByDate,
  groupConsumptionBySegment,
  getTotalConsumption,
  getDates,
  filterByPeriod,
  getConsumptionByDay,
} from '../consumption';

describe('Get filtered consumptions', () => {
  it('should return consumption filtered by period', () => {
    const mockData = anyDayConsumption({
      consumptions: {
        ...anyHourConsumption({ hour: 1, period: 'punta' }),
        ...anyHourConsumption({ hour: 2, period: 'punta' }),
        ...anyHourConsumption({ hour: 3, period: 'punta' }),
        ...anyHourConsumption({ hour: 4, period: 'llano' }),
        ...anyHourConsumption({ hour: 5, period: 'llano' }),
        ...anyHourConsumption({ hour: 6, period: 'valle' }),
      },
    });

    expect(
      Object.values(filterByPeriod(mockData, 'punta')['22/02/2022']),
    ).toHaveLength(3);
    expect(
      Object.values(filterByPeriod(mockData, 'llano')['22/02/2022']),
    ).toHaveLength(2);
    expect(
      Object.values(filterByPeriod(mockData, 'valle')['22/02/2022']),
    ).toHaveLength(1);
  });
});

describe('Get consumption by day', () => {
  it('should return consumption by day', () => {
    const mockData = anyDayConsumption({
      consumptions: {
        ...anyHourConsumption({ hour: 1, consumption: 2.32333 }),
        ...anyHourConsumption({ hour: 2, consumption: 4.676 }),
        ...anyHourConsumption({ hour: 3, consumption: 4.55665656 }),
      },
    });

    expect(getConsumptionByDay(mockData)).toEqual([11.56]);
  });
});

describe('Get dates', () => {
  it('should get all the dates included in consumptions', () => {
    const mockData = anyDayConsumption({
      consumptions: {
        ...anyHourConsumption({ hour: 1 }),
        ...anyHourConsumption({ hour: 2 }),
        ...anyHourConsumption({ hour: 3 }),
      },
    });

    expect(getDates(mockData)).toEqual(['2022-02-22']);
  });
});

describe('Get Total consumption', () => {
  it('should return total consumption', () => {
    const consumptions = anyDayConsumption({
      date: 'anyDate',
      consumptions: {
        ...anyHourConsumption({ hour: 1, consumption: 2.345 }),
        ...anyHourConsumption({ hour: 10, consumption: 4.567 }),
        ...anyHourConsumption({ hour: 2, consumption: 4.789 }),
      },
    });
    const totalCost = getTotalConsumption(consumptions);

    expect(totalCost).toBe(11.7);
  });
});

describe('Group consumption by segment', () => {
  it('should group hour consumption by segment', () => {
    const consumptions = anyDayConsumption({
      consumptions: {
        ...anyHourConsumption({
          hour: 1,
          consumption: 2.345,
          period: 'llano',
        }),
        ...anyHourConsumption({
          hour: 10,
          consumption: 4.567,
          period: 'valle',
        }),
        ...anyHourConsumption({
          hour: 2,
          consumption: 4.789,
          period: 'punta',
        }),
      },
    });
    const result = groupConsumptionBySegment(consumptions);

    expect(result).toStrictEqual({
      average: [[1, 2.345]],
      belowAverage: [[10, 4.567]],
      aboveAverage: [[2, 4.789]],
    });
  });
});

describe('Group consumption by date', () => {
  it('should group hour consumption by date', () => {
    const consumptions = anyDayConsumption({
      consumptions: {
        ...anyHourConsumption({ hour: 1, consumption: 2.345 }),
        ...anyHourConsumption({ hour: 10, consumption: 4.567 }),
        ...anyHourConsumption({ hour: 2, consumption: 4.789 }),
      },
    });
    const result = groupConsumptionByDate(consumptions);

    expect(result).toStrictEqual([
      {
        name: '22/02/2022',
        data: [
          2.345,
          4.789,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          4.567,
        ],
      },
    ]);
  });
});

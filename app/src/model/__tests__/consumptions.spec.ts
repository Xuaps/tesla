import { anyDayConsumption } from './builders';
import {
  groupConsumptionByDate,
  getTotalCost,
  getTotalConsumption,
  getDates,
  getCostByDay,
  addPrices,
  Consumption,
  getConsumptionByDay,
  COST_NOT_AVAILABLE,
  groupConsumptionBySegment,
} from '../consumption';
import { Prices } from '../prices';

describe('Get consumption by day', () => {
  it('should return consumption by day', () => {
    const mockData = anyDayConsumption({
      consumptions: {
        '1': { consumption: 2.32333 },
        '2': { consumption: 4.676 },
        '3': { consumption: 4.55665656 },
      },
    });

    expect(getConsumptionByDay(mockData)).toEqual([11.56]);
  });
});

describe('Get consumptions with price', () => {
  it('should add price for consumption', async () => {
    const cost = 123;
    const anyDate = '23/11/2021';
    const anyTime = '1';
    const anotherTime = '2';
    const consumptions: Consumption = {
      [anyDate]: {
        [anyTime]: { consumption: 1, cost, segment: 'average' },
        [anotherTime]: { consumption: 1, cost, segment: 'average' },
      },
    };
    const prices: Prices[] = [
      {
        '2021-11-22T23:00:00+00:00': 0.29274,
        '2021-11-23T00:00:00+00:00': 0.27203,
      },
    ];

    const result = await addPrices(consumptions)(prices)();

    expect(result[anyDate][anyTime].cost).toBe(0.29274);
    expect(result[anyDate][anotherTime].cost).toBe(0.27203);
  });

  fit('should assign segment to consumption', async () => {
    const cost = 123;
    const anyDate = '23/11/2021';
    const otherDate = '24/11/2021';
    const first = '1';
    const second = '2';
    const third = '3';
    const consumptions: Consumption = {
      [anyDate]: {
        [first]: { consumption: 1, cost, segment: 'average' },
        [second]: { consumption: 1, cost, segment: 'average' },
        [third]: { consumption: 1, cost, segment: 'average' },
      },
      [otherDate]: {
        [first]: { consumption: 1, cost, segment: 'average' },
        [second]: { consumption: 1, cost, segment: 'average' },
        [third]: { consumption: 1, cost, segment: 'average' },
      },
    };
    const prices: Prices[] = [
      {
        '2021-11-22T23:00:00+00:00': 0.22274,
        '2021-11-23T00:00:00+00:00': 0.10203,
        '2021-11-23T01:00:00+00:00': 0.30203,
        '2021-11-23T23:00:00+00:00': 0.40274,
        '2021-11-24T00:00:00+00:00': 0.40203,
        '2021-11-24T01:00:00+00:00': 0.80203,
      },
    ];

    const result = await addPrices(consumptions)(prices)();

    expect(result[anyDate][first].segment).toBe('average');
    expect(result[anyDate][second].segment).toBe('belowAverage');
    expect(result[anyDate][third].segment).toBe('aboveAverage');
    expect(result[otherDate][first].segment).toBe('belowAverage');
    expect(result[otherDate][second].segment).toBe('belowAverage');
    expect(result[otherDate][third].segment).toBe('aboveAverage');
  });
});

describe('getCostByDay', () => {
  it('should return the cost grouped by day', () => {
    const mockData = anyDayConsumption({
      consumptions: {
        '1': { cost: 2.32333 },
        '2': { cost: undefined },
        '3': { cost: 4.55665656 },
      },
    });

    expect(getCostByDay(mockData)).toEqual([6.88]);
  });
});

describe('Get dates', () => {
  it('should get all the dates included in consumptions', () => {
    const mockData = anyDayConsumption({
      consumptions: {
        '1': { cost: 2.3 },
        '2': { cost: 3.4 },
        '3': { cost: 4.5 },
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
        '1': { consumption: 2.345, cost: 1.6765675 },
        '10': { consumption: 4.567, cost: 2.87786 },
        '2': { consumption: 4.789, cost: 3.877868 },
      },
    });
    const totalCost = getTotalConsumption(consumptions);

    expect(totalCost).toBe(11.7);
  });
});

describe('Get Total cost', () => {
  it('should return total cost', () => {
    const consumptions = anyDayConsumption({
      date: 'anyDate',
      consumptions: {
        '1': { consumption: 2.345, cost: 1.6765675 },
        '10': { consumption: 4.567, cost: 2.87786 },
        '2': { consumption: 4.789, cost: 3.877868 },
      },
    });
    const totalCost = getTotalCost(consumptions);

    expect(totalCost).toBe(8.43);
  });

  it('should return COST_NOT_AVAILABLE if there is at least one missing value', () => {
    const consumptions = anyDayConsumption({
      date: 'anyDate',
      consumptions: {
        '1': { consumption: 2.345 },
        '10': { consumption: 4.567, cost: 2.87786 },
        '2': { consumption: 4.789, cost: 3.877868 },
      },
    });
    const totalCost = getTotalCost(consumptions);

    expect(totalCost).toBe(COST_NOT_AVAILABLE);
  });
});

describe('Group consumption by segment', () => {
  it('should group hour consumption by segment', () => {
    const consumptions = anyDayConsumption({
      consumptions: {
        '1': { consumption: 2.345, segment: 'average' },
        '10': { consumption: 4.567, segment: 'belowAverage' },
        '2': { consumption: 4.789, segment: 'aboveAverage' },
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
        '1': { consumption: 2.345 },
        '10': { consumption: 4.567 },
        '2': { consumption: 4.789 },
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

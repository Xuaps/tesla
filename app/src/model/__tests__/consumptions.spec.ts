import { anyDayConsumption, anyHourConsumption } from './builders';
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
        ...anyHourConsumption({ hour: 1, consumption: 2.32333 }),
        ...anyHourConsumption({ hour: 2, consumption: 4.676 }),
        ...anyHourConsumption({ hour: 3, consumption: 4.55665656 }),
      },
    });

    expect(getConsumptionByDay(mockData)).toEqual([11.56]);
  });
});

describe('Get consumptions with price', () => {
  const cost = 123;
  const anyDate = '23/11/2022';
  const otherDate = '24/11/2022';
  const extraDate = '25/11/2022';
  const holyDate = '26/11/2022';
  const anotherHolyDate = '08/12/2022';
  const first = 1;
  const second = 2;
  const third = 3;
  const llano = 9;
  const punta = 11;
  const consumptions: Consumption = {
    ...anyDayConsumption({
      date: anyDate,
      consumptions: {
        ...anyHourConsumption({ hour: first, consumption: 1, cost }),
        ...anyHourConsumption({ hour: second, consumption: 1, cost }),
        ...anyHourConsumption({ hour: third, consumption: 1, cost }),
      },
    }),
    ...anyDayConsumption({
      date: otherDate,
      consumptions: {
        ...anyHourConsumption({ hour: first, consumption: 1, cost }),
        ...anyHourConsumption({ hour: second, consumption: 1, cost }),
        ...anyHourConsumption({ hour: third, consumption: 1, cost }),
      },
    }),
    ...anyDayConsumption({
      date: extraDate,
      consumptions: {
        ...anyHourConsumption({ hour: first, consumption: 1, cost }),
        ...anyHourConsumption({ hour: llano, consumption: 1, cost }),
        ...anyHourConsumption({ hour: punta, consumption: 1, cost }),
      },
    }),
    ...anyDayConsumption({
      date: holyDate,
      consumptions: {
        ...anyHourConsumption({ hour: llano, consumption: 1, cost }),
      },
    }),
    ...anyDayConsumption({
      date: anotherHolyDate,
      consumptions: {
        ...anyHourConsumption({ hour: llano, consumption: 1, cost }),
      },
    }),
  };
  const prices: Prices[] = [
    {
      '2022-11-22T23:00:00+00:00': 0.22274,
      '2022-11-23T00:00:00+00:00': 0.10203,
      '2022-11-23T01:00:00+00:00': 0.30203,
      '2022-11-23T23:00:00+00:00': 0.40274,
      '2022-11-24T00:00:00+00:00': 0.40203,
      '2022-11-24T01:00:00+00:00': 0.80203,
      '2022-11-24T23:00:00+00:00': 0.40203,
      '2022-11-25T07:00:00+00:00': 0.40203,
      '2022-11-25T09:00:00+00:00': 0.40203,
      '2022-11-26T07:00:00+00:00': 0.40203,
      '2022-12-08T07:00:00+00:00': 0.40203,
    },
  ];

  it('should add price for consumption', async () => {
    const result = await addPrices(consumptions)(prices)();

    expect(result[anyDate][first].cost).toBe(0.22274);
    expect(result[anyDate][second].cost).toBe(0.10203);
  });

  it('should assign segment to consumption', async () => {
    const result = await addPrices(consumptions)(prices)();

    expect(result[anyDate][first].segment).toBe('average');
    expect(result[anyDate][second].segment).toBe('belowAverage');
    expect(result[anyDate][third].segment).toBe('aboveAverage');
    expect(result[otherDate][first].segment).toBe('belowAverage');
    expect(result[otherDate][second].segment).toBe('belowAverage');
    expect(result[otherDate][third].segment).toBe('aboveAverage');
  });

  it('should assign period to consumption', async () => {
    const result = await addPrices(consumptions)(prices)();

    expect(result[anyDate][first].period).toBe('valle');
    expect(result[extraDate][first].period).toBe('valle');
    expect(result[extraDate][llano].period).toBe('llano');
    expect(result[extraDate][punta].period).toBe('punta');
    expect(result[anotherHolyDate][llano].period).toBe('valle');
    expect(result[holyDate][llano].period).toBe('valle');
  });
});

describe('getCostByDay', () => {
  it('should return the cost grouped by day', () => {
    const mockData = anyDayConsumption({
      consumptions: {
        ...anyHourConsumption({ hour: 1, cost: 2.32333 }),
        '2': {
          cost: 0,
          consumption: 0.12,
          segment: 'average',
          period: 'valle',
        },
        ...anyHourConsumption({ hour: 3, cost: 4.55665656 }),
      },
    });

    expect(getCostByDay(mockData)).toEqual([6.88]);
  });
});

describe('Get dates', () => {
  it('should get all the dates included in consumptions', () => {
    const mockData = anyDayConsumption({
      consumptions: {
        ...anyHourConsumption({ hour: 1, cost: 2.3 }),
        ...anyHourConsumption({ hour: 2, cost: 3.4 }),
        ...anyHourConsumption({ hour: 3, cost: 4.5 }),
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
        ...anyHourConsumption({ hour: 1, consumption: 2.345, cost: 1.6765675 }),
        ...anyHourConsumption({ hour: 10, consumption: 4.567, cost: 2.87786 }),
        ...anyHourConsumption({ hour: 2, consumption: 4.789, cost: 3.877868 }),
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
        ...anyHourConsumption({ hour: 1, consumption: 2.345, cost: 1.6765675 }),
        ...anyHourConsumption({ hour: 10, consumption: 4.567, cost: 2.87786 }),
        ...anyHourConsumption({ hour: 2, consumption: 4.789, cost: 3.877868 }),
      },
    });
    const totalCost = getTotalCost(consumptions);

    expect(totalCost).toBe(8.43);
  });

  it('should return COST_NOT_AVAILABLE if there is at least one missing value', () => {
    const consumptions = anyDayConsumption({
      date: 'anyDate',
      consumptions: {
        '1': {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          cost: undefined as any,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          segment: undefined as any,
          consumption: 2.345,
          period: 'valle',
        },
        ...anyHourConsumption({ hour: 10, consumption: 4.567, cost: 2.87786 }),
        ...anyHourConsumption({ hour: 2, consumption: 4.789, cost: 3.877868 }),
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
        ...anyHourConsumption({
          hour: 1,
          consumption: 2.345,
          segment: 'average',
        }),
        ...anyHourConsumption({
          hour: 10,
          consumption: 4.567,
          segment: 'belowAverage',
        }),
        ...anyHourConsumption({
          hour: 2,
          consumption: 4.789,
          segment: 'aboveAverage',
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

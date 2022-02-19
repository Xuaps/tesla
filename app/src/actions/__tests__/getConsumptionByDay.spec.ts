import { getConsumptionByDay } from '..';
import { anyDayConsumption } from './builders';

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

import { anyDayConsumption } from './builders';
import { getCostByDay } from '../index';

describe('getCostByDay', () => {
  it('should return the cost grouped by day', () => {
    const mockData = anyDayConsumption({
      consumptions: { '1': { cost: 2.32333 }, '2': { cost: undefined }, '3': { cost: 4.55665656 } },
    });

    expect(getCostByDay(mockData)).toEqual([6.88]);
  });
});

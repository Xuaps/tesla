import { anyDayConsumption } from './builders';
import { getCostByDay } from '../index';

describe('getCostByDay', () => {
  it('should return the cost grouped by day', () => {
    const mockData = anyDayConsumption({
      consumptions: { '1': { cost: 2.3 }, '2': { cost: 3.4 }, '3': { cost: 4.5 } },
    });

    expect(getCostByDay(mockData)).toEqual([10.2]);
  });
});

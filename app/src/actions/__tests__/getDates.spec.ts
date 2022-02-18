import { anyDayConsumption } from './builders';
import { getDates } from '../index';

describe('Get dates', () => {
  it('should get all the dates included in consumptions', () => {
    const mockData = anyDayConsumption({
      consumptions: { '1': { cost: 2.3 }, '2': { cost: 3.4 }, '3': { cost: 4.5 } },
    });

    expect(getDates(mockData)).toEqual(['2022-02-22']);
  });
});

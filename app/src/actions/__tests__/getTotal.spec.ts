import { getTotal } from '..';
import { anyDayConsumption } from './builders';

describe('Get Total', () => {
  it('should return total cost', () => {
    const consumptions = anyDayConsumption({
      date: 'anyDate',
      consumptions: {
        '1': { consumption: 2.345, cost: 1 },
        '10': { consumption: 4.567, cost: 2 },
        '2': { consumption: 4.789, cost: 3 },
      },
    });
    const totalCost = getTotal(consumptions);

    expect(totalCost).toBe(6);
  });
});

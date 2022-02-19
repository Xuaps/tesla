import { getTotalCost } from '..';
import { anyDayConsumption } from './builders';

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
});

import { getTotalConsumption } from '..';
import { anyDayConsumption } from './builders';

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

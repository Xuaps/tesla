import fetchMock from 'jest-fetch-mock';
import { getConsumptionsWithPrice, Consumption } from '..';

describe('Get consumptions with price', () => {
  it('should add price for consumption', async () => {
    fetchMock.mockResponse('{"2021-11-22T23:00:00+00:00": 0.29274, "2021-11-23T00:00:00+00:00": 0.27203}');
    const cost = 123;
    const anyDate = '23/11/2021';
    const anyTime = '1';
    const anotherTime = '2';
    const consumptions: Consumption = {
      [anyDate]: {
        [anyTime]: { consumption: 1, cost },
        [anotherTime]: { consumption: 1, cost },
      },
    };
    const result = await getConsumptionsWithPrice(consumptions)();

    expect(result[anyDate][anyTime].cost).toBe(0.29274);
    expect(result[anyDate][anotherTime].cost).toBe(0.27203);
  });
});

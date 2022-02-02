import fetchMock from 'jest-fetch-mock';
import { getConsumptionsWithPrice, Consumption } from '../src/actions';

describe('Get consumptions with price', () => {
    it('should add price for consumption', async () => {
        fetchMock.mockResponse('{"2021-10-23T20:00:00+00:00": 0.29274, "2021-10-23T21:00:00+00:00": 0.27203}');
        const price = 123;
        const anyCup = '';
        const anyDate = '23/10/2021';
        const anyTime = '20';
        const consumptions: Consumption[] = [{ cups: anyCup, date: anyDate, hour: anyTime, consumption: 0, price }];
        const result = await getConsumptionsWithPrice(consumptions)();

        expect(result[0].price).toBe(0.29274);
    });
});

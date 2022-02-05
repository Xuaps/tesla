import fetchMock from 'jest-fetch-mock';
import { getConsumptionsWithPrice, Consumption } from '..';

describe('Get consumptions with price', () => {
    it('should add price for consumption', async () => {
        fetchMock.mockResponse('{"2021-11-22T23:00:00+00:00": 0.29274, "2021-11-23T00:00:00+00:00": 0.27203}');
        const price = 123;
        const anyCup = '';
        const anyDate = '23/11/2021';
        const anyTime = '1';
        const anotherTime = '2';
        const consumptions: Consumption[] = [
            { cups: anyCup, date: anyDate, hour: anyTime, consumption: 0, price },
            { cups: anyCup, date: anyDate, hour: anotherTime, consumption: 0, price },
        ];
        const result = await getConsumptionsWithPrice(consumptions)();

        expect(result[0].price).toBe(0.29274);
        expect(result[1].price).toBe(0.27203);
    });
});

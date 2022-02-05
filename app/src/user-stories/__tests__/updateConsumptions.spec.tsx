import fetchMock from 'jest-fetch-mock';
import { updateConsumptions } from '..';

describe('update consumptions', () => {
    it('should updated consumptions with readings from a file', async () => {
        fetchMock.mockResponse('{"2019-07-27T23:00:00+00:00": 0.29274, "2019-07-28T00:00:00+00:00": 0.27203}');
        const store = {
            consumptions: [],
        };
        const file = new File(
            [
                `CUPS;Fecha;Hora;Consumo;Metodo_obtencion
                cups;28/07/2019;1;0,232;R
                cups;28/07/2019;2;0,201;R        
                cups;28/07/2019;3;0,138;R        
                cups;28/07/2019;4;0,135;R`,
            ],
            'consumptions.csv',
        );
        const { consumptions } = await updateConsumptions(store, file);

        expect(consumptions[0].name).toEqual('28/07/2019');
        expect(consumptions[0].data).toHaveLength(4);
        expect(consumptions[0].data).toEqual(expect.arrayContaining([0.232, 0.201, 0.138, 0.135]));
        expect(consumptions[0].prices).toHaveLength(4);
        expect(consumptions[0].prices).toEqual(expect.arrayContaining([0.06791568, 0.05467803, undefined, undefined]));
    });
});

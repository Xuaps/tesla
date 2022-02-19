import fetchMock from 'jest-fetch-mock';
import { updateConsumptions } from '..';
import { EMPTY_STORE } from '../../store';

describe('update consumptions', () => {
  it('should updated consumptions with readings from a file', async () => {
    fetchMock.mockResponse(
      '{"2019-11-27T23:00:00+00:00": 0.29274, "2019-11-28T00:00:00+00:00": 0.27203}',
    );
    const store = EMPTY_STORE;
    const file = new File(
      [
        `CUPS;Fecha;Hora;Consumo;Metodo_obtencion
                cups;28/11/2019;1;0,232;R
                cups;28/11/2019;2;0,201;R        
                cups;28/11/2019;3;0,138;R        
                cups;28/11/2019;4;0,135;R`,
      ],
      'consumptions.csv',
    );
    const { consumptions } = await updateConsumptions(store, file);

    expect(consumptions).toStrictEqual({
      '28/11/2019': {
        1: {
          consumption: 0.232,
          cost: 0.06791568,
        },
        2: {
          consumption: 0.201,
          cost: 0.05467803,
        },
        3: {
          consumption: 0.138,
          cost: undefined,
        },
        4: {
          consumption: 0.135,
          cost: undefined,
        },
      },
    });
  });
});

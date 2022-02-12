import { Data, toConsumptions } from '..';

describe('toConsumptions', () => {
  it('should transform raw data to consumptions', () => {
    const data: Data[] = [
      anyData({ hour: '1' }),
      anyData({ hour: '10' }),
      anyData({ hour: '2', consumption: '0,231' }),
    ];

    const consumptions = toConsumptions(data);

    expect(consumptions).toEqual({
      '20/10/2020': {
        '1': { consumption: 0.234 },
        '10': { consumption: 0.234 },
        '2': { consumption: 0.231 },
      },
    });
  });
});

const anyData = ({ cups = 'cups', date = '20/10/2020', hour = '1', consumption = '0,234', source = 'R' }) => ({
  CUPS: cups,
  Fecha: date,
  Hora: hour,
  Consumo: consumption,
  Metodo_obtencion: source,
});

import { Data, toConsumptions } from '..';
import { parseCSV } from '..';

describe('parseCSV', () => {
  it('should return parsed data', async () => {
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

    const data = await parseCSV(file)();

    expect(data).toHaveLength(4);
    expect(data[0]).toStrictEqual({
      CUPS: 'cups',
      Fecha: '28/11/2019',
      Hora: '1',
      Consumo: '0,232',
      Metodo_obtencion: 'R',
    });
    expect(data[1]).toStrictEqual({
      CUPS: 'cups',
      Fecha: '28/11/2019',
      Hora: '2',
      Consumo: '0,201',
      Metodo_obtencion: 'R',
    });
    expect(data[2]).toStrictEqual({
      CUPS: 'cups',
      Fecha: '28/11/2019',
      Hora: '3',
      Consumo: '0,138',
      Metodo_obtencion: 'R',
    });
    expect(data[3]).toStrictEqual({
      CUPS: 'cups',
      Fecha: '28/11/2019',
      Hora: '4',
      Consumo: '0,135',
      Metodo_obtencion: 'R',
    });
  });

  it('should return parsed data with any headers name', async () => {
    const file = new File(
      [
        `CUPS;Fecha;Hora;Consumo;Metodo
cups;28/11/2019;1;0,232;R
cups;28/11/2019;2;0,201;R
cups;28/11/2019;3;0,138;R
cups;28/11/2019;4;0,135;R`,
      ],
      'consumptions.csv',
    );

    const data = await parseCSV(file)();

    expect(data).toHaveLength(4);
    expect(data[0]).toStrictEqual({
      CUPS: 'cups',
      Fecha: '28/11/2019',
      Hora: '1',
      Consumo: '0,232',
      Metodo_obtencion: 'R',
    });
  });

  it('should return parsed data even if there are empty lines', async () => {
    const file = new File(
      [
        `CUPS;Fecha;Hora;Consumo;Metodo
cups;28/11/2019;1;0,232;R

cups;28/11/2019;3;0,138;R
cups;28/11/2019;4;0,135;R`,
      ],
      'consumptions.csv',
    );

    const data = await parseCSV(file)();

    expect(data).toHaveLength(3);
    expect(data[0]).toStrictEqual({
      CUPS: 'cups',
      Fecha: '28/11/2019',
      Hora: '1',
      Consumo: '0,232',
      Metodo_obtencion: 'R',
    });
  });
});

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

const anyData = ({
  cups = 'cups',
  date = '20/10/2020',
  hour = '1',
  consumption = '0,234',
  source = 'R',
}) => ({
  CUPS: cups,
  Fecha: date,
  Hora: hour,
  Consumo: consumption,
  Metodo_obtencion: source,
});

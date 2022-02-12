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
});

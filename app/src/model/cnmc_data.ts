import Papa from 'papaparse';
import { Consumption } from './consumption';

export type Data = {
  CUPS: string;
  Fecha: string;
  Hora: string;
  Consumo: string;
  Metodo_obtencion: string;
};

export const parseCSV = (file: File) => (): Promise<Data[]> => {
  return new Promise<Data[]>((resolve, reject) => {
    Papa.parse<string[], File>(file, {
      header: false,
      skipEmptyLines: true,
      complete: (res) =>
        resolve(
          res.data
            .map((row) => ({
              CUPS: row[0],
              Fecha: row[1],
              Hora: row[2],
              Consumo: row[3],
              Metodo_obtencion: row[4],
            }))
            .slice(1),
        ),
      error: reject,
    });
  });
};

export const toConsumptions = (data: Data[]): Consumption => {
  return data.reduce(
    (acc: Consumption, row) => ({
      ...acc,
      [row.Fecha]: {
        ...(acc[row.Fecha] || {}),
        [row.Hora]: { consumption: parseFloat(row.Consumo.replace(',', '.')) },
      },
    }),
    {},
  );
};

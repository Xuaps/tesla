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
    Papa.parse<Data, File>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => resolve(res.data),
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

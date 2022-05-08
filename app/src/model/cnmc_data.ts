import Papa from 'papaparse';
import { formatDate } from './date';

export type Data = {
  CUPS: string;
  Fecha: string;
  Hora: string;
  Consumo: string;
  Metodo_obtencion: string;
};
export type Period = 'punta' | 'valle' | 'llano';
export type Consumption = {
  [date: string]: {
    [k: number]: {
      consumption: number;
      period: Period;
    };
  };
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
        [row.Hora]: {
          consumption: parseFloat(row.Consumo.replace(',', '.')),
          period: getPeriod(row.Hora, row.Fecha),
        },
      },
    }),
    {},
  );
};

const isAHoliDay = (date: string): boolean =>
  [
    '01/01/2022',
    '06/01/2022',
    '15/04/2022',
    '15/08/2022',
    '12/10/2022',
    '01/11/2022',
    '06/12/2022',
    '08/12/2022',
  ].includes(date) ||
  new Date(formatDate(date)).getDay() === 0 ||
  new Date(formatDate(date)).getDay() === 6;

const getPeriod = (hour: string, date: string): Period => {
  const hourNumber = parseInt(hour);
  const valleHours = [1, 2, 3, 4, 5, 6, 7, 8];
  const llanoHours = [9, 10, 15, 16, 17, 18, 23, 24];

  if (isAHoliDay(date) || valleHours.includes(hourNumber)) return 'valle';
  if (llanoHours.includes(hourNumber)) return 'llano';

  return 'punta';
};

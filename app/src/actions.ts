import Papa from 'papaparse';

export type Data = {
    CUPS: string;
    Fecha: string;
    Hora: string;
    Consumo: string;
    Metodo_obtencion: string;
};

export type Consumption = {
    cups: string;
    date: string;
    hour: string;
    consumption: number;
};

export const parseCSV = (file: File) => () => {
    return new Promise<Data[]>((resolve, reject) => {
        Papa.parse<Data, File>(file, {
            header: true,
            skipEmptyLines: true,
            complete: (res) => resolve(res.data),
            error: reject,
        });
    });
};

export const toConsumptions = (data: Data[]): Consumption[] => {
    return data.map((row) => {
        return {
            cups: row.CUPS,
            date: row.Fecha,
            hour: row.Hora,
            consumption: parseFloat(row.Consumo.replace(',', '.')),
        };
    });
};

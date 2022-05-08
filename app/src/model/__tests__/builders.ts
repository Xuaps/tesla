import { Consumption, Period } from '..';

export const anyDayConsumption = ({
  date = '22/02/2022',
  consumptions = {},
}: {
  date?: string;
  consumptions?: Consumption[string];
} = {}): Consumption => ({
  [date]: consumptions,
});

export const anyHourConsumption = ({
  hour = 22,
  consumption = 0,
  period = 'valle',
}: {
  hour?: number;
  consumption?: number;
  period?: Period;
} = {}): Consumption[string] => ({
  [hour]: {
    consumption,
    period,
  },
});

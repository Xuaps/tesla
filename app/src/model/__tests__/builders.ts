import { Consumption } from '..';
import { Period, PriceSegment } from '../consumption';

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
  segment = 'average',
  cost = 0,
}: {
  hour?: number;
  consumption?: number;
  period?: Period;
  segment?: PriceSegment;
  cost?: number;
} = {}): Consumption[string] => ({
  [hour]: {
    consumption,
    cost,
    period,
    segment,
  },
});

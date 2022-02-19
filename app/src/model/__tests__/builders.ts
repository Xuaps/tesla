import { Consumption } from '..';

export const anyDayConsumption = ({
  date = '22/02/2022',
  consumptions = {},
}): Consumption => ({
  [date]: consumptions,
});

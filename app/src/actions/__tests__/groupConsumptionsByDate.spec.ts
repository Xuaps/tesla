import { groupConsumptionByDate } from '..';

describe('Group consumption by date', () => {
  it('should group hour consumption by date', () => {
    const consumptions = {
      ...anyDayConsumption({
        consumptions: { '1': { consumption: 2.345 }, '10': { consumption: 4.567 }, '2': { consumption: 4.789 } },
      }),
    };
    const result = groupConsumptionByDate(consumptions);

    expect(result).toStrictEqual([
      {
        name: '22/02/2022',
        data: [2.345, 4.789, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 4.567],
      },
    ]);
  });
});

const anyDayConsumption = ({ date = '22/02/2022', consumptions = {} }) => ({
  [date]: consumptions,
});

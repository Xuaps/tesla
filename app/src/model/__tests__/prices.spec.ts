import {
  getAveragePrice,
  getComisionPrice,
  getPuntaPrice,
  getVallePrice,
} from '../prices';

describe('Get punta price', () => {
  it('should return the correct price', () => {
    const price = getPuntaPrice(4.6, [
      { year: '2021', num: 29 },
      { year: '2022', num: 5 },
    ]);
    expect(price).toBe(10.44);
  });
});

describe('Get valle price', () => {
  it('should return the correct price', () => {
    const price = getVallePrice(4.6, [
      { year: '2021', num: 29 },
      { year: '2022', num: 5 },
    ]);
    expect(price).toBe(0.44);
  });
});

describe('Get comision price', () => {
  it('should return the correct price', () => {
    const price = getComisionPrice(7, 34);
    expect(price).toBe(2.03);
  });
});

describe('Get average price', () => {
  it('should return the correct price', () => {
    const price = getAveragePrice([
      {
        '2021-11-22T23:00:00+00:00': 0.22274,
        '2021-11-23T00:00:00+00:00': 0.10203,
      },
      {
        '2021-11-23T01:00:00+00:00': 0.30203,
      },
    ]);
    expect(price).toBe(0.21);
  });
});

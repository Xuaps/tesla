import { getComisionPrice, getPuntaPrice, getVallePrice } from '../prices';

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

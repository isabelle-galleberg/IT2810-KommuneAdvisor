import { getRatingDescription } from '../services/getRatingDescription';

describe('getRatingDescription', () => {
  test('it should return expected rating description according to input', () => {
    const input = 4;
    const output = 'Svært bra';
    expect(getRatingDescription(input)).toEqual(output);
  });

  test('it should return the empty string when rating is not 1-5', () => {
    const input = 7;
    const output = '';
    expect(getRatingDescription(input)).toEqual(output);
  });
});

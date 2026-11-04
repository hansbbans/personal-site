const { fuzzyMatch, updateMichelinStars } = require('../../scripts/update-badges');

describe('fuzzyMatch', () => {
  test.each([
    ['Atomix', 'Atomix'],
    ['Le Bernardin', 'le bernardin'],
    ['Máximo Bistrot', 'Maximo Bistrot'],
    ["ZZ's Clam Bar", 'ZZs Clam Bar'],
  ])('%s matches %s', (a, b) => expect(fuzzyMatch(a, b)).toBe(true));

  test.each([
    ['Sushi Ishikawa', 'Sushi Sho'],
    ['Sushi Yasaka', 'Sushi of Gari'],
    ['White Bear', 'One White Street'],
    ['Okiboru House of Tsukumen', 'Hanoi House'],
  ])('%s does not match %s', (a, b) => expect(fuzzyMatch(a, b)).toBe(false));
});

describe('updateMichelinStars', () => {
  test('sets real matches and clears stale flags', () => {
    const data = { cities: [{ name: 'NYC', restaurants: [
      { name: 'Atomix' },
      { name: 'Rubirosa' },
      { name: 'Sushi Ishikawa', michelinStars: 3, michelinBibGourmand: true },
      { name: 'White Bear', michelinStars: 1 },
    ] }] };
    updateMichelinStars(data, 'NYC');
    const [atomix, rubirosa, ishikawa, whiteBear] = data.cities[0].restaurants;
    expect(atomix.michelinStars).toBe(2);
    expect(rubirosa.michelinBibGourmand).toBe(true);
    expect(ishikawa).toEqual({ name: 'Sushi Ishikawa' });
    expect(whiteBear).toEqual({ name: 'White Bear' });
  });
});

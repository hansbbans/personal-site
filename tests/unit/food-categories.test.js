const { getCategoryInfo, FOOD_CATEGORIES } = require('../../js/food-categories');
const data = require('../../data/food-data.json');

// Legacy values the data itself maps to different categories; left for the user.
const AMBIGUOUS = ['Seafood', 'Fine Dining', 'Street Food'];

test.each(Object.keys(FOOD_CATEGORIES))('main category name %s maps to its Other subcategory', (main) => {
  expect(getCategoryInfo(main)).toEqual({ mainCategory: main, subcategory: `Other ${main}` });
});

test('subcategory names map to their main category', () => {
  expect(getCategoryInfo('Burgers/Diners')).toEqual({ mainCategory: 'American', subcategory: 'Burgers/Diners' });
  expect(getCategoryInfo('Coffee/Cafes')).toEqual({ mainCategory: 'Cafes & Desserts', subcategory: 'Coffee/Cafes' });
  expect(getCategoryInfo('Cocktail Bars')).toEqual({ mainCategory: 'Bars & Drinks', subcategory: 'Cocktail Bars' });
});

test('every unambiguous legacy category in the data maps to a category', () => {
  const unmapped = new Set();
  for (const city of data.cities) {
    for (const r of city.restaurants) {
      if (r.legacyCategory && !AMBIGUOUS.includes(r.legacyCategory) && !getCategoryInfo(r.legacyCategory).mainCategory) {
        unmapped.add(r.legacyCategory);
      }
    }
  }
  expect([...unmapped]).toEqual([]);
});

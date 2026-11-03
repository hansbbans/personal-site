const { validateSchema } = require('../setup/validate-food-data');
const schema = require('../schemas/food-data.schema.json');

const validData = () => ({
  metadata: { lastUpdated: '2026-01-01', version: '1' },
  categories: { Asian: { emoji: '🍜', subcategories: ['Japanese'] } },
  cities: [{
    name: 'Toronto',
    restaurants: [{
      name: 'Place', mainCategory: 'Asian', subcategory: 'Japanese',
      lat: 43.6, lng: -79.4, address: '1 Main St', googleRating: 4.5, yelpRating: null
    }]
  }]
});

describe('validateSchema', () => {
  test('accepts valid data, including nullable ratings', () => {
    expect(validateSchema(validData(), schema)).toEqual([]);
  });

  test('accepts union types', () => {
    expect(validateSchema(4.5, { type: ['number', 'null'] })).toEqual([]);
    expect(validateSchema(null, { type: ['number', 'null'] })).toEqual([]);
    expect(validateSchema('x', { type: ['number', 'null'] })).toHaveLength(1);
  });

  test('checks restaurants through $ref definitions', () => {
    const data = validData();
    Object.assign(data.cities[0].restaurants[0], { lat: 999, lng: 'abc', googleRating: 9, name: '' });
    delete data.cities[0].restaurants[0].address;
    const errors = validateSchema(data, schema);
    expect(errors.join('\n')).toMatch(/lat.*maximum/);
    expect(errors.join('\n')).toMatch(/lng.*expected type number/);
    expect(errors.join('\n')).toMatch(/googleRating.*maximum/);
    expect(errors.join('\n')).toMatch(/name.*minLength/);
    expect(errors.join('\n')).toMatch(/missing required property 'address'/);
  });

  test('checks cities through $ref definitions', () => {
    const data = validData();
    data.cities[0].name = '';
    expect(validateSchema(data, schema).join('\n')).toMatch(/cities\[0\]\.name.*minLength/);
  });

  test('applies additionalProperties schemas to category entries', () => {
    const data = validData();
    data.categories.Asian = { emoji: '🍜' };
    expect(validateSchema(data, schema).join('\n')).toMatch(/categories\.Asian.*subcategories/);
  });
});

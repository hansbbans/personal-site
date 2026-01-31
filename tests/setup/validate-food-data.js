#!/usr/bin/env node
/**
 * Validate food-data.json against schema
 * Checks structure, required fields, coordinate ranges, and rating formats
 */

const fs = require('fs');
const path = require('path');

// Simple JSON schema validator (no external dependencies for CI)
function validateSchema(data, schema, path = '') {
  const errors = [];
  
  function addError(message) {
    errors.push(`${path || 'root'}: ${message}`);
  }
  
  // Check type
  if (schema.type) {
    const actualType = Array.isArray(data) ? 'array' : typeof data;
    if (actualType !== schema.type) {
      addError(`expected type ${schema.type}, got ${actualType}`);
      return errors;
    }
  }
  
  // Check required properties for objects
  if (schema.required && typeof data === 'object' && data !== null) {
    for (const prop of schema.required) {
      if (!(prop in data)) {
        addError(`missing required property '${prop}'`);
      }
    }
  }
  
  // Check properties
  if (schema.properties && typeof data === 'object' && data !== null) {
    for (const [key, value] of Object.entries(data)) {
      if (schema.properties[key]) {
        const propErrors = validateSchema(value, schema.properties[key], `${path}.${key}`);
        errors.push(...propErrors);
      }
    }
  }
  
  // Check items for arrays
  if (schema.items && Array.isArray(data)) {
    data.forEach((item, index) => {
      const itemErrors = validateSchema(item, schema.items, `${path}[${index}]`);
      errors.push(...itemErrors);
    });
  }
  
  // Check minimum/maximum for numbers
  if (typeof data === 'number') {
    if (schema.minimum !== undefined && data < schema.minimum) {
      addError(`value ${data} is less than minimum ${schema.minimum}`);
    }
    if (schema.maximum !== undefined && data > schema.maximum) {
      addError(`value ${data} is greater than maximum ${schema.maximum}`);
    }
  }
  
  // Check pattern for strings
  if (schema.pattern && typeof data === 'string') {
    const regex = new RegExp(schema.pattern);
    if (!regex.test(data)) {
      addError(`value '${data}' does not match pattern ${schema.pattern}`);
    }
  }
  
  // Check minLength for strings
  if (schema.minLength !== undefined && typeof data === 'string') {
    if (data.length < schema.minLength) {
      addError(`string length ${data.length} is less than minLength ${schema.minLength}`);
    }
  }
  
  // Check minItems for arrays
  if (schema.minItems !== undefined && Array.isArray(data)) {
    if (data.length < schema.minItems) {
      addError(`array length ${data.length} is less than minItems ${schema.minItems}`);
    }
  }
  
  // Check additionalProperties
  if (schema.additionalProperties === false && typeof data === 'object' && data !== null) {
    const allowedProps = Object.keys(schema.properties || {});
    for (const key of Object.keys(data)) {
      if (!allowedProps.includes(key)) {
        addError(`additional property '${key}' is not allowed`);
      }
    }
  }
  
  // Handle oneOf, anyOf
  if (schema.anyOf && Array.isArray(schema.anyOf)) {
    const validAny = schema.anyOf.some(subSchema => validateSchema(data, subSchema, path).length === 0);
    if (!validAny) {
      addError(`data does not match any of the allowed schemas`);
    }
  }
  
  return errors;
}

function validateFoodData() {
  console.log('🍽️  Validating food-data.json...\n');
  
  const dataPath = path.join(__dirname, '..', '..', 'data', 'food-data.json');
  const schemaPath = path.join(__dirname, '..', 'schemas', 'food-data.schema.json');
  
  // Check if files exist
  if (!fs.existsSync(dataPath)) {
    console.error(`❌ Data file not found: ${dataPath}`);
    process.exit(1);
  }
  
  if (!fs.existsSync(schemaPath)) {
    console.error(`❌ Schema file not found: ${schemaPath}`);
    process.exit(1);
  }
  
  // Load files
  let data, schema;
  try {
    data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } catch (err) {
    console.error(`❌ Failed to parse food-data.json: ${err.message}`);
    process.exit(1);
  }
  
  try {
    schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  } catch (err) {
    console.error(`❌ Failed to parse schema: ${err.message}`);
    process.exit(1);
  }
  
  // Validate against schema
  const errors = validateSchema(data, schema);
  
  // Additional custom validations
  console.log('📋 Running additional validations...\n');
  
  // Check category consistency
  const validMainCategories = Object.keys(data.categories || {});
  let restaurantCount = 0;
  
  for (const city of data.cities || []) {
    for (const restaurant of city.restaurants || []) {
      restaurantCount++;
      
      // Check mainCategory is valid
      if (!validMainCategories.includes(restaurant.mainCategory)) {
        errors.push(`restaurant '${restaurant.name}' in ${city.name}: invalid mainCategory '${restaurant.mainCategory}'`);
      }
      
      // Check subcategory is valid for mainCategory
      if (restaurant.mainCategory && data.categories[restaurant.mainCategory]) {
        const validSubcategories = data.categories[restaurant.mainCategory].subcategories;
        if (!validSubcategories.includes(restaurant.subcategory)) {
          errors.push(`restaurant '${restaurant.name}' in ${city.name}: invalid subcategory '${restaurant.subcategory}' for ${restaurant.mainCategory}`);
        }
      }
      
      // Check for duplicate restaurants in same city
      const duplicates = city.restaurants.filter(r => r.name === restaurant.name);
      if (duplicates.length > 1) {
        errors.push(`city '${city.name}': duplicate restaurant '${restaurant.name}' found ${duplicates.length} times`);
      }
    }
  }
  
  // Print results
  console.log(`📊 Statistics:`);
  console.log(`  Cities: ${data.cities?.length || 0}`);
  console.log(`  Categories: ${validMainCategories.length}`);
  console.log(`  Total Restaurants: ${restaurantCount}`);
  console.log();
  
  if (errors.length === 0) {
    console.log('✅ All validations passed!');
    return true;
  } else {
    console.log(`❌ Found ${errors.length} validation error(s):\n`);
    errors.forEach((err, idx) => {
      console.log(`  ${idx + 1}. ${err}`);
    });
    return false;
  }
}

// Run validation
const success = validateFoodData();
process.exit(success ? 0 : 1);

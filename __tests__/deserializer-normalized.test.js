const fs = require('fs');
const path = require('path');

const deserialize = require('../dist').deserialize;

// Fixtures
const resourceResponses = [
  require('./__fixtures__/resource_1.json'),
  require('./__fixtures__/resource_2.json'),
  require('./__fixtures__/resource_3.json'),
  require('./__fixtures__/resource_4.json'),
  require('./__fixtures__/resource_5.json'),
  require('./__fixtures__/resource_6.json'),
  require('./__fixtures__/resource_7.json'),
  require('./__fixtures__/resource_8.json'),
];

const collectionResponses = [
  require('./__fixtures__/collection_1.json'),
  require('./__fixtures__/collection_2.json'),
];

describe('JsonApiDeserializer', () => {
  resourceResponses.forEach((resourceResponse, index) => {
    describe(`Resource Response (${index + 1})`, () => {
      const normalizedResponse = deserialize(resourceResponse, { normalize: true });

      fs.writeFileSync(
        path.join(__dirname, `./__outputs__/resource_normalized_${index + 1}.json`),
        JSON.stringify(normalizedResponse)
      );

      test('RO data object contains nested full resource objects', () => {
        expect(normalizedResponse).toMatchSnapshot();
      });
    });
  });

  collectionResponses.forEach((collectionResponse, index) => {
    describe(`Collection Response (${index + 1})`, () => {
      const normalizedResponse = deserialize(collectionResponse, { normalize: true });

      fs.writeFileSync(
        path.join(__dirname, `./__outputs__/collection_normalized_${index + 1}.json`),
        JSON.stringify(normalizedResponse)
      );

      test('RO data object contains nested full resource objects', () => {
        expect(normalizedResponse).toMatchSnapshot();
      });
    });
  });
});

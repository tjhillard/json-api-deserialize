const deserialize = require('../../dist').deserialize;
const getNestedResource = require('../../dist').getNestedResource;

const resource = require('../__fixtures__/resource_3.json');

describe('getNestedResource()', () => {
  test('it returns the nested resource at the given path', () => {
    const res = deserialize(resource);

    expect(
      getNestedResource(res.data, 'owner.address.driveway')
    ).toEqual({
      id: '4',
      type: 'driveway',
      attributes: {
        type: 'The fancy circle type with a fountain in the middle'
      }
    });
  });

  test('it returns null when given an invalid path', () => {
    const res = deserialize(resource);

    expect(
      getNestedResource(res.data, 'foo.bar.bongo')
    ).toBe(null);
  });
});

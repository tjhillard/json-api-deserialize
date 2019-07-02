# json-api-deserialize

![CircleCI branch](https://img.shields.io/circleci/project/github/tjhillard/json-api-deserialize/master.svg)
[![npm version](https://badge.fury.io/js/json-api-deserialize.svg)](https://badge.fury.io/js/json-api-deserialize)
![npm](https://img.shields.io/npm/dt/json-api-deserialize.svg)
![NPM](https://img.shields.io/npm/l/json-api-deserialize.svg)

Massively simplifies the process of working with JSON:API data on the frontend.

* Nests included objects on resources 🕸
* Normalizes data structures 🏗
* Converts all object keys to camelCased values 🐫
* Written in TypeScript 🎉
* Compliant with JSON:API v1.0 Spec 📜
* Rigorously tested 🔬

## Raw
```json
{
  "data": {
    "type": "store",
    "id": "1",
    "attributes": {
      "name": "Mercer Island Book Store",
      "created_at": "2019-06-30T22:33:41+0000",
      "updated_at": "2019-06-30T22:33:41+0000"
    },
    "relationships": {
      "owner": {
        "data": {
          "id": "2",
          "type": "owner"
        }
      }
    }
  },
  "included": [
    {
      "type": "owner",
      "id": "2",
      "attributes": {
        "full_name": "John Doe",
        "created_at": "2019-06-30T22:33:41+0000",
        "updated_at": "2019-06-30T22:33:41+0000"
      },
      "relationships": {
        "address": {
          "data": {
            "id": "3",
            "type": "address"
          }
        }
      }
    },
    {
      "type": "address",
      "id": "3",
      "attributes": {
        "street": "123 Test Ave",
        "type": "commercial",
        "zip_code": "12345",
        "created_at": "2019-06-30T22:33:41+0000",
        "updated_at": "2019-06-30T22:33:41+0000"
      },
      "relationships": {
        "driveway": {
          "data": {
            "id": "4",
            "type": "driveway"
          }
        }
      }
    },
    {
      "type": "driveway",
      "id": "4",
      "attributes": {
        "type": "parking_lot",
        "created_at": "2019-06-30T22:33:41+0000",
        "updated_at": "2019-06-30T22:33:41+0000"
      }
    }
  ]
}
```

## Deserialized
```js
{
  data: {
    id: '1',
    name: 'Mercer Island Book Store',
    createdAt: '2019-06-30T22:33:41+0000',
    updatedAt: '2019-06-30T22:33:41+0000',
    owner: {
      id: '2',
      fullName: 'John Doe',
      createdAt: '2019-06-30T22:33:41+0000',
      updatedAt: '2019-06-30T22:33:41+0000',
      address: {
        id: '3',
        street: '123 Test Ave',
        type: 'commercial',
        zipCode: '12345',
        createdAt: '2019-06-30T22:33:41+0000',
        updatedAt: '2019-06-30T22:33:41+0000',
        driveway: {
          id: '4',
          type: 'parking_lot',
          createdAt: '2019-06-30T22:33:41+000',
          updatedAt: '2019-06-30T22:33:41+0000',
        }
      }
    }
  }
  deserialized: true,
}
```

Pair with Axios interceptors for a seamless experience.

```js
import { deserialize } from 'json-api-deserialize';

axios.interceptors.response.use((response) => {
    return {
      ...response,
      ...deserialize(response.data),
    };
  }, (error) => {
    return Promise.reject(error);
  });
```

```js
const fetchBookstore = async () => {
  const { data: store } = await get('/store/1?include=owner');
  console.log(store.owner.fullName); // 👉 John Doe
};
```

## Install

```
yarn add json-api-deserialize
```
```
npm i json-api-deserialize
```

## API

#### Deserialize

```ts
deserialize(rawJsonApiDocument, options?): deserializedResponseObject | rawJsonApiDocument;
```

**Options:**

* Normalize (boolean, default: true)
	* Flattens the deserialized response object to spread `attributes` and `relationships` properties to the same level as `id`
	* Converts all object keys to camelCase variants

`deserialize` returns a deserialized response object and falls back to the raw response object if an exception is caught.

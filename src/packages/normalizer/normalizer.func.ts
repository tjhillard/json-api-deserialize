import { isObject, isArray, camelCase } from 'lodash';
import IDeserialized from "src/meta/deserialized.interface";

export const normalize = (deserializedData: IDeserialized): IDeserialized => {
  const normalizeGivenObject = (object: any): void => {
    for (const key in object) {
      let attrs, relationships, data;

      // Handle collections
      if (isArray(object[key])) {
        for (const objInArray of object[key]) {
          if (objInArray.type) {
            delete objInArray.type;
          }

          normalizeGivenObject(objInArray);
        }
      }

      // Delete the type property off of Resource Objects
      // Prevents collisions for resources that have a type attribute
      if (object.data && object.data.type) {
        delete object.data.type;
      }

      // Assign data/attributes/relationships to temp variable
      // so they can be spread on to the current object cleanly
      if (object[key] && object[key].data) {
        data = object[key].data;
      }

      if (data) {
        if (isArray(data)) {
          object[key] = data;
        } else {
          delete object[key].data;
          if (data.type) {
            delete data.type;
          }
          Object.assign(object[key], data);
          normalizeGivenObject(object);
        }
      }

      if (object.attributes) {
        attrs = object.attributes;
      }

      if (object.relationships) {
        relationships = object.relationships;
      }

      if (attrs) {
        delete object.attributes;
        Object.assign(object, attrs);
        normalizeGivenObject(object);
      }

      if (relationships) {
        delete object.relationships;
        Object.assign(object, relationships);
        normalizeGivenObject(object);
      }

      // Changes all object key values to camelCase variants
      const keyToCamelCase = camelCase(key);

      if (key !== keyToCamelCase) {
        Object.defineProperty(object, keyToCamelCase, Object.getOwnPropertyDescriptor(object, key));
        delete object[key];
      }

      // If the object property is an object, normalize
      if (isObject(object[keyToCamelCase])) {
        normalizeGivenObject(object[keyToCamelCase]);
      }
    }
  };

  normalizeGivenObject(deserializedData);

  return deserializedData;
};
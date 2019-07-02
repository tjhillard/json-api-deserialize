import IRelationships from "./relationships.interface";

// https://jsonapi.org/format/#document-resource-objects

export default interface IResource {
  id: string;
  type: string;
  attributes?: object; // IAttributesObject
  relationships?: {
    [key: string]: IRelationships;
  }; // IRelationshipsObject
  links?: object; // ILinksObject
  meta?: object; // IMetaObject
};

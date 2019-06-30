import IResourceIdentifier from "./resource-identifier.interface";
import ILinks from "./links.interface";

// https://jsonapi.org/format/#document-resource-object-relationships

export default interface IRelationships {
  // https://jsonapi.org/format/#document-resource-object-linkage
  data?: IResourceIdentifier | IResourceIdentifier[] | null | [];
  meta?: object; // IMeta
  links?: ILinks;
};
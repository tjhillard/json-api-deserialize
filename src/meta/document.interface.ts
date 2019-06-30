import IResource from "./resource.interface";
import IResourceIdentifier from "./resource-identifier.interface";
import IError from "./error.interface";
import ILinks from "./links.interface";

// https://jsonapi.org/format/#document-top-level

export default interface IDocument {
  data?: IResource | IResource[] | IResourceIdentifier | IResourceIdentifier[] | null | [];
  errors?: IError;
  included?: IResource[];
  links?: ILinks;
  meta?: object;
  jsonapi?: object;
};

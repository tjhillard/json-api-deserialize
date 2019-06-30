import IResourceIdentifier from "./resource-identifier.interface";
import ILinks from "./links.interface";
export default interface IRelationships {
    data?: null | [] | IResourceIdentifier | IResourceIdentifier[];
    meta?: object;
    links?: ILinks;
}

import IResourceIdentifier from "./resource-identifier.interface";
import ILinks from "./links.interface";
export default interface IRelationships {
    data?: IResourceIdentifier | IResourceIdentifier[] | null | [];
    meta?: object;
    links?: ILinks;
}

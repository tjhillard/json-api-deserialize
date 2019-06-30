import IRelationships from "./relationships.interface";
export default interface IResource {
    id: string;
    type: string;
    attributes?: object;
    relationships?: {
        [key: string]: IRelationships;
    };
    links?: object;
    meta?: object;
}

export default interface IResource {
    id: string;
    type: string;
    attributes?: object;
    relationships?: object;
    links?: object;
    meta?: object;
}

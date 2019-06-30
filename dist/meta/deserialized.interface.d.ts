import IResource from "./resource.interface";
export default interface IDeserialized {
    deserialized: boolean;
    data: IResource | IResource[];
    included?: IResource[];
}

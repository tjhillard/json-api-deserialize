import IResource from "./resource.interface";

export default interface IDeserialized {
  deserialized: boolean;
  data: IResource | IResource[];
  included?: IResource[]; // This property gets deleted before return
};
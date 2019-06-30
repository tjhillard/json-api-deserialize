import IDocument from '../../meta/document.interface';
import IDeserialized from '../../meta/deserialized.interface';
declare class Deserializer {
    private response;
    private deserialized;
    getDeserialized(response: IDocument, options: any): IDocument | IDeserialized;
    private mapResources;
    private setNestedResourceOnIdentifierObject;
    private normalize;
    private getReturnObject;
}
declare const _default: Deserializer;
export default _default;

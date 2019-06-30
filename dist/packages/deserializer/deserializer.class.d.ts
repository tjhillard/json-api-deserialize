import IDocument from '../../meta/document.interface';
import IDeserialized from '../../meta/deserialized.interface';
declare class Deserializer {
    private response;
    private deserialized;
    getDeserialized(response: IDocument, options?: any): IDeserialized | IDocument;
    private mapResources;
    private setNestedResourceOnIdentifierObject;
    private getReturnObject;
}
declare const _default: Deserializer;
export default _default;

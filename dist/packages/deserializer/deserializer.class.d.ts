import IDocument from '../../meta/document.interface';
import IDeserialized from '../../meta/deserialized.interface';
import IDeserializeOptions from 'src/meta/deserialize-options.interface';
declare class Deserializer {
    private response;
    private deserialized;
    getDeserialized(response: IDocument, options?: IDeserializeOptions): IDeserialized | IDocument;
    private mapResources;
    private setNestedResourceOnIdentifierObject;
    private getReturnObject;
}
declare const _default: Deserializer;
export default _default;

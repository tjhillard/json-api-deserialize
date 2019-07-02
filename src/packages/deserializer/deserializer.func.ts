import IDocument from 'src/meta/document.interface';
import { default as Deserializer } from './deserializer.class';
import IDeserializeOptions from 'src/meta/deserialize-options.interface';

/**
 *
 * Takes a raw JSON:API document and returns the deserialized version.
 *
 */
export const deserialize = (response: IDocument, options?: IDeserializeOptions) => {
  return Deserializer.getDeserialized(response, options);
};

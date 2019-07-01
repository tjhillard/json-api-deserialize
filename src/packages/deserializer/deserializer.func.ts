import IDocument from 'src/meta/document.interface';
import { default as Deserializer } from './deserializer.class';
import IDeserializeOptions from 'src/meta/deserialize-options.interface';

/**
 *
 * Function wrapper for deserializer class
 *
 */
export const deserialize = (response: IDocument, options?: IDeserializeOptions) => {
  return Deserializer.getDeserialized(response, options);
};

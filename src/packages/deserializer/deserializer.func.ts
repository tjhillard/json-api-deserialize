import IDocument from 'src/meta/document.interface';
import { default as Deserializer } from './deserializer.class';

/**
 *
 * Function wrapper for deserializer class
 *
 */
export const deserialize = (response: IDocument, options?: any) => {
  return Deserializer.getDeserialized(response, options);
};

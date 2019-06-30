import { get } from 'lodash';

import IResource from 'src/meta/resource.interface';

/**
 *
 * Helper function for safely getting a nested resource
 * @example const page = getNestedResource(res.data, 'book.chapter.page');
 *
 */
export const getNestedResource = (
    deserializedData: IResource,
    resourcePath: string,
  ): IResource | null => {
  try {
    const split = resourcePath.split('.');

    split.forEach((resourceType, index) => {
      if (index === split.length - 1) {
        split.splice(index, 1, `${resourceType}.data`);
      } else {
        split.splice(index, 1, `${resourceType}.data.relationships`);
      }
    });

    const path = 'relationships.' + split.join('.');

    return get(
      deserializedData,
      path,
    ) || null;
  } catch (err) {
    return null;
  }
};

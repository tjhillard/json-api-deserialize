import { get, set } from 'lodash';
import { asArray } from '../../utils'

import { normalize } from '../normalizer/normalizer.func';

import IDocument from '../../meta/document.interface';
import IResource from '../../meta/resource.interface';
import IResourceIdentifier from '../../meta/resource-identifier.interface';
import IDeserialized from '../../meta/deserialized.interface';
import IDeserializeOptions from 'src/meta/deserialize-options.interface';

class Deserializer {
  private response: IDocument;
  private deserialized: IDeserialized;

  public getDeserialized(
    response: IDocument,
    options: IDeserializeOptions = { normalize: true },
  ): IDeserialized | IDocument {
    this.response = response; // Keep an instance copy of the raw response
    this.deserialized = response as IDeserialized; // The object to modify that will get returned

    try {
      if (!response || !response.included) {
        return this.getReturnObject(true, options);
      }

      const resourceAsArray: IResource[] = asArray(response.data);

      for (const [index, resource] of resourceAsArray.entries()) {
        this.mapResources(resource, index);
      }

      return this.getReturnObject(true, options);
    } catch (err) {
      return this.response;
    }
  }

  private mapResources(resource: IResource, indexInCollection?: number, nestedObjectPath?: string) {
    for (const resourceRelationshipKey in resource.relationships) {
      const resourceIdentifiers: IResourceIdentifier[] = asArray(resource.relationships[resourceRelationshipKey].data);

      for (const resourceIdentifier of resourceIdentifiers) {
        if (resourceIdentifier && resourceIdentifier.id && resourceIdentifier.type) {
          const includedResourceObject = this.response.included.find((included) => {
            return included.id === resourceIdentifier.id
          && included.type === resourceIdentifier.type;
          });

          if (includedResourceObject) {
            if (Array.isArray(this.response.data)) {
              this.setNestedResourceOnIdentifierObject(
                nestedObjectPath
                  ? nestedObjectPath + `.relationships[${resourceRelationshipKey}].data`
                  : null
              || `data[${indexInCollection}]relationships[${resourceRelationshipKey}].data`,
                includedResourceObject,
                indexInCollection,
              );
            } else {
              this.setNestedResourceOnIdentifierObject(
                nestedObjectPath
                  ? nestedObjectPath + `.relationships[${resourceRelationshipKey}].data`
                  : null
              || `data.relationships[${resourceRelationshipKey}].data`,
                includedResourceObject,
              );
            }
          }
        }
      }
    }
  }

  private setNestedResourceOnIdentifierObject(
    identifierObjectPath: string,
    includedResourceObject: IResource,
    indexInCollection?: number,
  ) {
    const resourceIdObject: IResourceIdentifier = get(this.response, identifierObjectPath);
    let fullPath: string = identifierObjectPath;

    if (resourceIdObject) {
      if (Array.isArray(resourceIdObject)) {
        const resourceIdObjectIndex: number = resourceIdObject.findIndex((identifierObject) => {
          return identifierObject.id === includedResourceObject.id
          && identifierObject.type === includedResourceObject.type;
        });

        fullPath = fullPath + `[${resourceIdObjectIndex}]`;

        set(this.deserialized, fullPath, includedResourceObject);
      } else {
        set(this.deserialized, fullPath, includedResourceObject);
      }
    }

    if (includedResourceObject.relationships) {
      this.mapResources(includedResourceObject, indexInCollection, fullPath);
    }
  }

  private getReturnObject(wasDeserialized: boolean, options: IDeserializeOptions) {
    this.deserialized.deserialized = wasDeserialized;
    if (wasDeserialized) {
      delete this.deserialized.included;
    }

    if (wasDeserialized && options.normalize) {
      return normalize(this.deserialized);
    } else {
      return this.deserialized;
    }
  }
}

export default new Deserializer();

import { get, set, isObject } from 'lodash';
import { asArray } from '../../utils'

import IDocument from '../../meta/document.interface';
import IResource from '../../meta/resource.interface';
import IResourceIdentifier from '../../meta/resource-identifier.interface';
import IDeserialized from '../../meta/deserialized.interface';

class Deserializer {
  private response: IDocument;
  private deserialized: IDeserialized;

  public getDeserialized(response: IDocument, options: any) {
    this.response = response; // Keep an instance copy of the raw response
    this.deserialized = <IDeserialized>response; // The object to modify that will get returned

    try {
      if (!response || !response.included) {
        return this.getReturnObject(false);
      }

      const resourceAsArray: IResource[] = asArray(response.data);

      for (const [index, resource] of resourceAsArray.entries()) {
        this.mapResources(resource, index);
      }
      if (options.normalize) {
        this.normalize();
      }

      return this.getReturnObject(true);
    } catch (err) {
      return this.response;
    }
  }

  private mapResources(resource: IResource, indexInCollection?: number, nestedObjectPath?: string) {
    for (const resourceRelationshipKey in resource.relationships) {
      const resourceIdentifiers: IResourceIdentifier[] = asArray(resource.relationships[resourceRelationshipKey].data);

      for (const resourceIdentifier of resourceIdentifiers) {
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

  private normalize() {
    const eachRecursively = (object: any): void => {
      for (const key in object) {
        let attrs, relationships, data;

        if (object.id && object.type) {
          delete object.type;
        }

        if (object.attributes) {
          attrs = object.attributes;
        }

        if (object.relationships) {
          relationships = object.relationships;
        }

        if (object.data) {
          data = object.data;
        }

        if (attrs) {
          delete object.attributes;
          Object.assign(object, attrs);
          eachRecursively(object);
        }

        if (relationships) {
          delete object.relationships;
          Object.assign(object, relationships);
          eachRecursively(object);
        }

        if (data) {
          delete object.data;
          Object.assign(object, data);
          eachRecursively(object);
        }

        if (isObject(object[key])) {
          eachRecursively(object[key]);
        }
      }
    };

    eachRecursively(this.deserialized.data);
  }

  private getReturnObject(wasDeserialized: boolean) {
    this.deserialized.deserialized = wasDeserialized;
    if (wasDeserialized) {
      delete this.deserialized.included;
    }
    return this.deserialized;
  }
}

export default new Deserializer();

"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
var lodash_1 = require("lodash");
var utils_1 = require("../../utils");
var normalizer_func_1 = require("../normalizer/normalizer.func");
var Deserializer = (function () {
    function Deserializer() {
    }
    Deserializer.prototype.getDeserialized = function (response, options) {
        if (options === void 0) { options = { normalize: true }; }
        var e_1, _a;
        this.response = response;
        this.deserialized = response;
        try {
            if (!response || !response.included) {
                return this.getReturnObject(true, options);
            }
            var resourceAsArray = utils_1.asArray(response.data);
            try {
                for (var _b = __values(resourceAsArray.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), index = _d[0], resource = _d[1];
                    this.mapResources(resource, index);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return this.getReturnObject(true, options);
        }
        catch (err) {
            return this.response;
        }
    };
    Deserializer.prototype.mapResources = function (resource, indexInCollection, nestedObjectPath) {
        var e_2, _a;
        for (var resourceRelationshipKey in resource.relationships) {
            var resourceIdentifiers = utils_1.asArray(resource.relationships[resourceRelationshipKey].data);
            var _loop_1 = function (resourceIdentifier) {
                var includedResourceObject = this_1.response.included.find(function (included) {
                    return included.id === resourceIdentifier.id
                        && included.type === resourceIdentifier.type;
                });
                if (includedResourceObject) {
                    if (Array.isArray(this_1.response.data)) {
                        this_1.setNestedResourceOnIdentifierObject(nestedObjectPath
                            ? nestedObjectPath + (".relationships[" + resourceRelationshipKey + "].data")
                            : null
                                || "data[" + indexInCollection + "]relationships[" + resourceRelationshipKey + "].data", includedResourceObject, indexInCollection);
                    }
                    else {
                        this_1.setNestedResourceOnIdentifierObject(nestedObjectPath
                            ? nestedObjectPath + (".relationships[" + resourceRelationshipKey + "].data")
                            : null
                                || "data.relationships[" + resourceRelationshipKey + "].data", includedResourceObject);
                    }
                }
            };
            var this_1 = this;
            try {
                for (var resourceIdentifiers_1 = __values(resourceIdentifiers), resourceIdentifiers_1_1 = resourceIdentifiers_1.next(); !resourceIdentifiers_1_1.done; resourceIdentifiers_1_1 = resourceIdentifiers_1.next()) {
                    var resourceIdentifier = resourceIdentifiers_1_1.value;
                    _loop_1(resourceIdentifier);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (resourceIdentifiers_1_1 && !resourceIdentifiers_1_1.done && (_a = resourceIdentifiers_1["return"])) _a.call(resourceIdentifiers_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    };
    Deserializer.prototype.setNestedResourceOnIdentifierObject = function (identifierObjectPath, includedResourceObject, indexInCollection) {
        var resourceIdObject = lodash_1.get(this.response, identifierObjectPath);
        var fullPath = identifierObjectPath;
        if (resourceIdObject) {
            if (Array.isArray(resourceIdObject)) {
                var resourceIdObjectIndex = resourceIdObject.findIndex(function (identifierObject) {
                    return identifierObject.id === includedResourceObject.id
                        && identifierObject.type === includedResourceObject.type;
                });
                fullPath = fullPath + ("[" + resourceIdObjectIndex + "]");
                lodash_1.set(this.deserialized, fullPath, includedResourceObject);
            }
            else {
                lodash_1.set(this.deserialized, fullPath, includedResourceObject);
            }
        }
        if (includedResourceObject.relationships) {
            this.mapResources(includedResourceObject, indexInCollection, fullPath);
        }
    };
    Deserializer.prototype.getReturnObject = function (wasDeserialized, options) {
        this.deserialized.deserialized = wasDeserialized;
        if (wasDeserialized) {
            delete this.deserialized.included;
        }
        if (wasDeserialized && options.normalize) {
            return normalizer_func_1.normalize(this.deserialized);
        }
        else {
            return this.deserialized;
        }
    };
    return Deserializer;
}());
exports["default"] = new Deserializer();
//# sourceMappingURL=deserializer.class.js.map
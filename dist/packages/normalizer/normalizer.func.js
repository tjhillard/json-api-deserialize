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
exports.__esModule = true;
var lodash_1 = require("lodash");
exports.normalize = function (deserializedData) {
    var normalizeGivenObject = function (object) {
        var e_1, _a;
        for (var key in object) {
            var attrs = void 0, relationships = void 0, data = void 0;
            if (lodash_1.isArray(object[key])) {
                try {
                    for (var _b = __values(object[key]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var objInArray = _c.value;
                        if (objInArray.type) {
                            delete objInArray.type;
                        }
                        normalizeGivenObject(objInArray);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            if (object.data && object.data.type) {
                delete object.data.type;
            }
            if (object[key].data) {
                data = object[key].data;
            }
            if (data) {
                if (lodash_1.isArray(data)) {
                    object[key] = data;
                }
                else {
                    delete object[key].data;
                    if (data.type) {
                        delete data.type;
                    }
                    Object.assign(object[key], data);
                    normalizeGivenObject(object);
                }
            }
            if (object.attributes) {
                attrs = object.attributes;
            }
            if (object.relationships) {
                relationships = object.relationships;
            }
            if (attrs) {
                delete object.attributes;
                Object.assign(object, attrs);
                normalizeGivenObject(object);
            }
            if (relationships) {
                delete object.relationships;
                Object.assign(object, relationships);
                normalizeGivenObject(object);
            }
            var keyToCamelCase = lodash_1.camelCase(key);
            if (key !== keyToCamelCase) {
                Object.defineProperty(object, keyToCamelCase, Object.getOwnPropertyDescriptor(object, key));
                delete object[key];
            }
            if (lodash_1.isObject(object[keyToCamelCase])) {
                normalizeGivenObject(object[keyToCamelCase]);
            }
        }
    };
    normalizeGivenObject(deserializedData);
    return deserializedData;
};
//# sourceMappingURL=normalizer.func.js.map
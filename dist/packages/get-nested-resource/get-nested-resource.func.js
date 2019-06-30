"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
exports.getNestedResource = function (deserializedData, resourcePath) {
    try {
        var split_1 = resourcePath.split('.');
        split_1.forEach(function (resourceType, index) {
            if (index === split_1.length - 1) {
                split_1.splice(index, 1, resourceType + ".data");
            }
            else {
                split_1.splice(index, 1, resourceType + ".data.relationships");
            }
        });
        var path = 'relationships.' + split_1.join('.');
        return lodash_1.get(deserializedData, path) || null;
    }
    catch (err) {
        return null;
    }
};
//# sourceMappingURL=get-nested-resource.func.js.map
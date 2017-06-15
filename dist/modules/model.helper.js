"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ModelHelper {
    static getId(url) {
        const path = url.substring(url.lastIndexOf('/'));
        const id = path.substring(path.indexOf('.') + 1, path.lastIndexOf('.'));
        return id;
    }
}
exports.ModelHelper = ModelHelper;
//# sourceMappingURL=model.helper.js.map
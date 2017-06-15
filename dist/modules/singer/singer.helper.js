"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_helper_1 = require("../model.helper");
const singerPath = 'nghe-si-';
class SingerHelper extends model_helper_1.ModelHelper {
    static getId(url) {
        const startIndex = url.lastIndexOf(singerPath) + singerPath.length;
        const endIndex = url.lastIndexOf('.html');
        return url.substring(startIndex, endIndex);
    }
    static singers(singers) {
        return singers.map(singer => ({
            id: SingerHelper.getId(singer.url),
            name: singer.name,
            avatar: singer.avatar
        }));
    }
}
exports.SingerHelper = SingerHelper;
//# sourceMappingURL=singer.helper.js.map
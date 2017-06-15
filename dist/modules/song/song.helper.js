"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_helper_1 = require("../model.helper");
const suffix_1 = require("../suffix");
class SongHelper extends model_helper_1.ModelHelper {
    static getLink(category) {
        let link = category;
        if (category.indexOf(suffix_1.HOT_LINK_SUFFIX) != -1) {
            link = category.substring(0, category.indexOf(suffix_1.HOT_LINK_SUFFIX));
        }
        else if (category.indexOf(suffix_1.NEW_LINK_SUFFIX) != -1) {
            link = category.substring(0, category.indexOf(suffix_1.NEW_LINK_SUFFIX));
        }
        return link;
    }
    static songs(songs) {
        return songs.map(song => ({
            id: SongHelper.getId(song.url),
            name: song.name,
            singer: song.singer
        }));
    }
}
exports.SongHelper = SongHelper;
//# sourceMappingURL=song.helper.js.map
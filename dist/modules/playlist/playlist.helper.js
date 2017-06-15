"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_helper_1 = require("../model.helper");
const suffix_1 = require("../suffix");
class PlaylistHelper extends model_helper_1.ModelHelper {
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
    static playlists(playlists) {
        return playlists.map(playlist => ({
            id: PlaylistHelper.getId(playlist.url),
            name: playlist.name,
            singer: playlist.singer,
            avatar: playlist.avatar
        }));
    }
}
exports.PlaylistHelper = PlaylistHelper;
//# sourceMappingURL=playlist.helper.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_helper_1 = require("../model.helper");
const suffix_1 = require("../suffix");
class VideoHelper extends model_helper_1.ModelHelper {
    static getLink(category) {
        let link = category;
        if (category.indexOf(suffix_1.HOT_VIDEO_LINK_SUFFIX) != -1) {
            link = category.substring(0, category.indexOf(suffix_1.HOT_VIDEO_LINK_SUFFIX));
        }
        return link;
    }
    static videos(videos) {
        return videos.map(video => ({
            id: VideoHelper.getId(video.url),
            name: video.name,
            singer: video.singer,
            avatar: video.avatar,
            time: video.time
        }));
    }
}
exports.VideoHelper = VideoHelper;
//# sourceMappingURL=video.helper.js.map
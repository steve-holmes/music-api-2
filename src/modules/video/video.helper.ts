import { ModelHelper } from '../model.helper';

import { NEW_VIDEO_LINK_SUFFIX, HOT_VIDEO_LINK_SUFFIX } from '../suffix';

export class VideoHelper extends ModelHelper {
    
    static getLink(category: string): string {
        let link = category;
        if (category.indexOf(HOT_VIDEO_LINK_SUFFIX) != -1) {
            link = category.substring(0, category.indexOf(HOT_VIDEO_LINK_SUFFIX));
        }
        return link;
    }

    static getSuffix(category: string): string {
        if (category.indexOf(HOT_VIDEO_LINK_SUFFIX) == -1) {
            return 'new';
        }
        return 'hot';
    }

    static transformCategory(category) {
        return {
            name: category.name,
            newlink: category.link,
            hotlink: category.link + HOT_VIDEO_LINK_SUFFIX
        };
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
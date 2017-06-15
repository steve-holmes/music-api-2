import { Component } from '@nestjs/common';

import { VideoLoader } from './video.loader';
import { VideoRepository } from './video.repository';
import { VideoHelper} from './video.helper';

@Component()
export class VideoService {

    constructor(
        private videoLoader: VideoLoader,
        private videoRepository: VideoRepository
    ) {}

    async getVideo(id: string) {
        let video = await this.videoRepository.findVideo(id);
        video = await this.videoLoader.response(video.url);

        this.videoRepository.saveVideos(video.videos.map(({title, info}) => ({ name: title, url: info })));
        this.videoRepository.saveVideos(video.singers);

        return {
            track: video.track,
            videos: video.videos.map(video => ({
                id:     video.key,
                name:   video.title,
                singer: video.singer,
                avatar: video.image,
                time:   video.time
            })),
            singers: VideoHelper.videos(video.singers)
        };
    }

}
import { Component } from '@nestjs/common';

import { VideoLoader } from './video.loader';

@Component()
export class VideoService {

    constructor(private videoLoader: VideoLoader) {}

    async search(query: string) {
        const videos = await this.videoLoader.response(query);
        return videos;
    }

}
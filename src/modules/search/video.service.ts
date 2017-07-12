import { Component } from '@nestjs/common';

import { VideoLoader } from './video.loader';
import { VideoRepository } from '../video/video.repository';

@Component()
export class VideoService {

    constructor(
        private videoLoader: VideoLoader,
        private videoRepository: VideoRepository
    ) {}

    async search(query: string) {
        const videos = await this.videoLoader.response(query);

        this.videoRepository.saveVideos(<any[]>videos);

        return { videos };
    }

}
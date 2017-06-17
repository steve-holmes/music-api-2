import { Component } from '@nestjs/common';

import { VideoRepository } from '../../video/video.repository';
import { VideoAPI } from './video.api';
import { VideoLoader } from './video.loader';
import { VideoHelper } from '../../video/video.helper';

@Component()
export class VideoService {

    constructor(
        private videoRepository: VideoRepository,
        private videoAPI: VideoAPI,
        private videoLoader: VideoLoader
    ) {}

    async getVideos(category: string = 'am-nhac-viet-nam-nhac-tre', page: number = 1) {
        let categoryInfo = await this.videoRepository.getCategory(VideoHelper.getLink(category));
        categoryInfo = VideoHelper.transformCategory(categoryInfo);
        categoryInfo.suffix = VideoHelper.getSuffix(category);
        
        const url = this.videoAPI.getURL(category, page);
        const videos = <any[]>(await this.videoLoader.response(url));

        this.videoRepository.saveVideos(videos);

        return {
            category: categoryInfo,
            videos: VideoHelper.videos(videos)
        };
    }

}
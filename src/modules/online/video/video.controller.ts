import { Controller, Get, Param, HttpStatus, Response } from '@nestjs/common';

import { VideoService } from './video.service';

@Controller('online/videos')
export class VideoController {

    constructor(private videoService: VideoService) {}

    @Get('/:category')
    async getVideos(@Response() response, @Param('category') category) {
        const { category: name, videos } = await this.videoService.getVideos(category);
        return response.status(HttpStatus.OK).json(this.getJsonData(name, videos));
    }

    @Get(':category/:page')
    async getVideosAtPage(@Response() response, @Param('category') category, @Param('page') page) {
        const { category: name, videos } = await this.videoService.getVideos(category, +page);
        return response.status(HttpStatus.OK).json(this.getJsonData(name, videos));
    }

    private getJsonData(category, videos) {
        return { data: { category, videos } };
    }

}
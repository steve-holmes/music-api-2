import { Controller, HttpStatus, Get, Response, Param } from '@nestjs/common';

import { VideoService } from './video.service';

@Controller('videos')
export class VideoController {

    constructor(private videoService: VideoService) {}

    @Get('/:id')
    async getVideo(@Response() response, @Param('id') id) {
        const video = await this.videoService.getVideo(id);
        return response.status(HttpStatus.OK).json({ data: video });
    }

}
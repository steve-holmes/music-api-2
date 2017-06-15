import { Controller, Get, Response, HttpStatus } from '@nestjs/common';

import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {

    constructor(private categoryService: CategoryService) {}

    @Get('/playlists')
    async getPlaylist(@Response() response) {
        const playlist = await this.categoryService.getPlaylist();
        response.status(HttpStatus.OK).json(this.getJsonData(playlist));
    }

    @Get('/songs')
    async getSong(@Response() response) {
        const song = await this.categoryService.getSong();
        response.status(HttpStatus.OK).json(this.getJsonData(song));
    }

    @Get('/videos')
    async getVideo(@Response() response) {
        const video = await this.categoryService.getVideo();
        response.status(HttpStatus.OK).json(this.getJsonData(video));
    }

    private getJsonData(responseData) {
        return { data: { topics: responseData } };
    }

}
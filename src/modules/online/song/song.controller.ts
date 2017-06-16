import { Controller, Get, Param, HttpStatus, Response } from '@nestjs/common';

import { SongService } from './song.service';

@Controller('online/songs')
export class SongController {

    constructor(private songService: SongService) {}

    @Get('/')
    async getDefaultSongs(@Response() response) {
        const { category: info, songs } = await this.songService.getSongs();
        return response.status(HttpStatus.OK).json(this.getJsonData(info, songs));
    }

    @Get('/:category')
    async getSongs(@Response() response, @Param('category') category) {
        const { category: info, songs } = await this.songService.getSongs(category);
        return response.status(HttpStatus.OK).json(this.getJsonData(info, songs));
    }

    @Get(':category/:page')
    async getSongsAtPage(@Response() response, @Param('category') category, @Param('page') page) {
        const { category: info, songs } = await this.songService.getSongs(category, +page);
        return response.status(HttpStatus.OK).json(this.getJsonData(info, songs));
    }

    private getJsonData(category, songs) {
        return { data: { category, songs } };
    }

}
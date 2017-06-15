import { Controller, Get, Param, HttpStatus, Response } from '@nestjs/common';

import { SongService } from './song.service';

@Controller('online/songs')
export class SongController {

    constructor(private songService: SongService) {}

    @Get('/:category')
    async getSongs(@Response() response, @Param('category') category) {
        const { category: name, songs } = await this.songService.getSongs(category);
        return response.status(HttpStatus.OK).json(this.getJsonData(name, songs));
    }

    @Get(':category/:page')
    async getSongsAtPage(@Response() response, @Param('category') category, @Param('page') page) {
        const { category: name, songs } = await this.songService.getSongs(category, +page);
        return response.status(HttpStatus.OK).json(this.getJsonData(name, songs));
    }

    private getJsonData(category, songs) {
        return { data: { category, songs } };
    }

}
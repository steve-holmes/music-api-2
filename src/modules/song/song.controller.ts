import { Controller, Get, Response, HttpStatus, Param } from '@nestjs/common';

import { SongService } from './song.service';

@Controller('songs')
export class SongController {

    constructor(private songService: SongService) {}

    @Get('/:id')
    async getSong(@Response() response, @Param('id') id) {
        const song = await this.songService.getSong(id);
        return response.status(HttpStatus.OK).json({ data: song });
    }

}
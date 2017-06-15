import { Controller, Get, Response, HttpStatus, Param } from '@nestjs/common';

import { PlaylistService } from './playlist.service';

@Controller('playlists')
export class PlaylistController {

    constructor(private playlistService: PlaylistService) {}

    @Get('/:id')
    async getPlaylist(@Response() response, @Param('id') id) {
        const playlist = await this.playlistService.getPlaylist(id);
        return response.status(HttpStatus.OK).json({ data: playlist });
    }

}
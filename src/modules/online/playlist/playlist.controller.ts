import { Controller, Get, Param, HttpStatus, Response } from '@nestjs/common';

import { PlaylistService } from './playlist.service';

@Controller('online/playlists')
export class PlaylistController {

    constructor(private playlistService: PlaylistService) {}

    @Get('/:category')
    async getPlaylists(@Response() response, @Param('category') category) {
        const { category: name, playlists } = await this.playlistService.getPlaylists(category);
        return response.status(HttpStatus.OK).json(this.getJsonData(name, playlists));
    }

    @Get(':category/:page')
    async getPlaylistsAtPage(@Response() response, @Param('category') category, @Param('page') page) {
        const { category: name, playlists } = await this.playlistService.getPlaylists(category, +page);
        return response.status(HttpStatus.OK).json(this.getJsonData(name, playlists));
    }

    private getJsonData(category, playlists) {
        return { data: { category, playlists } };
    }

}
import { Controller, Get, Param, HttpStatus, Response } from '@nestjs/common';

import { PlaylistService } from './playlist.service';

@Controller('online/playlists')
export class PlaylistController {

    constructor(private playlistService: PlaylistService) {}

    @Get('/')
    async getDefaultPlaylists(@Response() response) {
        const { category: info, playlists } = await this.playlistService.getPlaylists();
        return response.status(HttpStatus.OK).json(this.getJsonData(info, playlists));
    }

    @Get('/:category')
    async getPlaylists(@Response() response, @Param('category') category) {
        const { category: info, playlists } = await this.playlistService.getPlaylists(category);
        return response.status(HttpStatus.OK).json(this.getJsonData(info, playlists));
    }

    @Get(':category/:page')
    async getPlaylistsAtPage(@Response() response, @Param('category') category, @Param('page') page) {
        const { category: info, playlists } = await this.playlistService.getPlaylists(category, +page);
        return response.status(HttpStatus.OK).json(this.getJsonData(info, playlists));
    }

    private getJsonData(category, playlists) {
        return { data: { category, playlists } };
    }

}
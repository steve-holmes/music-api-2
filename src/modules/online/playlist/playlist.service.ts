import { Component } from '@nestjs/common';

import { PlaylistRepository } from '../../playlist/playlist.repository';
import { PlaylistAPI } from './playlist.api';
import { PlaylistLoader } from './playlist.loader';
import { PlaylistHelper } from '../../playlist/playlist.helper';

@Component()
export class PlaylistService {

    constructor(
        private playlistRepository: PlaylistRepository,
        private playlistAPI: PlaylistAPI,
        private playlistLoader: PlaylistLoader
    ) {}

    async getPlaylists(category: string, page: number = 1) {
        const { name } = await this.playlistRepository.getCategory(PlaylistHelper.getLink(category));
        
        const url = this.playlistAPI.getURL(category, page);
        const playlists = <any[]>(await this.playlistLoader.response(url));

        this.playlistRepository.savePlaylists(playlists);

        return {
            category: name,
            playlists: PlaylistHelper.playlists(playlists)
        };
    }

   }
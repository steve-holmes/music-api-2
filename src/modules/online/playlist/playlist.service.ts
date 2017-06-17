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

    async getPlaylists(category: string = 'nhac-tre-moi', page: number = 1) {
        let categoryInfo = await this.playlistRepository.getCategory(PlaylistHelper.getLink(category));
        categoryInfo = PlaylistHelper.transformCategory(categoryInfo);
        categoryInfo.suffix = PlaylistHelper.getSuffix(category);
        
        const url = this.playlistAPI.getURL(category, page);
        const playlists = <any[]>(await this.playlistLoader.response(url));

        this.playlistRepository.savePlaylists(playlists);

        return {
            category: categoryInfo,
            playlists: PlaylistHelper.playlists(playlists)
        };
    }

   }
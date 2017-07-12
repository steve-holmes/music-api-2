import { Component } from '@nestjs/common';

import { PlaylistLoader } from './playlist.loader';
import { PlaylistRepository } from '../playlist/playlist.repository';

@Component()
export class PlaylistService {
    
    constructor(
        private playlistLoader: PlaylistLoader,
        private playlistRepository: PlaylistRepository
    ) {}

    async search(query: string) {
        const playlists = await this.playlistLoader.response(query);

        this.playlistRepository.savePlaylists(<any[]>playlists);

        return { playlists };
    }

}
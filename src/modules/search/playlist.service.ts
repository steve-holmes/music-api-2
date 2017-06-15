import { Component } from '@nestjs/common';

import { PlaylistLoader } from './playlist.loader';

@Component()
export class PlaylistService {
    
    constructor(private playlistLoader: PlaylistLoader) {}

    async search(query: string) {
        const playlists = await this.playlistLoader.response(query);

        return playlists;
    }

}
import { Component } from '@nestjs/common';

import { PlaylistLoader } from './playlist.loader';
import { PlaylistRepository } from './playlist.repository';
import { PlaylistHelper } from './playlist.helper';

@Component()
export class PlaylistService {

    constructor(
        private playlistLoader: PlaylistLoader,
        private playlistRepository: PlaylistRepository
    ) {}

    async getPlaylist(id: string) {
        let playlist = await this.playlistRepository.findPlaylist(id);
        playlist = await this.playlistLoader.response(playlist.url);

        this.playlistRepository.savePlaylists(playlist.others);

        return {
            tracks: PlaylistHelper.tracks(playlist.tracks),
            others: PlaylistHelper.playlists(playlist.others)
        };
    }

}
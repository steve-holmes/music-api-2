import { Component } from '@nestjs/common';

import { SearchLoader } from './search.loader';

import { PlaylistRepository } from '../playlist/playlist.repository';
import { SongRepository } from '../song/song.repository';
import { VideoRepository } from '../video/video.repository';

import { PlaylistHelper } from '../playlist/playlist.helper';
import { SongHelper } from '../song/song.helper';
import { VideoHelper } from '../video/video.helper';

@Component()
export class SearchService {

    constructor(
        private searchLoader: SearchLoader,
        private playlistRepository: PlaylistRepository,
        private songRepository: SongRepository,
        private videoRepository: VideoRepository
    ) {}

    async search(query: string) {
        const { songs, playlists, videos } = <any>await this.searchLoader.response(query);

        this.songRepository.saveSongs(songs);
        this.playlistRepository.savePlaylists(playlists);
        this.videoRepository.saveVideos(videos);

        return {
            songs: SongHelper.songs(songs),
            playlists: PlaylistHelper.playlists(playlists),
            videos: VideoHelper.videos(videos)
        };
    }

}
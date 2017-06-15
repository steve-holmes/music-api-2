import { Component } from '@nestjs/common';

import { SearchLoader } from './search.loader';

import { PlaylistHelper } from '../playlist/playlist.helper';
import { SongHelper } from '../song/song.helper';
import { VideoHelper } from '../video/video.helper';

@Component()
export class SearchService {

    constructor(private searchLoader: SearchLoader) {}

    async search(query: string) {
        const { songs, playlists, videos } = <any>await this.searchLoader.response(query);

        return {
            songs: SongHelper.songs(songs),
            playlists: PlaylistHelper.playlists(playlists),
            videos: VideoHelper.videos(videos)
        };
    }

}
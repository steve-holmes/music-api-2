import { Component } from '@nestjs/common';

import { RankLoader } from './rank.loader';

import { PlaylistRepository } from '../playlist/playlist.repository';
import { SongRepository } from '../song/song.repository';
import { VideoRepository } from '../video/video.repository';

import { PlaylistLoader } from '../playlist/playlist.loader';

import { PlaylistHelper } from '../playlist/playlist.helper';
import { SongHelper } from '../song/song.helper';
import { VideoHelper } from '../video/video.helper';

@Component()
export class RankService {

    constructor(
        private rankLoader: RankLoader,
        private playlistLoader: PlaylistLoader,
        private playlistRepository: PlaylistRepository,
        private songRepository: SongRepository,
        private videoRepository: VideoRepository
    ) {}

    async getRanks(country: string) {
        const rank = await this.rankLoader.response(country);

        this.playlistRepository.savePlaylists(<any[]>rank.playlists);
        this.songRepository.saveSongs(<any[]>rank.songs);
        this.videoRepository.saveVideos(<any[]>rank.videos);

        return {
            songs: SongHelper.songs(rank.songs),
            playlists: PlaylistHelper.playlists(rank.playlists),
            videos: VideoHelper.videos(rank.videos)
        };
    }

    async getSongs(country: string) {
        const songsURL = await this.rankLoader.responseSongsURL(country);
        const tracks = await this.playlistLoader.responseTracks(songsURL);

        return PlaylistHelper.tracks(tracks);
    }

    getCountryName(country: string): string {
        let name = '';

        if (country == 'nhac-viet') {
            name = 'Việt Nam';
        } else if (country == 'au-my') {
            name = 'Âu Mỹ';
        } else if (country == 'nhac-han') {
            name = 'Hàn Quốc';
        }

        return name;
    }

}
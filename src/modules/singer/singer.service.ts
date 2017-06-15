import { Component } from '@nestjs/common';

import { SingerLoader } from './singer.loader';
import { SingerRepository } from './singer.repository';

import { PlaylistRepository } from '../playlist/playlist.repository';
import { SongRepository } from '../song/song.repository';
import { VideoRepository } from '../video/video.repository';

import { SongHelper } from '../song/song.helper';
import { PlaylistHelper } from '../playlist/playlist.helper';
import { VideoHelper } from '../video/video.helper';

@Component()
export class SingerService {

    constructor(
        private singerLoader: SingerLoader,
        private singerRepository: SingerRepository,
        private playlistRepository: PlaylistRepository,
        private songRepository: SongRepository,
        private videoRepository: VideoRepository
    ) {}

    async getSinger(id: string) {
        let singer = await this.singerRepository.findSinger(id);
        singer = await this.singerLoader.response(singer.url);

        this.playlistRepository.savePlaylists(singer.playlists);
        this.songRepository.saveSongs(singer.songs);
        this.videoRepository.saveVideos(singer.videos);

        return {
            name: singer.info.name,
            avatar: singer.info.avatar,
            songs: SongHelper.songs(singer.songs),
            playlists: PlaylistHelper.playlists(singer.playlists),
            videos: VideoHelper.videos(singer.videos)
        };
    }

}
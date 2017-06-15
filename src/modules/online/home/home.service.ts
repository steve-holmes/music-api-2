import { Component } from '@nestjs/common';

import { HomeLoader } from './home..loader';

import { PageParser } from './page.parser';
import { PlaylistParser } from './playlist.parser';
import { SongParser } from './song.parser';
import { VideoParser } from './video.parser';
import { TopicParser } from './topic.parser';
import { FilmParser } from './film.parser';

import { PlaylistRepository } from '../../playlist/playlist.repository';
import { SongRepository } from '../../song/song.repository';
import { VideoRepository } from '../../video/video.repository';
import { TopicRepository } from '../../topic/topic.repository';

import { PlaylistHelper } from '../../playlist/playlist.helper';
import { VideoHelper } from '../../video/video.helper';
import { TopicHelper } from '../../topic/topic.helper';
import { SongHelper } from '../../song/song.helper';

@Component()
export class HomeService {

    constructor(
        private homeLoader: HomeLoader,

        private pageParser: PageParser,
        private playlistParser: PlaylistParser,
        private songParser: SongParser,
        private videoParser: VideoParser,
        private topicParser: TopicParser,
        private filmParser: FilmParser,

        private playlistRepository: PlaylistRepository,
        private songRepository: SongRepository,
        private videoRepository: VideoRepository,
        private topicRepository: TopicRepository
    ) {}

    async get() {
        const $body     = await this.homeLoader.response();

        const pages     = this.pageParser.parse($body);
        const playlists = this.playlistParser.parse($body);
        const videos    = this.videoParser.parse($body);
        const films     = this.filmParser.parse($body);
        const topics    = this.topicParser.parse($body);
        const songs     = this.songParser.parse($body);

        this.playlistRepository.savePlaylists(pages);
        this.playlistRepository.savePlaylists(playlists);
        this.videoRepository.saveVideos(videos);
        this.videoRepository.saveVideos(films);
        this.topicRepository.saveTopics(topics);
        this.songRepository.saveSongs(songs);

        return {
            pages:      PlaylistHelper.playlists(pages),
            playlists:  PlaylistHelper.playlists(playlists),
            videos:     VideoHelper.videos(videos),
            films:      VideoHelper.videos(films),
            topics:     TopicHelper.topics(topics),
            songs:      SongHelper.songs(songs)
        };
    }

}
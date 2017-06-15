import * as request from 'request';
import * as $ from 'cheerio';
import { Component } from '@nestjs/common';

import { PlaylistParser } from './playlist.parser';
import { SongParser } from './song.parser';
import { VideoParser } from './video.parser';

@Component()
export class SearchLoader {

    private baseURL: string = 'http://www.nhaccuatui.com/tim-kiem?q=';

    constructor(
        private playlistParser: PlaylistParser,
        private songParser: SongParser,
        private videoParser: VideoParser
    ) {}

    response(query) {
        return new Promise((resolve, reject) => {
            request.get(this.baseURL + query, (error, response, body) => {
                if (error) { return reject(error); }

                const $list = $(body).find('ul.search_returns_list');
                const self = this;

                const $songs = $list.find('li.list_song.search');
                const songs = $songs.map(function (i, elem) {
                    return self.songParser.parse($(this));
                }).get();

                const $playlists = $list.find('li.list_album');
                const playlists = $playlists.map(function (i, elem) {
                    return self.playlistParser.parse($(this));
                }).get();

                const $videos = $list.find('li.list_video');
                const videos = $videos.map(function (i, elem) {
                    return self.videoParser.parse($(this));
                }).get();

                resolve({ songs, playlists, videos });
            });
        });
    }

}
import * as request from 'request';
import * as $ from 'cheerio';
import { Component } from '@nestjs/common';

import { PlaylistParser } from './playlist.parser';

@Component()
export class PlaylistLoader {

    private baseURL: string = 'http://www.nhaccuatui.com/tim-kiem/playlist?q=';

    constructor(private playlistParser: PlaylistParser) {}

    response(query) {
        return new Promise((resolve, reject) => {
            request.get(this.baseURL + query, (error, response, body) => {
                if (error) { return reject(error); }

                const $playlists = $(body).find('ul.search_returns_list li.list_album');
                const self = this;

                const playlists = $playlists.map(function (i, elem) {
                    return self.playlistParser.parse($(this));
                }).get();

                resolve(playlists);
            });
        });
    }

}
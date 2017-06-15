import * as request from 'request';
import * as $ from 'cheerio';
import { Component } from '@nestjs/common';

@Component()
export class PlaylistLoader {

    response(url: string) {
        return new Promise((resolve, reject) => {
            request.get(url, (error, response, body) => {
                if (error) { return reject(error); }

                const $playlists = $(body).find('div.list_album ul li');

                const self = this;
                const playlists = $playlists.map(function (i, elem) {
                    return self.parsePlaylist($(this));
                }).get();

                resolve(playlists);
            });
        });
    }

    private parsePlaylist($playlist) {
        const $name = $playlist.find('div.info_album a.name_song');
        const name = $name.text();

        const $singer = $playlist.find('div.info_album a.name_singer');
        const singer = $singer.map(function (i, elem) {
            return $(this).text();
        }).get().join(', ');

        const $url = $playlist.find('div.box-left-album a');
        const url = $url.attr('href');

        const $avatar = $playlist.find('div.box-left-album span.avatar img');
        const avatar = $avatar.data('src');

        return { name, singer, avatar, url };
    }

}
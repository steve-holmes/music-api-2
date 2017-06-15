import * as request from 'request';
import * as $ from 'cheerio';
import { Component } from '@nestjs/common';

@Component()
export class TopicLoader {

    response(url: string) {
        return new Promise((resolve, reject) => {
            request.get(url, (error, response, body) => {
                if (error) { return reject(error); }

                const $body = $(body);

                const $name = $body.find('div.content_topic_detail div.wpage h1');
                const name = $name.text();

                const $playlists = $body.find('ul#divVideoHtml li');
                const self = this;
                const playlists = $playlists.map(function (i, elem) {
                    return self.parsePlaylist($(this));
                }).get();

                const topic = { name, playlists };
                resolve(topic);
            });
        });
    }

    private parsePlaylist($playlist) {
        const $name = $playlist.find('a.name_song');
        const name = $name.text();
        const url = $name.attr('href');

        const $image = $playlist.find('span.avatar img');
        const avatar = $image.data('src');

        const $singers = $playlist.find('a.name_singer');
        const singer = $singers.map(function (i, elem) {
            return $(this).text();
        }).get().join(', ');

        return { name, singer, avatar, url };
    }

}
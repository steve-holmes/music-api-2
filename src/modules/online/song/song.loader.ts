import * as request from 'request';
import * as $ from 'cheerio';
import { Component } from '@nestjs/common';

@Component()
export class SongLoader {

    response(url: string) {
        return new Promise((resolve, reject) => {
            request.get(url, (error, response, body) => {
                if (error) { return reject(error); }

                const $songs = $(body).find('ul.list_item_music li');
            
                const self = this;
                const songs = $songs.map(function (i, elem) {
                    return self.parseSong($(this));
                }).get();

                resolve(songs);
            });
        });
    }

    private parseSong($song) {
        const $name = $song.find('a.name_song');
        const name = $name.text();

        const $singers = $song.find('a.name_singer');
        const singer = $singers.map(function (i, elem) {
            return $(this).text();
        }).get().join(', ');

        const $url = $song.find('a.button_playing');
        const url = $url.attr('href');

        return { name, singer, url };
    }

}
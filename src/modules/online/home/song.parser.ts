import * as $ from 'cheerio';
import { Component } from '@nestjs/common';

@Component()
export class SongParser {

    parse($body) {
        const $songs = $body.find('div.list_music li');
        
        const self = this;
        const songs = $songs.map(function (i, elem) {
            return self.getSong($(this));
        }).get();

        return songs;
    }

    private getSong($song) {
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
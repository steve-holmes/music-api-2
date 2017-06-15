import * as $ from 'cheerio';
import { Component } from '@nestjs/common';

@Component()
export class FilmParser {

    parse($body) {
        const $films = $body.find('div.list_video').eq(2).find('li.videosmall');

        const self = this;
        const films = $films.map(function (i, elem) {
            return self.getFilm($(this));
        }).get();

        return films;
    }

    private getFilm($film) {
        const $name = $film.find('a.name_song_index');
        const name = $name.text();
        const url = $name.attr('href');
        
        const $singer = $film.find('a.name_singer');
        const singer = $singer.map(function (i, elem) {
            return $(this).text();
        }).get().join(', ');
        
        const $time = $film.find('span.icon_time_video');
        const time = $time.text();
        
        const $image = $film.find('div.box_absolute img');
        const avatar = $image.attr('src');
        
        return { name, singer, avatar, url, time };
    }

}
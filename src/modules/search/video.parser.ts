import * as $ from 'cheerio';
import { Component } from '@nestjs/common';

@Component()
export class VideoParser {

    parse($video) {
        const $name = $video.find('a.name_song');
        const name = $name.text();
        const url = $name.attr('href');

        const $singers = $video.find('a.name_singer');
        const singer = $singers.map(function (i, elem) {
            return $(this).text();
        }).get().join(', ');

        const $time = $video.find('span.icon_time_video');
        const time = $time.text();

        const $key = $video.find('a.img');
        const key = $key.attr('key');

        const $avatar = $video.find('a.img img');
        const avatar = $avatar.data('src');

        return { name, singer, avatar, time, url, key };
    }

}
import * as request from 'request';
import * as $ from 'cheerio';
import { Component } from '@nestjs/common';

@Component()
export class SingerLoader {

    response(url) {
        return new Promise((resolve, reject) => {
            request(url, (error, response, body) => {
                if (error) { return reject(error); }

                const $singers = $(body).find('ul.list-singer-item li');

                const self = this;
                const singers = $singers.map(function (i, elem) {
                    return self.parseSinger($(this));
                }).get();

                resolve(singers);
            });
        });
    }

    private parseSinger($singer) {
        const $name = $singer.find('h3 a');
        const name = $name.text();
        const url = $name.attr('href');

        const $image = $singer.find('a img');
        const avatar = $image.data('src');

        return { name, avatar, url };
    }

}
import * as request from 'request';
import * as $ from 'cheerio';
import { Component } from '@nestjs/common';

@Component()
export class TopicsLoader {

    response() {
        const url = 'http://www.nhaccuatui.com/chu-de.html';

        return new Promise((resolve, reject) => {
            request.get(url, (error, response, body) => {
                if (error) { return reject(error); }
                
                const $topics = $(body).find('div.list_topic_full div.topic_more div.fram_select>ul>li');

                const self = this;
                const topics = $topics.map(function (i, elem) {
                    return self.parseTopic($(this));
                }).get();

                resolve(topics);
            });
        });
    }

    private parseTopic($topic) {
        const $name = $topic.find('h2 a.name_topic');
        const name = $name.text();
        const url = $name.attr('href');

        const $image = $topic.find('a.box_absolute img');
        const avatar = $image.attr('src');

        return { name, avatar, url };
    }

}
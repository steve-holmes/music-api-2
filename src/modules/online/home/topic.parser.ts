import * as $ from 'cheerio';
import { Component } from '@nestjs/common';

@Component()
export class TopicParser {

    parse($body) {
        const $topics = $body.find('div.box_topic_music li');
        
        const self = this;
        const topics = $topics.map(function (i, elem) {
            return self.getTopic($(this));
        }).get();

        return topics;
    }

    private getTopic($topic) {
        const $url = $topic.find('a');
        const name = $url.attr('title');
        const url = $url.attr('href');

        const $image = $topic.find('a img');
        const avatar = $image.attr('src');

        return { name, avatar, url };
    }

}
import * as request from 'request';
import * as $ from 'cheerio';
import { Component } from '@nestjs/common';

import { VideoParser } from './video.parser';

@Component()
export class VideoLoader {
    
    private baseURL: string = 'http://www.nhaccuatui.com/tim-kiem/mv?q=';

    constructor(private videoParser: VideoParser) {}

    response(query) {
        return new Promise((resolve, reject) => {
            request.get(this.baseURL + query, (error, response, body) => {
                if (error) { reject(error); }

                const $videos = $(body).find('ul.search_returns_list li.list_video');
                const self = this;

                const videos = $videos.map(function (i, elem) {
                    return self.videoParser.parse($(this));
                }).get();

                resolve(videos);
            });
        });
    }

}
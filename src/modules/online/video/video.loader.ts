import * as request from 'request';
import * as $ from 'cheerio';
import { Component } from '@nestjs/common';

@Component()
export class VideoLoader {

    response(url: string) {
        return new Promise((resolve, reject) => {
            request.get(url, (error, response, body) => {
                if (error) { return reject(error); }

                const $videos = $(body).find('div.list_video li');
    
                const self = this;
                const videos = $videos.map(function (i, elem) {
                    return self.parseVideo($(this));
                }).get();

                resolve(videos);
            });
        });
    }

    private parseVideo($video) {
        const $name = $video.find('a.name_song');
        const name = $name.text();
        const url = $name.attr('href');
        const key = $name.attr('key');
        
        const $singer = $video.find('a.name_singer');
        const singer = $singer.map(function (i, elem) {
            return $(this).text();
        }).get().join(', ');
        
        const $time = $video.find('span.icon_time_video');
        const time = $time.text();
        
        const $image = $video.find('div.box_absolute img');
        const avatar = $image.data('src');
        
        return { name, singer, avatar, url, time, key };
    }

}
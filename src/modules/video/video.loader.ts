import * as request from 'request';
import * as $ from 'cheerio';
import { parseString } from 'xml2js';
import { Component } from '@nestjs/common';

@Component()
export class VideoLoader {

    response(url: string) {
        return this.request(url).then(body => $(body))
            .then($body => {
                const $videoPlayer = $body.find('div.box-view-player');
                const $script = $videoPlayer.find('script').eq(1);
                const itemsPromise = this.itemsPromiseFromScript($script.html());

                const $videoURL = $body.find('h3.title_of_box_video a');
                const videoURL = $videoURL.attr('href');
                const sameSingerVideosPromise = this.videosPromiseFromURL(videoURL);

                return Promise.all([itemsPromise, sameSingerVideosPromise]);
            })
            .then(([track, singers]) => ({
                track: track.video,
                videos: track.items,
                singers
            }));
    }

    private itemsPromiseFromScript($scriptHtml) {
        const self = this;

        const scriptPromise = ($scriptHtml) => {
            const playerRegex = /^(\s*)player\.peConfig\.xmlURL = "(.*)";$/igm;
            const playerStatements = $scriptHtml.match(playerRegex);

            const requestRegex = /"(.*)"/i
            const requestURLs = playerStatements[0].match(requestRegex);
            const requestURL = requestURLs[1];
            return Promise.resolve(requestURL);
        };

        return scriptPromise($scriptHtml)
            .then(requestURL => this.request(requestURL))
            .then(requestBody => this.parsingPromise(requestBody))
            .then(jsonTracks => {
                const items = jsonTracks.tracklist.track[0].item;

                const videoItem = items[0];
                const video = self.parseVideoItem(videoItem);

                const otherItems = items
                    .filter((item, index) => index > 0)
                    .map(this.parseItem);
                
                return { video, items: otherItems };
            });   
    }

    private parseVideoItem(videoItem) {
        return {
            image: videoItem.image[0],
            title: videoItem.title[0],
            singer: videoItem.singer[0],
            info: videoItem.info[0],
            key: videoItem.key[0],
            location: videoItem.location[0],
            lowquality: videoItem.lowquality[0],
            thumb: videoItem.thumb[0],
            preview: videoItem.preview[0]
        };
    }

    private parseItem(item) {
        return {
            image: item.image[0],
            title: item.title[0],
            singer: item.singer[0],
            info: item.info[0],
            key: item.key[0],
            preview: item.preview[0],
            time: item.time[0],
            view: item.view[0]
        };
    }

    private videosPromiseFromURL(videoURL) {
        const self = this;
        return this.request(this.encodeQueryURL(videoURL))
            .then(videoQueryBody => {
                const $videos = $(videoQueryBody).find('ul.search_returns_list li.list_video');
                const videos = $videos.map(function (i, elem) {
                    return self.parseVideo($(this));
                }).get();
                return videos;
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

    private encodeQueryURL(url) {
        const beginIndex = url.indexOf('q=') + 2;
        const endIndex = url.indexOf('&b');
        const queryParam = url.substring(beginIndex, endIndex);
        
        const encodedParam = encodeURI(queryParam);
        const encodedURL = url.substring(0, beginIndex) + encodedParam + url.substring(endIndex);
        
        return encodedURL;
    }

    private request(url): Promise<any> {
        return new Promise((resolve, reject) => {
            request.get(url, (error, response, body) => {
                if (error) { return reject(error); }
                resolve(body);
            });
        });
    }

    private parsingPromise(xml): Promise<any> {
        return new Promise((resolve, reject) => {
            parseString(xml, { trim: true, normalize: true }, (error, result) => {
                if (error) { reject(error); }
                resolve(result); 
            });
        });
    }

}
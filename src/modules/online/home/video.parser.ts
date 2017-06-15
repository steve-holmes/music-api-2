import * as $ from 'cheerio';
import { Component } from '@nestjs/common';

@Component()
export class VideoParser {

    parse($body) {
        const self = this;

        const $largeVideos = $body.find('div.list_video').eq(0).find('div.fram_select>ul>li.videolarge li.videosmall');
        const largeVideos = $largeVideos.map(function (i, elem) {
            return self.getLargeVideo($(this));
        }).get();

        const $smallVideos = $body.find('div.list_video').eq(0).find('div.fram_select>ul>li.videosmall');

        const smallVideos = $smallVideos.map(function (i, elem) {
            return self.getSmallVideo($(this));
        }).get();

        const videos = [...largeVideos, ...smallVideos];
        return videos;
    }

    private getLargeVideo($video) {
        const $name = $video.find('a.name_song');
        const name = $name.text();
        const url = $name.attr('href');
        
        const $singer = $video.find('a.name_singer');
        const singer = $singer.map(function (i, elem) {
            return $(this).text();
        }).get().join(', ');
        
        const $time = $video.find('span.icon_time_video');
        const time = $time.text();
        
        const $image = $video.find('div.box_absolute img');
        const avatar = $image.attr('src');
        
        return { name, singer, avatar, url, time };
    }

    private getSmallVideo($video) {
        const $name = $video.find('a.name_song_index');
        const name = $name.text();
        const url = $name.attr('href');
        
        const $singer = $video.find('a.name_singer');
        const singer = $singer.map(function (i, elem) {
            return $(this).text();
        }).get().join(', ');
        
        const $time = $video.find('span.icon_time_video');
        const time = $time.text();
        
        const $image = $video.find('div.box_absolute img');
        const avatar = $image.attr('src');
        
        return { name, singer, avatar, url, time };
    }

}
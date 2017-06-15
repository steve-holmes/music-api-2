import * as request from 'request';
import * as $ from 'cheerio';
import { Component } from '@nestjs/common';

@Component()
export class SingerLoader {

    response(url: string) {
        return new Promise((resolve, reject) => {
            request.get(url, (error, response, body) => {
                if (error) { return reject(error); }

                const $body = $(body);
        
                const $info = $body.find('div.singer-left-avatar');
                const info = this.parseInfo($info);

                const self = this;

                const $songs = $body.find('div.list_music_full ul.list_item_music li');
                const songs = $songs.map(function (i, elem) {
                    return self.parseSong($(this));
                }).get();

                const $playlists = $body.find('div.list_album li');
                const playlists = $playlists.map(function (i, elem) {
                    return self.parsePlaylist($(this));
                }).get();

                const $videos = $body.find('div.list_video li');
                const videos = $videos.map(function (i, elem) {
                    return self.parseVideo($(this));
                }).get();

                const singer = { info, songs, playlists, videos };
                resolve(singer);
            });
        });
    }

    private parseInfo($info) {
        const $avatar = $info.find('div.singer-avatar img');
        const avatar = $avatar.attr('src');

        const $name = $info.find('h1.singer-name');
        const name = $name.text();

        return { name, avatar };
    }

    private parseSong($song) {
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

    private parsePlaylist($playlist) {
        const $name = $playlist.find('div.info_album a.name_song');
        const name = $name.text();

        const $singer = $playlist.find('div.info_album a.name_singer');
        const singer = $singer.map(function (i, elem) {
            return $(this).text();
        }).get().join(', ');

        const $url = $playlist.find('div.box-left-album a');
        const url = $url.attr('href');

        const $avatar = $playlist.find('div.box-left-album span.avatar img');
        const avatar = $avatar.data('src');

        return { name, singer, avatar, url };
    }

    private parseVideo($video) {
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
        const avatar = $image.data('src');
        
        return { name, singer, avatar, url, time };
    }

}
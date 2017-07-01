import * as request from 'request';
import * as $ from 'cheerio';
import { Component } from '@nestjs/common';

const baseURL = 'http://www.nhaccuatui.com';
const suffixURL = '.html';

const songPath = '/bai-hat';
const playlistPath = '/playlist';
const videoPath = '/video';

@Component()
export class RankLoader {

    response(country: string) {
        const songPromise = this.getSongPromise(country);
        const playlistPromise = this.getPlaylistPromise(country);
        const videoPromise = this.getVideoPromise(country);

        const rankPromise = Promise.all([songPromise, playlistPromise, videoPromise]);
        return rankPromise.then(([songs, playlists, videos]) => ({ songs, playlists, videos }))
    }

    responseSongsURL(country: string) {
        return new Promise((resolve, reject) => {
            request(`${baseURL}${songPath}/top-20.${country}${suffixURL}`, (error, response, body) => {
                if (error) { return reject(error); }
                
                const $songsURL = $(body).find('div.box_view_week a.active_play');
                const songsURL = $songsURL.attr('href');

                resolve(songsURL);
            });
        });
    }

    private getSongPromise(country: string) {
        return new Promise((resolve, reject) => {
            request(`${baseURL}${songPath}/top-20.${country}${suffixURL}`, (error, response, body) => {
                if (error) { return reject(error); }

                const $songs = $(body).find('ul.list_show_chart li');
                
                const self = this;
                const songs = $songs.map(function (i, elem) {
                    return self.parseSong($(this));
                }).get();

                resolve(songs);
            });
        });
    }

    private parseSong($song) {
        const $name = $song.find('h3 a.name_song');
        const name = $name.text();

        const $singers = $song.find('h4 a.name_singer');
        const singer = $singers.map(function (i, elem) {
            return $(this).text();
        }).get().join(', ');

        const $image = $song.find('div.box_info_field a img');
        const avatar = $image.attr('src');

        const $url = $song.find('div.box_song_action a.button_playing');
        const url = $url.attr('href');

        return { name, singer, avatar, url };
    }

    private getPlaylistPromise(country: string) {
        return new Promise((resolve, reject) => {
            request(`${baseURL}${playlistPath}/top-20.${country}${suffixURL}`, (error, response, body) => {
                if (error) { return reject(error); }

                const $playlists = $(body).find('ul.list_show_chart li');

                const self = this;
                const playlists = $playlists.map(function (i, elem) {
                    return self.parsePlaylist($(this));
                }).get();

                resolve(playlists);
            });
        });
    }

    private parsePlaylist($playlist) {
        const $name = $playlist.find('h3 a.name_song');
        const name = $name.text();

        const $singers = $playlist.find('span.list_name_singer a.name_singer');
        const singer = $singers.map(function (i, elem) {
            return $(this).text();
        }).get().join(', ');

        const $image = $playlist.find('div.box_info_field a img');
        const avatar = $image.attr('src');

        const $url = $playlist.find('div.box_song_action a.button_playing');
        const url = $url.attr('href');

        return { name, singer, avatar, url };
    }

    private getVideoPromise(country: string) {
        return new Promise((resolve, reject) => {
            request(`${baseURL}${videoPath}/top-20.${country}${suffixURL}`, (error, response, body) => {
                if (error) { return reject(error); }

                const $videos = $(body).find('ul.list_show_chart li');

                const self = this;
                const videos = $videos.map(function (i, elem) {
                    return self.parseVideo($(this));
                }).get();

                resolve(videos);
            });
        });
    }

    private parseVideo($video) {
        const $name = $video.find('h3 a.name_song');
        const name = $name.text();

        const $singers = $video.find('h4 a.name_singer');
        const singer = $singers.map(function (i, elem) {
            return $(this).text();
        }).get().join(', ');

        const $image = $video.find('div.box_info_field a img');
        const avatar = $image.attr('src');

        const $url = $video.find('div.box_song_action a.button_playing');
        const url = $url.attr('href');

        return { name, singer, avatar, url };
    }

}
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const $ = require("cheerio");
const common_1 = require("@nestjs/common");
const baseURL = 'http://www.nhaccuatui.com';
const suffixURL = '.html';
const songPath = '/bai-hat';
const playlistPath = '/playlist';
const videoPath = '/video';
let RankLoader = class RankLoader {
    response(country) {
        const songPromise = this.getSongPromise(country);
        const playlistPromise = this.getPlaylistPromise(country);
        const videoPromise = this.getVideoPromise(country);
        const rankPromise = Promise.all([songPromise, playlistPromise, videoPromise]);
        return rankPromise.then(([songs, playlists, videos]) => ({ songs, playlists, videos }));
    }
    getSongPromise(country) {
        return new Promise((resolve, reject) => {
            request(`${baseURL}${songPath}/top-20.${country}${suffixURL}`, (error, response, body) => {
                if (error) {
                    return reject(error);
                }
                const $songs = $(body).find('ul.list_show_chart li');
                const self = this;
                const songs = $songs.map(function (i, elem) {
                    return self.parseSong($(this));
                }).get();
                resolve(songs);
            });
        });
    }
    parseSong($song) {
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
    getPlaylistPromise(country) {
        return new Promise((resolve, reject) => {
            request(`${baseURL}${playlistPath}/top-20.${country}${suffixURL}`, (error, response, body) => {
                if (error) {
                    return reject(error);
                }
                const $playlists = $(body).find('ul.list_show_chart li');
                const self = this;
                const playlists = $playlists.map(function (i, elem) {
                    return self.parsePlaylist($(this));
                }).get();
                resolve(playlists);
            });
        });
    }
    parsePlaylist($playlist) {
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
    getVideoPromise(country) {
        return new Promise((resolve, reject) => {
            request(`${baseURL}${videoPath}/top-20.${country}${suffixURL}`, (error, response, body) => {
                if (error) {
                    return reject(error);
                }
                const $videos = $(body).find('ul.list_show_chart li');
                const self = this;
                const videos = $videos.map(function (i, elem) {
                    return self.parseVideo($(this));
                }).get();
                resolve(videos);
            });
        });
    }
    parseVideo($video) {
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
};
RankLoader = __decorate([
    common_1.Component()
], RankLoader);
exports.RankLoader = RankLoader;
//# sourceMappingURL=rank.loader.js.map
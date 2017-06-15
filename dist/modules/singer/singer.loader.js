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
let SingerLoader = class SingerLoader {
    response(url) {
        return new Promise((resolve, reject) => {
            request.get(url, (error, response, body) => {
                if (error) {
                    return reject(error);
                }
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
    parseInfo($info) {
        const $avatar = $info.find('div.singer-avatar img');
        const avatar = $avatar.attr('src');
        const $name = $info.find('h1.singer-name');
        const name = $name.text();
        return { name, avatar };
    }
    parseSong($song) {
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
    parsePlaylist($playlist) {
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
    parseVideo($video) {
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
};
SingerLoader = __decorate([
    common_1.Component()
], SingerLoader);
exports.SingerLoader = SingerLoader;
//# sourceMappingURL=singer.loader.js.map
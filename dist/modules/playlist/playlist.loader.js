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
const xml2js_1 = require("xml2js");
const common_1 = require("@nestjs/common");
let PlaylistLoader = class PlaylistLoader {
    response(url) {
        return this.request(url)
            .then(body => {
            const $body = $(body);
            const $scripts = $body.find('div.playing_absolute script');
            const $script = $scripts.eq(1);
            const tracksPromise = this.tracksPromiseFromScript($script.html());
            const $relativePlaylists = $body.find('div.box_playlist_recommended div.list_item_music li');
            const relativePlaylistPromise = this.relativePlaylistFromDOM($relativePlaylists);
            return Promise.all([tracksPromise, relativePlaylistPromise]);
        })
            .then(([tracks, others]) => ({ tracks, others }));
    }
    tracksPromiseFromScript($scriptHtml) {
        const scriptPromise = ($scriptHtml) => {
            const playerRegex = /^(\s*)player\.peConfig\.xmlURL = "(.*)";$/igm;
            const playerStatements = $scriptHtml.match(playerRegex);
            const requestRegex = /"(.*)"/i;
            const requestURLs = playerStatements[0].match(requestRegex);
            const requestURL = requestURLs[1];
            return Promise.resolve(requestURL);
        };
        return scriptPromise($scriptHtml)
            .then(requestURL => this.request(requestURL))
            .then(requestBody => this.parsingPromise(requestBody))
            .then(jsonTracks => jsonTracks.tracklist.track.map(this.getTrack));
    }
    ;
    getTrack(track) {
        return {
            title: track.title[0],
            time: track.time[0],
            singer: track.creator[0],
            location: track.location[0],
            info: track.info[0],
            lyric: track.lyric[0],
            avatar: track.avatar[0],
            newtab: track.newtab[0],
            kbit: track.kbit[0]
        };
    }
    relativePlaylistFromDOM($playlists) {
        const self = this;
        const relativePlaylists = $playlists.map(function (i, elem) {
            return self.getRelativePlaylist($(this));
        }).get();
        return Promise.resolve(relativePlaylists);
    }
    getRelativePlaylist($playlist) {
        const $name = $playlist.find('div.info_data a.name_song');
        const name = $name.text();
        const url = $name.attr('href');
        const $singer = $playlist.find('div.info_data a.name_singer');
        const singer = $singer.map(function (i, elem) {
            return $(this).text();
        }).get().join(', ');
        const $avatar = $playlist.find('a.name_song span.thum-playlist img');
        const avatar = $avatar.attr('src');
        return { name, singer, avatar, url };
    }
    request(url) {
        return new Promise((resolve, reject) => {
            request.get(url, (error, response, body) => {
                if (error) {
                    return reject(error);
                }
                resolve(body);
            });
        });
    }
    parsingPromise(xml) {
        return new Promise((resolve, reject) => {
            xml2js_1.parseString(xml, { trim: true, normalize: true }, (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            });
        });
    }
};
PlaylistLoader = __decorate([
    common_1.Component()
], PlaylistLoader);
exports.PlaylistLoader = PlaylistLoader;
//# sourceMappingURL=playlist.loader.js.map
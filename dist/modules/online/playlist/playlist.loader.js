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
let PlaylistLoader = class PlaylistLoader {
    response(url) {
        return new Promise((resolve, reject) => {
            request.get(url, (error, response, body) => {
                if (error) {
                    return reject(error);
                }
                const $playlists = $(body).find('div.list_album ul li');
                const self = this;
                const playlists = $playlists.map(function (i, elem) {
                    return self.parsePlaylist($(this));
                }).get();
                resolve(playlists);
            });
        });
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
};
PlaylistLoader = __decorate([
    common_1.Component()
], PlaylistLoader);
exports.PlaylistLoader = PlaylistLoader;
//# sourceMappingURL=playlist.loader.js.map
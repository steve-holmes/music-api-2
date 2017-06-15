"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const $ = require("cheerio");
const common_1 = require("@nestjs/common");
let PlaylistParser = class PlaylistParser {
    parse($body) {
        const $playlists = $body.find('div.list_album').eq(0).find('li');
        const self = this;
        const playlists = $playlists.map(function (i, elem) {
            return self.getPlaylist($(this));
        }).get();
        return playlists;
    }
    getPlaylist($playlist) {
        const $name = $playlist.find('div.info_album a.name_song');
        const name = $name.text();
        const $singer = $playlist.find('div.info_album a.name_singer');
        const singer = $singer.map(function (i, elem) {
            return $(this).text();
        }).get().join(', ');
        const $url = $playlist.find('div.box-left-album a');
        const url = $url.attr('href');
        const $avatar = $playlist.find('div.box-left-album span.avatar img');
        const avatar = $avatar.attr('src');
        return { name, singer, avatar, url };
    }
};
PlaylistParser = __decorate([
    common_1.Component()
], PlaylistParser);
exports.PlaylistParser = PlaylistParser;
//# sourceMappingURL=playlist.parser.js.map
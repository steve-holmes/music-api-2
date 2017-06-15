"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const $ = require("cheerio");
const common_1 = require("@nestjs/common");
const playlist_parser_1 = require("./playlist.parser");
let PlaylistLoader = class PlaylistLoader {
    constructor(playlistParser) {
        this.playlistParser = playlistParser;
        this.baseURL = 'http://www.nhaccuatui.com/tim-kiem/playlist?q=';
    }
    response(query) {
        return new Promise((resolve, reject) => {
            request.get(this.baseURL + query, (error, response, body) => {
                if (error) {
                    return reject(error);
                }
                const $playlists = $(body).find('ul.search_returns_list li.list_album');
                const self = this;
                const playlists = $playlists.map(function (i, elem) {
                    return self.playlistParser.parse($(this));
                }).get();
                resolve(playlists);
            });
        });
    }
};
PlaylistLoader = __decorate([
    common_1.Component(),
    __metadata("design:paramtypes", [playlist_parser_1.PlaylistParser])
], PlaylistLoader);
exports.PlaylistLoader = PlaylistLoader;
//# sourceMappingURL=playlist.loader.js.map
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
const song_parser_1 = require("./song.parser");
let SongLoader = class SongLoader {
    constructor(songParser) {
        this.songParser = songParser;
        this.baseURL = 'http://www.nhaccuatui.com/tim-kiem/bai-hat?q=';
    }
    reponse(query) {
        return new Promise((resolve, reject) => {
            request.get(this.baseURL + query, (error, response, body) => {
                if (error) {
                    return reject(error);
                }
                const $songs = $(body).find('ul.search_returns_list li.list_song.search');
                const self = this;
                const songs = $songs.map(function (i, elem) {
                    return self.songParser.parse($(this));
                }).get();
                resolve(songs);
            });
        });
    }
};
SongLoader = __decorate([
    common_1.Component(),
    __metadata("design:paramtypes", [song_parser_1.SongParser])
], SongLoader);
exports.SongLoader = SongLoader;
//# sourceMappingURL=song.loader.js.map
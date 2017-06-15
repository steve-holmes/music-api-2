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
let FilmParser = class FilmParser {
    parse($body) {
        const $films = $body.find('div.list_video').eq(2).find('li.videosmall');
        const self = this;
        const films = $films.map(function (i, elem) {
            return self.getFilm($(this));
        }).get();
        return films;
    }
    getFilm($film) {
        const $name = $film.find('a.name_song_index');
        const name = $name.text();
        const url = $name.attr('href');
        const $singer = $film.find('a.name_singer');
        const singer = $singer.map(function (i, elem) {
            return $(this).text();
        }).get().join(', ');
        const $time = $film.find('span.icon_time_video');
        const time = $time.text();
        const $image = $film.find('div.box_absolute img');
        const avatar = $image.attr('src');
        return { name, singer, avatar, url, time };
    }
};
FilmParser = __decorate([
    common_1.Component()
], FilmParser);
exports.FilmParser = FilmParser;
//# sourceMappingURL=film.parser.js.map
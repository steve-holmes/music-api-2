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
let VideoParser = class VideoParser {
    parse($video) {
        const $name = $video.find('a.name_song');
        const name = $name.text();
        const url = $name.attr('href');
        const $singers = $video.find('a.name_singer');
        const singer = $singers.map(function (i, elem) {
            return $(this).text();
        }).get().join(', ');
        const $time = $video.find('span.icon_time_video');
        const time = $time.text();
        const $key = $video.find('a.img');
        const key = $key.attr('key');
        const $avatar = $video.find('a.img img');
        const avatar = $avatar.data('src');
        return { name, singer, avatar, time, url, key };
    }
};
VideoParser = __decorate([
    common_1.Component()
], VideoParser);
exports.VideoParser = VideoParser;
//# sourceMappingURL=video.parser.js.map
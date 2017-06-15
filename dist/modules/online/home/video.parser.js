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
    parse($body) {
        const self = this;
        const $largeVideos = $body.find('div.list_video').eq(0).find('div.fram_select>ul>li.videolarge li.videosmall');
        const largeVideos = $largeVideos.map(function (i, elem) {
            return self.getLargeVideo($(this));
        }).get();
        const $smallVideos = $body.find('div.list_video').eq(0).find('div.fram_select>ul>li.videosmall');
        const smallVideos = $smallVideos.map(function (i, elem) {
            return self.getSmallVideo($(this));
        }).get();
        const videos = [...largeVideos, ...smallVideos];
        return videos;
    }
    getLargeVideo($video) {
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
        const avatar = $image.attr('src');
        return { name, singer, avatar, url, time };
    }
    getSmallVideo($video) {
        const $name = $video.find('a.name_song_index');
        const name = $name.text();
        const url = $name.attr('href');
        const $singer = $video.find('a.name_singer');
        const singer = $singer.map(function (i, elem) {
            return $(this).text();
        }).get().join(', ');
        const $time = $video.find('span.icon_time_video');
        const time = $time.text();
        const $image = $video.find('div.box_absolute img');
        const avatar = $image.attr('src');
        return { name, singer, avatar, url, time };
    }
};
VideoParser = __decorate([
    common_1.Component()
], VideoParser);
exports.VideoParser = VideoParser;
//# sourceMappingURL=video.parser.js.map
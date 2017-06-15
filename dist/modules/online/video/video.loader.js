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
let VideoLoader = class VideoLoader {
    response(url) {
        return new Promise((resolve, reject) => {
            request.get(url, (error, response, body) => {
                if (error) {
                    return reject(error);
                }
                const $videos = $(body).find('div.list_video li');
                const self = this;
                const videos = $videos.map(function (i, elem) {
                    return self.parseVideo($(this));
                }).get();
                resolve(videos);
            });
        });
    }
    parseVideo($video) {
        const $name = $video.find('a.name_song');
        const name = $name.text();
        const url = $name.attr('href');
        const key = $name.attr('key');
        const $singer = $video.find('a.name_singer');
        const singer = $singer.map(function (i, elem) {
            return $(this).text();
        }).get().join(', ');
        const $time = $video.find('span.icon_time_video');
        const time = $time.text();
        const $image = $video.find('div.box_absolute img');
        const avatar = $image.data('src');
        return { name, singer, avatar, url, time, key };
    }
};
VideoLoader = __decorate([
    common_1.Component()
], VideoLoader);
exports.VideoLoader = VideoLoader;
//# sourceMappingURL=video.loader.js.map
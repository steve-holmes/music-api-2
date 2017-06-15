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
let TopicLoader = class TopicLoader {
    response(url) {
        return new Promise((resolve, reject) => {
            request.get(url, (error, response, body) => {
                if (error) {
                    return reject(error);
                }
                const $body = $(body);
                const $name = $body.find('div.content_topic_detail div.wpage h1');
                const name = $name.text();
                const $playlists = $body.find('ul#divVideoHtml li');
                const self = this;
                const playlists = $playlists.map(function (i, elem) {
                    return self.parsePlaylist($(this));
                }).get();
                const topic = { name, playlists };
                resolve(topic);
            });
        });
    }
    parsePlaylist($playlist) {
        const $name = $playlist.find('a.name_song');
        const name = $name.text();
        const url = $name.attr('href');
        const $image = $playlist.find('span.avatar img');
        const avatar = $image.data('src');
        const $singers = $playlist.find('a.name_singer');
        const singer = $singers.map(function (i, elem) {
            return $(this).text();
        }).get().join(', ');
        return { name, singer, avatar, url };
    }
};
TopicLoader = __decorate([
    common_1.Component()
], TopicLoader);
exports.TopicLoader = TopicLoader;
//# sourceMappingURL=topic.loader.js.map
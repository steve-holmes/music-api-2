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
let TopicsLoader = class TopicsLoader {
    response() {
        const url = 'http://www.nhaccuatui.com/chu-de.html';
        return new Promise((resolve, reject) => {
            request.get(url, (error, response, body) => {
                if (error) {
                    return reject(error);
                }
                const $topics = $(body).find('div.list_topic_full div.topic_more div.fram_select>ul>li');
                const self = this;
                const topics = $topics.map(function (i, elem) {
                    return self.parseTopic($(this));
                }).get();
                resolve(topics);
            });
        });
    }
    parseTopic($topic) {
        const $name = $topic.find('h2 a.name_topic');
        const name = $name.text();
        const url = $name.attr('href');
        const $image = $topic.find('a.box_absolute img');
        const avatar = $image.attr('src');
        return { name, avatar, url };
    }
};
TopicsLoader = __decorate([
    common_1.Component()
], TopicsLoader);
exports.TopicsLoader = TopicsLoader;
//# sourceMappingURL=topics.loader.js.map
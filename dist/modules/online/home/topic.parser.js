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
let TopicParser = class TopicParser {
    parse($body) {
        const $topics = $body.find('div.box_topic_music li');
        const self = this;
        const topics = $topics.map(function (i, elem) {
            return self.getTopic($(this));
        }).get();
        return topics;
    }
    getTopic($topic) {
        const $url = $topic.find('a');
        const name = $url.attr('title');
        const url = $url.attr('href');
        const $image = $topic.find('a img');
        const avatar = $image.attr('src');
        return { name, avatar, url };
    }
};
TopicParser = __decorate([
    common_1.Component()
], TopicParser);
exports.TopicParser = TopicParser;
//# sourceMappingURL=topic.parser.js.map
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
let SingerLoader = class SingerLoader {
    response(url) {
        return new Promise((resolve, reject) => {
            request(url, (error, response, body) => {
                if (error) {
                    return reject(error);
                }
                const $singers = $(body).find('ul.list-singer-item li');
                const self = this;
                const singers = $singers.map(function (i, elem) {
                    return self.parseSinger($(this));
                }).get();
                resolve(singers);
            });
        });
    }
    parseSinger($singer) {
        const $name = $singer.find('h3 a');
        const name = $name.text();
        const url = $name.attr('href');
        const $image = $singer.find('a img');
        const avatar = $image.data('src');
        return { name, avatar, url };
    }
};
SingerLoader = __decorate([
    common_1.Component()
], SingerLoader);
exports.SingerLoader = SingerLoader;
//# sourceMappingURL=singer.loader.js.map
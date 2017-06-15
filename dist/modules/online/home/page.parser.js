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
let PageParser = class PageParser {
    parse($body) {
        const $pages = $body.find('div#marquee_navid_slide a');
        const self = this;
        const pages = $pages.map(function (i, elem) {
            return self.getPage($(this));
        }).get();
        return pages;
    }
    getPage($page) {
        const url = $page.attr('href');
        const $image = $page.find('img');
        const avatar = $image.attr('src');
        const name = $image.attr('title');
        return { name, avatar, url };
    }
};
PageParser = __decorate([
    common_1.Component()
], PageParser);
exports.PageParser = PageParser;
//# sourceMappingURL=page.parser.js.map
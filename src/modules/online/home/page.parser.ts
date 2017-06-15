import * as $ from 'cheerio';
import { Component } from '@nestjs/common';

@Component()
export class PageParser {

    parse($body) {
        const $pages = $body.find('div#marquee_navid_slide a');
        
        const self = this;
        const pages = $pages.map(function (i, elem) {
            return self.getPage($(this));
        }).get();

        return pages;
    }

    private getPage($page) {
        const url = $page.attr('href');

        const $image = $page.find('img');
        const avatar = $image.attr('src');
        const name = $image.attr('title');

        return { name, avatar, url };
    }

}
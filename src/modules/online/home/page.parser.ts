import * as $ from 'cheerio';
import { Component } from '@nestjs/common';

@Component()
export class PageParser {

    parse($body) {
        const $pages = $body.find('ul#marquee_imgid_musicHubMarquee a');
        
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

        const title = <string>$image.attr('title');
        const separator = title.indexOf(' - ');
        
        const name = title.substring(0, separator);
        const singer = title.substring(separator + 3);

        return { name, singer, avatar, url };
    }

}
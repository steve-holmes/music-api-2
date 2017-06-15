import { Component } from '@nestjs/common';

const baseURL = 'http://www.nhaccuatui.com/playlist';
const suffixURL = '.html';

@Component()
export class PlaylistAPI {

    getURL(categoryURL: string, page: number) {
        const pageURL = page == 1 ? '' : `.${page}`;
        return `${baseURL}/${categoryURL}${pageURL}${suffixURL}`;
    }

}
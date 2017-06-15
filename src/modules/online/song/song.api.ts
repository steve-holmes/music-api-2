import { Component } from '@nestjs/common';

const baseURL = 'http://www.nhaccuatui.com/bai-hat';
const suffixURL = '.html';

@Component()
export class SongAPI {

    getURL(categoryURL: string, page: number) {
        const pageURL = page == 1 ? '' : `.${page}`;
        return `${baseURL}/${categoryURL}${pageURL}${suffixURL}`;
    }

}
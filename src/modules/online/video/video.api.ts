import { Component } from '@nestjs/common';

const baseURL = 'http://www.nhaccuatui.com/video';
const suffixURL = '.html';

@Component()
export class VideoAPI {

    getURL(categoryURL: string, page: number) {
        const pageURL = page == 1 ? '' : `.${page}`;
        return `${baseURL}-${categoryURL}${pageURL}${suffixURL}`;
    }

}
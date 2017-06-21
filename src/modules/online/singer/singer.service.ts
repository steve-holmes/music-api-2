import { Component } from '@nestjs/common';

import { SingerLoader } from './singer.loader';
import { SingerAPI } from './singer.api';
import { SingerRepository } from '../../singer/singer.repository';
import { SingerHelper } from '../../singer/singer.helper';

@Component()
export class SingerService {

    constructor(
        private singerLoader: SingerLoader,
        private singerAPI: SingerAPI,
        private singerRepository: SingerRepository
    ) {}

    async getHotSingers() {
        const singers = await this.singerLoader.response(this.singerAPI.getHotSingerURL());

        this.singerRepository.saveSingers(<any[]>singers);

        return { singers: SingerHelper.singers(singers) };
    }

    async getSingers(alpha: string, page: number = 1) {
        const singers = await this.singerLoader.response(this.singerAPI.getURL(alpha, page));

        this.singerRepository.saveSingers(<any[]>singers);

        return { singers: SingerHelper.singers(singers) };
    }

}
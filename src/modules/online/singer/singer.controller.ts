import { Controller, HttpStatus, Get, Response, Param } from '@nestjs/common';

import { SingerService } from './singer.service';

@Controller('/online/singers')
export class SingerController {

    constructor(private singerService: SingerService) {}

    @Get('/')
    async getSingers(@Response() response) {
        const singers = await this.singerService.getHotSingers();
        return response.status(HttpStatus.OK).json({ data: singers });
    }

    @Get('/:alpha')
    async getSingersFromAlpha(@Response() response, @Param('alpha') alpha) {
        const singers = await this.singerService.getSingers(alpha);
        return response.status(HttpStatus.OK).json({ data: singers });
    }

    @Get('/:alpha/:page')
    async getSingersFromAlphaAtPage(@Response() response, @Param('alpha') alpha, @Param('page') page) {
        const singers = await this.singerService.getSingers(alpha, +page);
        return response.status(HttpStatus.OK).json({ data: singers });
    }

}
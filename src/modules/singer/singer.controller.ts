import { Controller, HttpStatus, Get, Response, Param } from '@nestjs/common';

import { SingerService } from './singer.service';

@Controller('singers')
export class SingerController {

    constructor(private singerService: SingerService) {}

    @Get('/:id')
    async getSinger(@Response() response, @Param('id') id) {
        const singer = await this.singerService.getSinger(id);
        return response.status(HttpStatus.OK).json({ data: singer });
    }

}
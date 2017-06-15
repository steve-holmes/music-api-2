import { Controller, HttpStatus, Get, Response } from '@nestjs/common';

import { HomeService } from './home.service';

@Controller('/online/home')
export class HomeController {

    constructor(private homeService: HomeService) {}

    @Get('/')
    async index(@Response() response) {
        const { pages, playlists, videos, films, topics, songs } = await this.homeService.get();
        return response.status(HttpStatus.OK).json({ data: {
            pages, playlists, videos, films, topics, songs
        }});
    }

}
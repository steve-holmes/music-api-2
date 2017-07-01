import { Controller, HttpStatus, Get, Response, Param } from '@nestjs/common';

import { RankService } from './rank.service';

@Controller('ranks')
export class RankController {

    constructor(private rankService: RankService) {}

    @Get('/:country')
    async getRanks(@Response() response, @Param('country') country) {
        const countryName = this.rankService.getCountryName(country);
        const { songs, playlists, videos } = await this.rankService.getRanks(country);

        return response.status(HttpStatus.OK).json({data: {
            country: countryName,
            songs, playlists, videos
        }});
    }

    @Get('/songs/:country')
    async getSongs(@Response() response, @Param('country') country) {
        const countryName = this.rankService.getCountryName(country);
        const tracks = await this.rankService.getSongs(country);

        return response.status(HttpStatus.OK).json({data: {
            country: countryName,
            tracks: tracks
        }});
    }

}
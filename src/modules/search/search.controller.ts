import { Controller, HttpStatus, Get, Response, Param } from '@nestjs/common';

import { SearchService } from './search.service';
import { SongService } from './song.service';
import { PlaylistService } from './playlist.service';
import { VideoService } from './video.service';

// Bugs:
// - Only search ASCII-characters

@Controller('search')
export class SearchController {

    constructor(
        private searchService: SearchService,
        private songService: SongService,
        private playlistService: PlaylistService,
        private videoService: VideoService
    ) {}

    @Get('/:query')
    async search(@Response() response, @Param('query') query) {
        const data = await this.searchService.search(query);
        return response.status(HttpStatus.OK).json({ data });
    }

    @Get('/songs/:query')
    async searchSongs(@Response() response, @Param('query') query) {
        const songs = await this.songService.search(query);
        return response.status(HttpStatus.OK).json({ data: songs });
    }

    @Get('/playlists/:query')
    async searchPlaylists(@Response() response, @Param('query') query) {
        const playlists = await this.playlistService.search(query);
        return response.status(HttpStatus.OK).json({ data: playlists });
    }

    @Get('/videos/:query')
    async searchVideos(@Response() response, @Param('query') query) {
        const videos = await this.videoService.search(query);
        return response.status(HttpStatus.OK).json({ data: videos });
    }

}
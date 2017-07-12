import { Module, Shared } from '@nestjs/common';

import { SearchController } from './search.controller';

import { SearchService } from './search.service';
import { SongService } from './song.service';
import { PlaylistService } from './playlist.service';
import { VideoService } from './video.service';

import { SearchLoader } from './search.loader';
import { PlaylistLoader } from './playlist.loader';
import { SongLoader } from './song.loader';
import { VideoLoader } from './video.loader';

import { PlaylistParser } from './playlist.parser';
import { SongParser } from './song.parser';
import { VideoParser } from './video.parser';

import { PlaylistRepository } from '../playlist/playlist.repository';
import { SongRepository } from '../song/song.repository';
import { VideoRepository } from '../video/video.repository';

@Shared()
@Module({
    controllers: [ SearchController ],
    components: [
        SearchService, SongService, PlaylistService, VideoService,
        SearchLoader, PlaylistLoader, SongLoader, VideoLoader,
        PlaylistParser, SongParser, VideoParser,
        PlaylistRepository, SongRepository, VideoRepository
    ]
})
export class SearchModule {}
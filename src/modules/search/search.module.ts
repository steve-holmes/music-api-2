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

@Shared()
@Module({
    controllers: [ SearchController ],
    components: [
        SearchService, SongService, PlaylistService, VideoService,
        SearchLoader, PlaylistLoader, SongLoader, VideoLoader,
        PlaylistParser, SongParser, VideoParser
    ]
})
export class SearchModule {}
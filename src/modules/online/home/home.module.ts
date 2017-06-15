import { Module, Shared } from '@nestjs/common';

import { HomeController } from './home.controller';

import { HomeService } from './home.service';
import { HomeLoader } from './home..loader';

import { PageParser } from './page.parser';
import { PlaylistParser } from './playlist.parser';
import { SongParser } from './song.parser';
import { VideoParser } from './video.parser';
import { TopicParser } from './topic.parser';
import { FilmParser } from './film.parser';

import { PlaylistRepository } from '../../playlist/playlist.repository';
import { SongRepository } from '../../song/song.repository';
import { VideoRepository } from '../../video/video.repository';
import { TopicRepository } from '../../topic/topic.repository';

@Shared()
@Module({
    controllers: [ HomeController ],
    components: [
        HomeService, HomeLoader,
        PageParser, PlaylistParser, SongParser, VideoParser, TopicParser, FilmParser,
        PlaylistRepository, SongRepository, VideoRepository, TopicRepository
    ]
})
export class HomeModule {}
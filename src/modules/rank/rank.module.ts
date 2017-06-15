import { Module, Shared } from '@nestjs/common';

import { RankController } from './rank.controller';

import { RankService } from './rank.service';
import { RankLoader } from './rank.loader';
import { PlaylistRepository } from '../playlist/playlist.repository';
import { SongRepository } from '../song/song.repository';
import { VideoRepository } from '../video/video.repository';

@Shared()
@Module({
    controllers: [ RankController ],
    components: [
        RankService, RankLoader,
        PlaylistRepository, SongRepository, VideoRepository
    ]
})
export class RankModule {}
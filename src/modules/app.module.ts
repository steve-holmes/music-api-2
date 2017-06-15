import { Module } from '@nestjs/common';

import { OnlineModule } from './online/online.module';
import { CategoryModule } from './category/category.module'

import { PlaylistModule } from './playlist/playlist.module';
import { SongModule } from './song/song.module';
import { VideoModule } from './video/video.module';

import { TopicModule } from './topic/topic.module';
import { SingerModule } from './singer/singer.module';

import { RankModule } from './rank/rank.module';
import { SearchModule } from './search/search.module';

@Module({
    modules: [
        OnlineModule, CategoryModule,
        PlaylistModule, SongModule, VideoModule,
        TopicModule, SingerModule,
        RankModule, SearchModule
    ]
})
export class ApplicationModule {}
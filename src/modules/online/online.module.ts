import { Module, Shared } from '@nestjs/common';

import { HomeModule } from './home/home.module';
import { PlaylistsModule } from './playlist/playlist.module';
import { SongsModule } from './song/song.module';
import { VideosModule } from './video/video.module';
import { SingersModule } from './singer/singer.module';

@Shared()
@Module({
    modules: [ HomeModule, PlaylistsModule, SongsModule, VideosModule, SingersModule ]
})
export class OnlineModule {}
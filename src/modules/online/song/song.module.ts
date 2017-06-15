import { Module, Shared } from '@nestjs/common';

import { SongController } from './song.controller';

import { SongService } from './song.service';
import { SongRepository } from '../../song/song.repository';
import { SongAPI } from './song.api';
import { SongLoader } from './song.loader';

@Shared()
@Module({
    controllers: [ SongController ],
    components: [ SongService, SongRepository, SongAPI, SongLoader ]
})
export class SongsModule {}
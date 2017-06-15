import { Module, Shared } from '@nestjs/common';

import { SongController } from './song.controller';

import { SongService } from './song.service';
import { SongLoader } from './song.loader';
import { SongRepository } from './song.repository';

@Shared()
@Module({
    controllers: [ SongController ],
    components: [ SongService, SongLoader, SongRepository ]
})
export class SongModule {}
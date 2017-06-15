import { Module, Shared } from '@nestjs/common';

import { PlaylistController } from './playlist.controller';

import { PlaylistService } from './playlist.service';
import { PlaylistRepository } from '../../playlist/playlist.repository';
import { PlaylistAPI } from './playlist.api';
import { PlaylistLoader } from './playlist.loader';

@Shared()
@Module({
    controllers: [ PlaylistController ],
    components: [ PlaylistService, PlaylistRepository, PlaylistAPI, PlaylistLoader ]
})
export class PlaylistsModule {}
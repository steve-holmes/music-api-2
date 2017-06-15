import { Module, Shared } from '@nestjs/common';

import { PlaylistController } from './playlist.controller';

import { PlaylistService } from './playlist.service';
import { PlaylistLoader } from './playlist.loader';
import { PlaylistRepository } from './playlist.repository';

@Shared()
@Module({
    controllers: [ PlaylistController ],
    components: [ PlaylistService, PlaylistLoader, PlaylistRepository ]
})
export class PlaylistModule {}
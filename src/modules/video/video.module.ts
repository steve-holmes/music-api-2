import { Module, Shared } from '@nestjs/common';

import { VideoController } from './video.controller';

import { VideoService } from './video.service';
import { VideoLoader } from './video.loader';
import { VideoRepository } from './video.repository';

@Shared()
@Module({
    controllers: [ VideoController ],
    components: [ VideoService, VideoLoader, VideoRepository ]
})
export class VideoModule {}
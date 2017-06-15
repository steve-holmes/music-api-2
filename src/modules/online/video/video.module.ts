import { Module, Shared } from '@nestjs/common';

import { VideoController } from './video.controller';

import { VideoService } from './video.service';
import { VideoRepository } from '../../video/video.repository';
import { VideoAPI } from './video.api';
import { VideoLoader } from './video.loader';

@Shared()
@Module({
    controllers: [ VideoController ],
    components: [ VideoService, VideoRepository, VideoAPI, VideoLoader ]
})
export class VideosModule {}
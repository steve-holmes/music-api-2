import { Module, Shared } from '@nestjs/common';

import { TopicController } from './topic.controller';

import { TopicService } from './topic.service';
import { TopicsLoader } from './topics.loader';
import { TopicLoader } from './topic.loader';
import { TopicRepository } from './topic.repository';
import { PlaylistRepository } from '../playlist/playlist.repository';

@Shared()
@Module({
    controllers: [ TopicController ],
    components: [ TopicService, TopicsLoader, TopicLoader, TopicRepository, PlaylistRepository ]
})
export class TopicModule {}
import { Component } from '@nestjs/common';

import { TopicsLoader } from './topics.loader';
import { TopicLoader } from './topic.loader';
import { TopicRepository } from './topic.repository';
import { PlaylistRepository } from '../playlist/playlist.repository';

import { TopicHelper } from './topic.helper';
import { PlaylistHelper } from '../playlist/playlist.helper';

@Component()
export class TopicService {

    constructor(
        private topicsLoader: TopicsLoader,
        private topicLoader: TopicLoader,
        private topicRepository: TopicRepository,
        private playlistRepository: PlaylistRepository
    ) {}

    async getTopics() {
        const topics = <any[]>await this.topicsLoader.response();

        this.topicRepository.saveTopics(topics);

        return TopicHelper.topics(topics);
    }

    async getTopic(id: string) {
        let topic = await this.topicRepository.findTopic(id);
        topic = <{name: string, playlists: any[]}>await this.topicLoader.response(topic.url);

        this.playlistRepository.savePlaylists(topic.playlists);

        return {
            name: topic.name,
            playlists: PlaylistHelper.playlists(topic.playlists)
        };
    }

}
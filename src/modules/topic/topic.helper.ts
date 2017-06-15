import { ModelHelper } from '../model.helper';

export class TopicHelper extends ModelHelper {

    static topics(topics) {
        return topics.map(topic => ({
            id: TopicHelper.getId(topic.url),
            name: topic.name,
            avatar: topic.avatar
        }));
    }

}
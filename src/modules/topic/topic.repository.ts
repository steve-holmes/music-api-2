import { Component } from '@nestjs/common';

import { TopicHelper } from './topic.helper';

import * as db from '../../models/models';
const Topic = db.Topic;

@Component()
export class TopicRepository {

    saveTopics(topics: any[]) {
        const records = topics.map(topic => ({
            name: TopicHelper.getId(topic.url),
            url: topic.url
        }));

        for (let record of records) {
            Topic.findOne({ where: { name: record.name } }).then(foundedRecord => {
                if (foundedRecord == null) {
                    Topic.create({ name: record.name, url: record.url }).then(createdRecord => {
                        if (createdRecord == null) { throw Error("Topic Creation Error"); }
                        console.log(`Create topic: (${createdRecord.name}, ${createdRecord.url})`);
                    });
                    return;
                }
                foundedRecord.update({ url: record.url }, { where: { name: record.name } }).then(updatedRecord => {
                    if (updatedRecord == null) { throw Error("Topic Updating Error"); }
                    console.log(`Update topic: (${updatedRecord.name}, ${updatedRecord.url})`);
                });
            });
        }
    }

    findTopic(id: string) {
        return Topic.findOne({ where: { name: id } });
    }

}
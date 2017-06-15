import * as fs from 'fs';
import { Component } from '@nestjs/common';

import { VideoHelper } from './video.helper';

import { Category } from '../../models/category';

import * as db from '../../models/models';
const Video = db.Video;

@Component()
export class VideoRepository extends Category {

    async getCategory(category: string) {
        return await super.getCategory('video', category);
    }

    saveVideos(videos: any[]) {
        const records = videos.map(video => ({
            name: VideoHelper.getId(video.url),
            url: video.url
        }));

        for (let record of records) {
            Video.findOne({ where: { name: record.name } }).then(foundedRecord => {
                if (foundedRecord == null) {
                    Video.create({ name: record.name, url: record.url }).then(createdRecord => {
                        if (createdRecord == null) { throw Error("Video Creation Error"); }
                        console.log(`Create video: (${createdRecord.name}, ${createdRecord.url})`);
                    });
                    return;
                }
                foundedRecord.update({ url: record.url }, { where: { name: record.name } }).then(updatedRecord => {
                    if (updatedRecord == null) { throw Error("Video Updating Error"); }
                    console.log(`Update video: (${updatedRecord.name}, ${updatedRecord.url})`);
                });
            });
        }
    }

    findVideo(id: string) {
        return Video.findOne({ where: { name: id } });
    }

}
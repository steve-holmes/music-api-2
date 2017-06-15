import * as fs from 'fs';
import { Component } from '@nestjs/common';

import { SongHelper } from './song.helper';

import { Category } from '../../models/category';

import * as db from '../../models/models';
const Song = db.Song;

@Component()
export class SongRepository extends Category {

    async getCategory(category: string) {
        return await super.getCategory('song', category);
    }

    saveSongs(songs: any[]) {
        const records = songs.map(song => ({
            name: SongHelper.getId(song.url),
            url: song.url
        }));

        for (let record of records) {
            Song.findOne({ where: { name: record.name } }).then(foundedRecord => {
                if (foundedRecord == null) {
                    Song.create({ name: record.name, url: record.url }).then(createdRecord => {
                        if (createdRecord == null) { throw Error("Song Creation Error"); }
                        console.log(`Create song: (${createdRecord.name}, ${createdRecord.url})`);
                    });
                    return;
                }
                foundedRecord.update({ url: record.url }, { where: { name: record.name } }).then(updatedRecord => {
                    if (updatedRecord == null) { throw Error("Song Updating Error"); }
                    console.log(`Update song: (${updatedRecord.name}, ${updatedRecord.url})`);
                });
            });
        }
    }

    findSong(id: string) {
        return Song.findOne({ where: { name: id } });
    }

}
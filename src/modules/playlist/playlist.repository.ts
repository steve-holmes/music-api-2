import * as fs from 'fs';
import { Component } from '@nestjs/common';

import { PlaylistHelper } from './playlist.helper';

import { Category } from '../../models/category';

import * as db from '../../models/models';
const Playlist = db.Playlist;

@Component()
export class PlaylistRepository extends Category {

    async getCategory(category: string) {
        return await super.getCategory('playlist', category);
    }

    savePlaylists(playlists: any[]) {
        const records = playlists.map(playlist => ({
            name: PlaylistHelper.getId(playlist.url),
            url: playlist.url
        }));

        for (let record of records) {
            Playlist.findOne({ where: { name: record.name } }).then(foundedRecord => {
                if (foundedRecord == null) {
                    Playlist.create({ name: record.name, url: record.url }).then(createdRecord => {
                        if (createdRecord == null) { throw Error("Playlist Creation Error"); }
                        console.log(`Create playlist: (${createdRecord.name}, ${createdRecord.url})`);
                    });
                    return;
                }
                foundedRecord.update({ url: record.url }, { where: { name: record.name } }).then(updatedRecord => {
                    if (updatedRecord == null) { throw Error("Playlist Updating Error"); }
                    console.log(`Update playlist: (${updatedRecord.name}, ${updatedRecord.url})`);
                });
            });
        }
    }

    findPlaylist(id: string) {
        return Playlist.findOne({ where: { name: id } });
    }

}
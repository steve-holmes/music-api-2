import { Component } from '@nestjs/common';

import { SingerHelper } from './singer.helper';

import * as db from '../../models/models';
const Singer = db.Singer;

@Component()
export class SingerRepository {

    saveSingers(singers: any[]) {
        const records = singers.map(singer => ({
            name: SingerHelper.getId(singer.url),
            url: singer.url
        }));

        for (let record of records) {
            Singer.findOne({ where: { name: record.name } }).then(foundedRecord => {
                if (foundedRecord == null) {
                    Singer.create({ name: record.name, url: record.url }).then(createdRecord => {
                        if (createdRecord == null) { throw Error('Singer Creation Error'); }
                        console.log(`Create singer: (${createdRecord.name}, ${createdRecord.url})`);
                    });
                    return;
                }
                foundedRecord.update({ url: record.url }, { where: { name: record.name } }).then(updatedRecord => {
                    if (updatedRecord == null) { throw Error('Singer Updating Error'); }
                    console.log(`Update singer: (${updatedRecord.name}, ${updatedRecord.url})`);
                });
            });
        }
    }

    findSinger(id: string) {
        return Singer.findOne({ where: { name: id } });
    }

}
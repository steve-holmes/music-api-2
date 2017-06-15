import { Component } from '@nestjs/common';

import { SongRepository } from '../../song/song.repository';
import { SongAPI } from './song.api';
import { SongLoader } from './song.loader';
import { SongHelper } from '../../song/song.helper';

@Component()
export class SongService {

    constructor(
        private songRepository: SongRepository,
        private songAPI: SongAPI,
        private songLoader: SongLoader
    ) {}

    async getSongs(category: string, page: number = 1) {
        const { name } = await this.songRepository.getCategory(SongHelper.getLink(category));
        
        const url = this.songAPI.getURL(category, page);
        const songs = <any[]>(await this.songLoader.response(url));
        
        this.songRepository.saveSongs(songs);

        return {
            category: name,
            songs: SongHelper.songs(songs)
        };
    }

}
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

    async getSongs(category: string = 'nhac-tre-moi', page: number = 1) {
        let categoryInfo = await this.songRepository.getCategory(SongHelper.getLink(category));
        categoryInfo = SongHelper.transformCategory(categoryInfo);
        
        const url = this.songAPI.getURL(category, page);
        const songs = <any[]>(await this.songLoader.response(url));
        
        this.songRepository.saveSongs(songs);

        return {
            category: categoryInfo,
            songs: SongHelper.songs(songs)
        };
    }

}
import { Component } from '@nestjs/common';

import { CategoryRepository } from './category.repository';

import { NEW_LINK_SUFFIX, HOT_LINK_SUFFIX,
         NEW_VIDEO_LINK_SUFFIX, HOT_VIDEO_LINK_SUFFIX } from '../suffix';

@Component()
export class CategoryService {

    constructor(private category: CategoryRepository) {}

    async getPlaylist() {
        return this.category.getCategoryWithTransform('playlist', this.transform);
    }

    async getSong() {
        return this.category.getCategoryWithTransform('song', this.transform);
    }

    async getVideo() {
        return this.category.getCategoryWithTransform('video', this.parseVideoCategory);
    }

    private transform(list) {
        return list.map(({name, categories}) => ({
            name,
            categories: categories.map(({name, link}) => ({
                name,
                newlink: link + NEW_LINK_SUFFIX,
                hotlink: link + HOT_LINK_SUFFIX
            }))
        }));
    }

    private parseVideoCategory(videos) {
        return videos.map(({name, categories}) => ({
            name,
            categories: categories.map(({name, link}) => ({
                name,
                newlink: link + NEW_VIDEO_LINK_SUFFIX,
                hotlink: link + HOT_VIDEO_LINK_SUFFIX
            }))
        }));
    }

}
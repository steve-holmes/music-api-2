import * as fs from 'fs';

const CATEGORIES_FILE = 'config/categories.json';

export class Category {

    protected async getCategory(topic: string, category: string) {
        const songs = await this.getTopic(topic);
        const link = category;

        for (let song of songs) {
            const categories = song['categories'];
            for (let category of categories) {
                if (category.link == link) {
                    return category;
                }
            }
        }
        throw new Error("Category Not Found");
    }

    protected async getTopic(type: string) {
        const data = await this.loadCategories();
        return data[type];
    }

    protected async loadCategories() {
        return new Promise((resolve, reject) => {
            fs.readFile(CATEGORIES_FILE, 'utf8', (error, data) => {
                if (error) {
                    reject(error);
                }
                return resolve(JSON.parse(data));
            });
        });
    }

}
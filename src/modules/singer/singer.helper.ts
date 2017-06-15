import { ModelHelper } from '../model.helper';

const singerPath = 'nghe-si-';

export class SingerHelper extends ModelHelper {

    static getId(url: string): string {
        const startIndex = url.lastIndexOf(singerPath) + singerPath.length;
        const endIndex = url.lastIndexOf('.html');
        return url.substring(startIndex, endIndex);
    }

    static singers(singers) {
        return singers.map(singer => ({
            id: SingerHelper.getId(singer.url),
            name: singer.name,
            avatar: singer.avatar
        }));
    }

}
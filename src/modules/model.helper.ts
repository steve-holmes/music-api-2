export class ModelHelper {

    static getId(url: string): string {
        const path = url.substring(url.lastIndexOf('/'));
        const id = path.substring(path.indexOf('.') + 1, path.lastIndexOf('.'));
        return id;
    }

    static tracks(tracks) {
        return tracks.map(track => ({
            id: ModelHelper.getId(track.info),
            name: track.title,
            singer: track.singer,
            avatar: track.avatar,
            lyric: track.lyric,
            url: track.location
        }));
    }

}
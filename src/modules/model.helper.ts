export class ModelHelper {

    static getId(url: string): string {
        const path = url.substring(url.lastIndexOf('/'));
        const id = path.substring(path.indexOf('.') + 1, path.lastIndexOf('.'));
        return id;
    }

}
export class CommonOembedDto {

    public url: string;
    public title: string;
    public authorName: string;
    public tags: any;

    constructor(url: string, title: string, authorName: string, tags: any) {
        this.url = url;
        this.title = title;
        this.authorName = authorName;
        this.tags = tags;
    }
}

export interface CommonOembedDto {
    url: string;
    title: string;
    authorName: string;
    tag: any;
}
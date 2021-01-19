export class BadRequestError extends Error {
    private data: string;
    private statusCode: number;
    constructor(error) {
        super(error.message);
        this.data =  error.data ;
        this.statusCode = 400;
    }
}
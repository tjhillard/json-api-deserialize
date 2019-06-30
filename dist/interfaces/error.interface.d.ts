export default interface IError {
    id?: any;
    links?: {
        about?: string;
    };
    status?: string;
    code?: string;
    title?: string;
    detail?: string;
    source?: object;
    meta?: object;
}

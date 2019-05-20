export interface GiphyRequest {
    api_key: string;
    limit: number;
    rating: GiphyRating;
    offset: number;
    lang: string;
    [key: string]: any;
}

export interface GiphySearchRequest extends GiphyRequest {
    q: string;
}

export const enum GiphyRating {
    Y = 'Y',
    G = 'G',
    PG = 'PG',
    PG13 = 'PG-13',
    R = 'R',
}

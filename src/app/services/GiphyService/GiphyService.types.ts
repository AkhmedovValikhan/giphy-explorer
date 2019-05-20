import { GiphyResultEntry } from '../../model/giphy';

export interface GiphyServiceFetchResult {
    gifs: GiphyResultEntry[];
    totalCount: number;
}

export interface GiphyServiceQuery {
    search?: string;
    page: number;
    limit: number;
}

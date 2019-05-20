import { stringify } from 'querystring';
import { GiphyEndpointResult, GiphyRating, GiphyRequest, GiphySearchRequest } from '../../model/giphy';
import { GiphyServiceFetchResult, GiphyServiceQuery } from './GiphyService.types';

const GIPHY_URL = 'https://api.giphy.com/v1/gifs';

export class GiphyService {

    constructor(
        private readonly _apiKey: string) {
    }

    public async executeQuery(query: GiphyServiceQuery): Promise<GiphyServiceFetchResult> {
        this.validateQuery(query);
        const reqQuery: GiphyRequest = {
            ...this.composeParams(query),
        };
        if (query.search) {
            (reqQuery as GiphySearchRequest).q = query.search;
        }
        const pathName = `${GIPHY_URL}/${query.search ? 'search' : 'trending'}`;
        const result = await fetch(`${pathName}?${stringify(reqQuery)}`, {});
        const parsedRes: GiphyEndpointResult = await result.json();
        return {
            gifs: parsedRes.data,
            totalCount: parsedRes.pagination.total_count,
        };
    }

    private validateQuery(query: GiphyServiceQuery) {
        if (query.page < 0 || query.limit < 0) {
            throw new Error('Pagination options cannot be less than 0');
        }
    }

    private composeParams(query: GiphyServiceQuery): GiphyRequest {
        return {
            limit: query.limit,
            api_key: this._apiKey,
            lang: 'en',
            offset: query.page * query.limit,
            rating: GiphyRating.G,
        };
    }
}

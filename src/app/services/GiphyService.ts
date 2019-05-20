import { stringify } from 'querystring';
import { GiphyEndpointResult, GiphyRating, GiphyRequest, GiphyResultEntry, GiphySearchRequest } from '../model/giphy';

const GIPHY_URL = 'https://api.giphy.com/v1/gifs';

export class GiphyService {

    constructor(
        private readonly _apiKey: string) {
    }

    public async searchGifs(query: string, page: number, limit: number = 9): Promise<{ gifs: GiphyResultEntry[], totalCount: number }> {
        this.assertParams(page, limit);
        const reqQuery: GiphySearchRequest = {
            ...this.composeParams(page, limit),
            q: query,
        };
        const result = await fetch(`${GIPHY_URL}/search?${stringify(reqQuery)}`, {});
        const parsedRes: GiphyEndpointResult = await result.json();
        return {
            gifs: parsedRes.data,
            totalCount: parsedRes.pagination.total_count,
        };
    }

    public async trending(page: number = 0, limit: number = 9) {
        this.assertParams(page, limit);
        const reqQuery: GiphyRequest = this.composeParams(page, limit);
        const result = await fetch(`${GIPHY_URL}/trending?${stringify(reqQuery)}`, {});
        const parsedRes: GiphyEndpointResult = await result.json();
        return parsedRes.data;
    }

    private assertParams(page: number, limit: number) {
        if (page < 0 || limit < 0) {
            throw new Error('Pagination options cannot be less than 0');
        }
    }

    private composeParams(page: number, limit: number): GiphyRequest {
        return {
            limit,
            api_key: this._apiKey,
            lang: 'en',
            offset: page * limit,
            rating: GiphyRating.G,
        };
    }
}

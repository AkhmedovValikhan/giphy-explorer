import { GiphyEndpointResult } from '../../model/giphy';
import { GiphyService } from './GiphyService';

const TEST_API_KEY = 'TEST_API_KEY';
const mockFetch = (_args: any) => {
    return Promise.resolve({
        json: () => Promise.resolve({ data: [], pagination: { total_count: 0, count: 0, offset: 0 } } as Partial<GiphyEndpointResult>),
    }) as any;
};

describe('GiphyService', () => {
    let service: GiphyService;

    beforeEach(() => {
        (window as any).fetch = mockFetch;
        service = new GiphyService(TEST_API_KEY);
    });

    it('should throw if args are not valid', () => {
        const shouldThrow = [
            [-1, 0],
            [0, -1],
            [-1, -1],
        ];
        shouldThrow.forEach(([page, limit]) => {
            expect(service.executeQuery({ limit, page })).rejects.toThrow();
        });
    });

    it('should make request to trending enpoint', () => {
        const spy = jest.spyOn(window, 'fetch').mockImplementation(mockFetch);
        service.executeQuery({
            limit: 10,
            page: 5,
        });
        const targetUrl = `https://api.giphy.com/v1/gifs/trending?limit=10&api_key=${TEST_API_KEY}&lang=en&offset=50&rating=G`;
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(targetUrl, expect.anything());
    });

    it('should make request to search enpoint', () => {
        const searchTerm = 'kitty';
        const spy = jest.spyOn(window, 'fetch').mockImplementation(mockFetch);
        service.executeQuery({
            limit: 10,
            page: 5,
            search: searchTerm,
        });
        const targetUrl = `https://api.giphy.com/v1/gifs/search?limit=10&api_key=${TEST_API_KEY}&lang=en&offset=50&rating=G&q=${searchTerm}`;
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(targetUrl, expect.anything());
    });
});

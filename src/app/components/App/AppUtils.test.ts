import { getNextPage } from './AppUtils';

describe('AppUtils', () => {
    describe('getNextPage', () => {
        it('should calulcate next page correctly', () => {
            // currentPage, searchQuery, prevQuery
            const testCases: [number, string, string, number][] = [
                [0, '', '', 1],
                [0, 'test', '', 0],
                [10, 'test', 'test', 11],
                [10, 'test', '0', 0],
            ];

            testCases.forEach(([currentPage, searchQuery, prevQuery, expected]) => {
                const nextPage = getNextPage(currentPage, searchQuery, prevQuery);
                expect(nextPage).toBe(expected);
            });
        });
    });
});

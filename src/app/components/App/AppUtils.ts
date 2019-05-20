import { GiphyServiceQuery } from '../../services/GiphyService/GiphyService.types';

export const getNextPage = (currentPage: number, searchQuery: string, prevQuery: string) => {
    let page = 0;
    if (searchQuery) {
        const sameQuery = searchQuery === prevQuery;
        page = sameQuery ? currentPage + 1 : 0;
    } else {
        page = !prevQuery ? currentPage + 1 : 0;
    }
    return page;
};

export const composeServiceQuery = (curPage: number, searchQuery: string, lastSearchQuery: string): GiphyServiceQuery => {
    const nextPage = getNextPage(curPage, searchQuery, lastSearchQuery);

    return {
        limit: 9,
        page: nextPage,
        search: searchQuery,
    };
}
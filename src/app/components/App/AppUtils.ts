/**
 * Get next page for given page and search query state.
 * @param currentPage
 * @param searchQuery
 * @param prevQuery
 */
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

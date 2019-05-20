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


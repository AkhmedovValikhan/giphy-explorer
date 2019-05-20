export const getGiphyHeight = (origHeight: number, origWidth: number, realWidth: number) => {
    return (realWidth / origWidth) * origHeight;
};

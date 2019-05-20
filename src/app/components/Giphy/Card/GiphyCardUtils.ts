import { GiphyResultEntry } from '../../../model/giphy';

export const getGiphyRelativeHeight = (giphy: GiphyResultEntry, containerWidth: number): number => {
    if (!giphy || !containerWidth) { return 0; }
    let height = 0;
    const img = giphy.images.fixed_width;
    if (containerWidth) {
        height = getGiphyHeight(Number.parseInt(img.height, 10), Number.parseInt(img.width, 10), containerWidth);
    }
    return height;
};

export const getGiphyHeight = (origHeight: number, origWidth: number, realWidth: number) => {
    return (realWidth / origWidth) * origHeight;
};

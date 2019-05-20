import { GiphyResultEntry } from '../../model/giphy/response';

export const enum GiphyListMode {
    Grid = 'grid',
    Column = 'column',
}
export interface GifsListProps {
    gifs: GiphyResultEntry[];
    fetchMore: (page: number) => Promise<void>;
    mode?: GiphyListMode;
    loading: boolean;
}

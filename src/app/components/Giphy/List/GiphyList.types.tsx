import { GiphyResultEntry } from '../../../model/giphy';

export const enum GiphyListMode {
    Grid = 'grid',
    Column = 'column',
}
export interface GifsListProps {
    gifs: GiphyResultEntry[];
    fetchMore: () => Promise<void>;
    mode?: GiphyListMode;
    loading: boolean;
}

import { GiphyListMode } from '../Giphy/List';

export interface HeaderProps {
    totalResults: number;
    onSearchChanged: (q: string) => void;
    searchQuery: string;
    mode: GiphyListMode;
    onModeChange: (mode: GiphyListMode) => void;
}

import { GiphyResultEntry } from '../../../model/giphy';

export interface GyphyCardItemProps {
    loading?: boolean;
    onClick: (article: GiphyResultEntry) => void;
    giphy: GiphyResultEntry;
    className?: string;
}
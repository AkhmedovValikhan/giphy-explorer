export interface InfiniteScrollListProps {
    onReachBottom: () => void;
    getScrollParent: () => HTMLElement;
    enabled?: boolean;
    className?: string;
}

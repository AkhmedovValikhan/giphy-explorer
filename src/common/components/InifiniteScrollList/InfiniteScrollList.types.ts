export interface InfiniteScrollListProps {
    onReachBottom: () => Promise<void>;
    getScrollParent: () => HTMLElement;
    enabled?: boolean;
    className?: string;
}

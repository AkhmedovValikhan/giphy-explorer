export interface InfiniteScrollListProps {
    /**
     * Executed when bottom has been reached
     */
    onReachBottom: () => Promise<void>;
    /**
     * Should fire events
     */
    enabled?: boolean;
    className?: string;
}

import * as React from 'react';
import { getWindow } from '../../utils/DomUtils';

const SCROLL_TRIGGER_EVENTS = ['scroll', 'resize'];
const TRESHOLD = 200;
export interface InfiniteScrollListProps {
    onReachBottom: (page: number) => void;
    getScrollParent: () => HTMLElement;
    hasMore?: boolean;
    className?: string;
}

export interface InfiniteScrollListPropsState {
    loading: boolean;
}

export class InfiniteScrollList extends React.PureComponent<InfiniteScrollListProps, InfiniteScrollListPropsState> {

    private _page: number = 0;
    private _element: HTMLDivElement;
    constructor(props: InfiniteScrollListProps) {
        super(props);

        this.state = {
            loading: false,
        };
    }

    public componentDidMount() {
        this.addEventListeners();
    }

    public componentWillUnmount() {
        this.removeEventListeners();
    }

    private addEventListeners() {
        SCROLL_TRIGGER_EVENTS.forEach(ev => getWindow().addEventListener(ev, this.onScroll));
    }

    private removeEventListeners() {
        SCROLL_TRIGGER_EVENTS.forEach(ev => getWindow().removeEventListener(ev, this.onScroll));
    }

    private onScroll = async (e: Event) => {
        const scrollEl = window;
        const listElm = e.target as HTMLDivElement;
        let offset = 0;

        const scrollTop = scrollEl.pageYOffset;
        offset = this.calculateOffset(this._element, scrollTop);

        if (offset < TRESHOLD && (listElm && listElm.offsetParent !== null)) {
            this.removeEventListeners();
            this.setState({ loading: true });
            await this.props.onReachBottom(++this._page);
            this.setState({ loading: false });
            this.addEventListeners();
        }
    }

    private calculateOffset(el: HTMLElement, scrollTop: number) {
        if (!el) {
            return 0;
        }

        return (
            this.calculateTopPosition(el) +
            (el.offsetHeight - scrollTop - window.innerHeight)
        );
    }

    private calculateTopPosition(el: HTMLElement): number {
        if (!el) {
            return 0;
        }
        return el.offsetTop + this.calculateTopPosition(el.offsetParent as HTMLElement);
    }

    public render() {
        return <div
            className={this.props.className}
            ref={r => this._element = r as any}
        >
            {this.props.children}
        </div>;
    }
}

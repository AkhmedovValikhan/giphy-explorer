import * as React from 'react';
import { getWindow } from '../../utils/DomUtils';
import { InfiniteScrollListProps } from './InfiniteScrollList.types';
import { calculateBottomOffset } from './InifiniteScrollListUtils';

const SCROLL_TRIGGER_EVENTS = ['scroll', 'resize'];
const TRESHOLD = 200;

export class InfiniteScrollList extends React.PureComponent<InfiniteScrollListProps, {}> {
    private _element: HTMLDivElement;
    constructor(props: InfiniteScrollListProps) {
        super(props);

        this.state = {
            loading: false,
        };
    }

    public componentDidMount() {
        this.addEventListeners();
        this.onScroll();
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

    private onScroll = async () => {
        const offset = calculateBottomOffset(this._element);

        if (offset < TRESHOLD) {
            this.removeEventListeners();
            await this.props.onReachBottom();
            this.addEventListeners();
        }
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

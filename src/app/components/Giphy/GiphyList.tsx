import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { InfiniteScrollList } from '../../../common/components/InifiniteScrollList/InfiniteScrollList';
import { buckets } from '../../../common/utils/ArrayUtils';
import { GiphyResultEntry } from '../../model/giphy';
import { GyphyCard } from './GiphyCard';
import './GiphyList.scss';
import { GifsListProps, GiphyListMode } from './GiphyList.types';

interface GiphiesListState {
}

export class GifsList extends React.PureComponent<GifsListProps, GiphiesListState> {
    public static defaultProps: Partial<GifsListProps> = {
        mode: GiphyListMode.Column,
    };

    constructor(props: GifsListProps) {
        super(props);
    }

    // #region Handlers
    private onListScroll = async (page: number) => {
        await this.props.fetchMore(page);
    }
    // #endregion

    // #region Renders
    private renderLoading() {
        return <div className='lds-ripple'><div /><div /></div>;
    }

    private renderGiphies(): React.ReactNode {
        let grid: React.ReactNode[] = [];

        const columns = buckets(3, this.props.gifs);
        grid = columns.map((gifs, ind) => <div className='giphy-list__column' key={ind}>
            {gifs.map(this.renderGiphy)}
        </div>);

        // const classes = classNames({
        //     'giphy-list': true,
        //     ['giphy-list--' + (this.props.mode === GiphyListMode.Column ? 'column' : 'grid')]: true,
        // });

        const gridView = <CSSTransition key='1' unmountOnExit in={this.props.mode === GiphyListMode.Column} timeout={{ exit: 300, enter: 300 }}>
            <InfiniteScrollList className='giphy-list' getScrollParent={() => document.body} onReachBottom={this.onListScroll}>
                {this.props.gifs.map(this.renderGiphy)}
            </InfiniteScrollList>
        </CSSTransition>;

        const listView = <CSSTransition key='2' unmountOnExit in={this.props.mode === GiphyListMode.Grid} timeout={{ exit: 300, enter: 300 }}>
            <InfiniteScrollList className='giphy-list  giphy-list--grid' getScrollParent={() => document.body} onReachBottom={this.onListScroll}>
                {grid}
            </InfiniteScrollList>
        </CSSTransition>;

        return <React.Fragment>
            {this.props.mode === GiphyListMode.Grid ? gridView : listView}
            {this.props.mode === GiphyListMode.Grid ? listView : gridView}
            {this.props.loading && this.renderLoading()}
        </React.Fragment>;
    }

    private renderGiphy = (giphy: GiphyResultEntry) => {
        return <GyphyCard
            key={giphy.id}
            giphy={giphy}
        />;
    }
    // #endregion

    public render() {
        return <React.Fragment>
            {this.renderGiphies()}
        </React.Fragment>;
    }
}

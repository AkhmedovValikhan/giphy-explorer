import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { TransitionProps } from 'react-transition-group/Transition';
import { InfiniteScrollList } from '../../../../common/components/InifiniteScrollList';
import { buckets } from '../../../../common/utils/ArrayUtils';
import { GiphyResultEntry } from '../../../model/giphy';
import { GyphyCard } from '../Card/GiphyCard';
import './GiphyList.scss';
import { GifsListProps, GiphyListMode } from './GiphyList.types';

const FADE_ANIMATION_DURATION = 300;
const GRID_TRANSITION_PROPS: TransitionProps['timeout'] = {
    enter: FADE_ANIMATION_DURATION,
    exit: FADE_ANIMATION_DURATION,
};
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
    private onListScroll = async () => {
        await this.props.fetchMore();
    }
    // #endregion

    // #region Renders
    private renderLoading() {
        return <div className='lds-ripple'><div /><div /></div>;
    }

    private renderGiphy = (giphy: GiphyResultEntry) => {
        return <GyphyCard
            key={giphy.id}
            giphy={giphy}
        />;
    }

    private renderGrid() {
        let grid: React.ReactNode[] = [];

        const columns = buckets(3, this.props.gifs);
        grid = columns.map((gifs, ind) => <div className='giphy-list__column' key={ind}>
            {gifs.map(this.renderGiphy)}
        </div>);

        return grid;
    }

    private renderList() {
        return this.props.gifs.map(this.renderGiphy);
    }

    private renderGiphies(): React.ReactNode {
        const wrapper = (cntnt: React.ReactNode, mode: GiphyListMode) => <CSSTransition
            key={mode}
            unmountOnExit
            in={this.props.mode === mode}
            timeout={GRID_TRANSITION_PROPS}
        >
            <InfiniteScrollList className={`giphy-list ${mode === GiphyListMode.Grid ? 'giphy-list--grid' : ''}`} getScrollParent={() => document.body} onReachBottom={this.onListScroll}>
                {cntnt}
            </InfiniteScrollList>
        </CSSTransition>;

        // a bit of overhead by rendering both views alway, but beatiy is pain
        const listView = wrapper(this.renderList(), GiphyListMode.Column);
        const gridView = wrapper(this.renderGrid(), GiphyListMode.Grid);

        return <React.Fragment>
            {this.props.mode === GiphyListMode.Grid ? listView : gridView}
            {this.props.mode === GiphyListMode.Grid ? gridView : listView}
            {this.props.loading && this.renderLoading()}
        </React.Fragment>;
    }
    // #endregion

    public render() {
        return <React.Fragment>
            {this.renderGiphies()}
        </React.Fragment>;
    }
}

// import { Cancelable } from 'lodash';
import { debounce } from 'lodash-es';
import { inject } from 'propin';
import * as React from 'react';
import './App.scss';

import { Switch } from '../common/components/Switch/Switch';
import { SwitchItem } from '../common/components/Switch/Switch.types';
import { getNextPage } from '../common/utils/Utils';
import { GRID_ICON, HAMBURGER_ICON } from '../icons';
import { GifsList } from './components/Giphy/GiphyList';
import { GiphyListMode } from './components/Giphy/GiphyList.types';
import { Header } from './components/Header/Header';
import { GiphyResultEntry } from './model/giphy';
import { GiphyClient } from './services/GiphyService';

const SEARCH_DEBOUNCE_TIME = 300;

interface State {
    giphies: GiphyResultEntry[];
    totalResults: number;
    mode: GiphyListMode;
    loading: boolean;
    searchQuery: string;
    currentPage: number;
}

class App extends React.PureComponent<{}, State> {
    private _lastExecutedSearchQuery: string = '';
    @inject() private _giphyClient: GiphyClient;

    constructor() {
        super({});

        this.state = {
            giphies: [],
            totalResults: 0,
            loading: true,
            searchQuery: '',
            currentPage: 0,
            mode: GiphyListMode.Grid,
        };
    }

    public componentDidMount() {
        this.fetchGiphies();
    }

    private fetchGiphies = async (_page: number = 0) => {
        let giphies: GiphyResultEntry[];
        let totalCount: number = 0;
        const { currentPage, searchQuery } = this.state;
        this.setState({ loading: true });

        const nextPage = getNextPage(currentPage, searchQuery, this._lastExecutedSearchQuery);

        if (searchQuery) {
            const result = await this._giphyClient.searchGifs(searchQuery, nextPage);
            giphies = result.gifs;
            totalCount = result.totalCount;
        } else {
            giphies = await this._giphyClient.trending(nextPage);
        }

        this._lastExecutedSearchQuery = this.state.searchQuery;
        giphies = nextPage !== 0 ? this.state.giphies.concat(giphies) : giphies;

        this.setState({
            giphies,
            currentPage: nextPage,
            totalResults: totalCount,
            loading: false,
        });
    }

    private executeSearch = debounce(() => this.fetchGiphies(), SEARCH_DEBOUNCE_TIME);

    private onSearchChanged = (q: string) => {
        this._lastExecutedSearchQuery = this.state.searchQuery;
        this.setState({ searchQuery: q });
        this.executeSearch();
    }

    private onToggleMode = () => {
        this.setState({ mode: this.state.mode === GiphyListMode.Column ? GiphyListMode.Grid : GiphyListMode.Column });
    }

    private onMore = (page: number) => this.fetchGiphies(page);

    private renderHeader() {
        return <Header
            onSearchChanged={this.onSearchChanged}
            searchQuery={this.state.searchQuery}
            totalResults={this.state.totalResults}
            startContent={<Switch items={MODE_ITEMS} value={this.state.mode} onChange={this.onToggleMode} />}
        />;
    }

    private renderBody() {
        return <div className='container root-container'>
            <GifsList loading={this.state.loading} mode={this.state.mode} fetchMore={this.onMore} gifs={this.state.giphies} />
        </div>;
    }

    public render() {
        return (
            <React.Fragment>
                {this.renderHeader()}
                {this.renderBody()}
            </React.Fragment>
        );
    }

}

export default App;

const MODE_ITEMS: SwitchItem[] = [
    {
        iconInline: HAMBURGER_ICON,
        value: GiphyListMode.Column,
    },
    {
        iconInline: GRID_ICON,
        value: GiphyListMode.Grid,
    },
];

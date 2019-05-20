import { debounce } from 'lodash-es';
import { inject } from 'propin';
import * as React from 'react';
import './App.scss';

import { Switch } from '../../../common/components/Switch';
import { getNextPage } from './AppUtils';

import { GiphyResultEntry } from '../../model/giphy';
import { GiphyService } from '../../services/GiphyService/GiphyService';
import { GifsList, GiphyListMode } from '../Giphy/List';
import { Header } from '../Header/Header';
import { MODE_ITEMS } from './App.aux';
import { GiphyServiceQuery } from '../../services/GiphyService/GiphyService.types';

const SEARCH_DEBOUNCE_TIME = 300;

interface State {
    giphies: GiphyResultEntry[];
    totalResults: number;
    mode: GiphyListMode;
    loading: boolean;
    searchQuery: string;
    currentPage: number;
}

export class App extends React.PureComponent<{}, State> {
    private _lastExecutedSearchQuery: string = '';
    @inject() private _giphyClient: GiphyService;

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

    private fetchGiphies = async () => {
        let giphies: GiphyResultEntry[];
        const { currentPage, searchQuery } = this.state;
        this.setState({ loading: true });

        const nextPage = getNextPage(currentPage, searchQuery, this._lastExecutedSearchQuery);

        const query: GiphyServiceQuery = {
            limit: 9,
            page: nextPage,
            search: searchQuery,
        };

        const result = await this._giphyClient.executeQuery(query);
        this._lastExecutedSearchQuery = this.state.searchQuery;
        giphies = nextPage !== 0 ? this.state.giphies.concat(result.gifs) : result.gifs;

        this.setState({
            giphies,
            currentPage: nextPage,
            totalResults: result.totalCount,
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
            <GifsList
                loading={this.state.loading}
                mode={this.state.mode}
                fetchMore={this.fetchGiphies}
                totalCount={this.state.totalResults}
                gifs={this.state.giphies}
            />
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

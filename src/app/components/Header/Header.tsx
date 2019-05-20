import classNames from 'classnames';
import * as React from 'react';
import { Button } from '../../../common/components/Button/Button';
import { Input } from '../../../common/components/Input/Input';
import { LITERALS } from '../../../literals';
import './Header.scss';

export interface HeaderProps {
    totalResults: number;
    startContent?: React.ReactNode;
    onSearchChanged: (q: string) => void;
    searchQuery: string;
}

interface State {
}

export class Header extends React.PureComponent<HeaderProps, State> {
    constructor(props: HeaderProps) {
        super(props);
        this.state = {
        };
    }

    private clearSearchQuery = () => {
        this.props.onSearchChanged('');
    }

    private onSearchInput: React.FormEventHandler = (e) => {
        const inputEl = e.target as HTMLInputElement;
        this.props.onSearchChanged(inputEl.value);
    }

    private renderTitle() {
        const title = this.props.searchQuery ?
            `${LITERALS.FOUND} ${this.props.totalResults}` :
            LITERALS.TRENDING;
        return <h2 className='header__title'>{title}</h2>;
    }

    private renderSearch() {
        return <React.Fragment>
            <Input
                fluid
                className='header__search'
                placeholder={LITERALS.SEARCH_PLACEHOLDER}
                onInput={this.onSearchInput}
                value={this.props.searchQuery}
            />
            <Button
                className='header__search-clear'
                onClick={this.clearSearchQuery}
                theme='primary'
            >
                {LITERALS.CANCEL}
            </Button>
        </React.Fragment>;
    }

    public render() {
        const className = classNames({
            'header': true,
            'header--search': this.props.searchQuery,
        });
        return <header className={className}>
            <div className='container header__container'>
                <div className='header__content header__content--start'>
                    {this.renderSearch()}
                </div>
                <div className='header__content header__content--center'>
                    <div className='header__search-container'>
                        {this.renderTitle()}
                    </div>
                </div>
                <div className='header__content header__content--end'>
                    {this.props.startContent}
                </div>
            </div>
        </header>;
    }
}

import classNames from 'classnames';
import * as React from 'react';
import './GiphyCard.scss';
import { GyphyCardItemProps } from './GiphyCard.types';
import { getGiphyRelativeHeight } from './GiphyCardUtils';

interface State {
    width: number;
    loading: boolean;
}

export class GyphyCard extends React.PureComponent<GyphyCardItemProps, State> {
    public static defaultProps: Partial<GyphyCardItemProps> = {
        loading: false,
    };

    constructor(props: GyphyCardItemProps) {
        super(props);
        this.state = {
            width: 0,
            loading: true,
        };
    }

    private onRef = (el: HTMLAnchorElement | null) => {
        if (!el || this.state.width) {
            return;
        }
        const elWidth = el.getBoundingClientRect().width;
        this.setState({ width: elWidth });
    }

    private onGiphyLoad = () => {
        this.setState({ loading: false });
    }

    public render() {
        const classes = classNames({
            'giphy-card': true,
            'giphy-card--loading': this.state.loading,
        });

        const height = getGiphyRelativeHeight(this.props.giphy, this.state.width);
        return (
            <a
                className={classes}
                href={this.props.giphy.url}
                target='__blank'
                ref={this.onRef}
            >
                <img height={height} src={this.props.giphy.images.fixed_width.url} onLoad={this.onGiphyLoad} />
            </a>
        );
    }
}

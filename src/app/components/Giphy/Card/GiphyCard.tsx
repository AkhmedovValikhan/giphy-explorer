import classNames from 'classnames';
import * as React from 'react';
import { getGiphyHeight } from '../../../utils/GiphyUtils';
import './GiphyCard.scss';
import { GyphyCardItemProps } from './GiphyCard.types';

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

        const img = this.props.giphy.images.fixed_width;
        let height = 0;
        if (this.state.width) {
            height = getGiphyHeight(Number.parseInt(img.height, 10), Number.parseInt(img.width, 10), this.state.width);
        }

        return (
            <a className={classes} href={this.props.giphy.url} target='__blank' ref={this.onRef}>
                <img height={height} src={this.props.giphy.images.fixed_width.url} onLoad={this.onGiphyLoad} />
            </a>
        );
    }
}

import * as React from 'react';
import { ButtonProps } from '.';
import './Button.scss';

export class Button extends React.PureComponent<ButtonProps> {
    public static defaultProps: Partial<ButtonProps> = {
        theme: 'primary',
    };

    public render() {
        const className = `button button--${this.props.theme} ${this.props.className ? this.props.className : ''}`;
        return <div role='button' className={className} onClick={this.props.onClick}>
            {this.props.children}
        </div>;
    }
}

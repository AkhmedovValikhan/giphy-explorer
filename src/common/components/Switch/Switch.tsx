import classNames from 'classnames';
import * as React from 'react';
import './Switch.scss';
import { SwitchItem, SwitchProps } from './Switch.types';

export class Switch extends React.PureComponent<SwitchProps> {
    public static defaultProps: Partial<SwitchProps> = {
        theme: 'primary',
    };

    private renderOption = (option: SwitchItem) => {
        const isActive = option.value === this.props.value;
        const classes = classNames({
            'switch__option': true,
            'switch__option--active': isActive,
        });
        return <div
            role='radio'
            aria-checked={isActive}
            className={classes}
            key={option.value}
            onClick={() => this.props.onChange(option.value)}
        >
            <div className='switch__option-icon' dangerouslySetInnerHTML={{ __html: option.iconInline }} />
        </div>;
    }

    private getValueIndex() {
        return this.props.items.findIndex(it => it.value === this.props.value);
    }

    public render() {
        const className = `switch switch--${this.props.theme} ${this.props.className ? this.props.className : ''}`;
        return <div className={className} onClick={this.props.onClick} role='radiogroup'>
            <div className={`switch__highlighter switch__highlighter--${this.getValueIndex()}`} />
            {this.props.items.map(this.renderOption)}
        </div>;
    }
}

import classNames from 'classnames';
import omit from 'lodash-es/omit';
import * as React from 'react';
import './Input.scss';
import { InputProps } from './Input.types';

const OVERRIDEN_PROPS: (keyof InputProps)[] = ['className', 'fluid'];

export class Input extends React.PureComponent<InputProps, {}> {
    public render() {
        const classes = classNames({
            'input': true,
            'input--fluid': this.props.fluid,
        });
        const props = omit(this.props, OVERRIDEN_PROPS);
        const className = `${classes} ${this.props.className ? this.props.className : ''}`;
        return <input {...props} className={className} />;
    }
}

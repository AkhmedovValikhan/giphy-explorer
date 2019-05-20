import { mount } from 'enzyme';
import React from 'react';
import { Switch } from '.';
import { SwitchItem } from './Switch.types';

const MOCK_ITEMS: SwitchItem[] = [
    {
        iconInline: '<svg />',
        value: 'a',
    },
    {
        iconInline: '<svg />',
        value: 'b',
    },
];

describe('Switch', () => {
    it('should render without errors', () => {
        const switchCmp = mount(<Switch items={MOCK_ITEMS} value='a' />);

        const options = switchCmp.find('[role="radio"]');
        expect(options).toHaveLength(2);
        expect(options.at(0).prop('aria-checked')).toBe(true);
        expect(options.at(1).prop('aria-checked')).toBe(false);
    });

    it('should handle click', () => {
        let newVal: string = '';
        let changedCalled = 0;
        const onChange = (val: string) => { newVal = val; changedCalled++; };
        const switchCmp = mount(<Switch items={MOCK_ITEMS} onChange={onChange} value='a' />);

        let options = switchCmp.find('[role="radio"]');
        const option1 = options.at(1);
        option1.simulate('click');

        expect(changedCalled).toBe(1);
        expect(newVal).toBe('b');

        switchCmp.setProps({ value: newVal });
        options = switchCmp.find('[role="radio"]');
        expect(options.at(0).prop('aria-checked')).toBe(false);
        expect(options.at(1).prop('aria-checked')).toBe(true);
    });
});

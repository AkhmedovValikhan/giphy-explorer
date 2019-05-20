import { SwitchItem } from '../../../common/components/Switch';

import { GRID_ICON, HAMBURGER_ICON } from '../../../icons';

import { GiphyListMode } from '../Giphy/List';

export const MODE_ITEMS: SwitchItem[] = [
    {
        iconInline: HAMBURGER_ICON,
        value: GiphyListMode.Column,
    },
    {
        iconInline: GRID_ICON,
        value: GiphyListMode.Grid,
    },
];

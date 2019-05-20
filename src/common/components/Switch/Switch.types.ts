import { Theme } from '..';

export interface SwitchProps<TValue = string> {
    onClick: () => void | Promise<void>;
    onChange: (value: TValue) => void;
    className?: string;
    items: SwitchItem<TValue>[];
    value: TValue;
    theme?: Theme;
}

export interface SwitchItem<TValue = string> {
    value: TValue;
    /**
     * Svg markup of icon
     */
    iconInline: string;
}

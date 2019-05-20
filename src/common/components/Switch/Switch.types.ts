export interface SwitchProps<TValue = string> {
    onClick: () => void | Promise<void>;
    onChange: (value: TValue) => void;
    className?: string;
    items: SwitchItem<TValue>[];
    value: TValue;
    theme?: 'primary' | 'secondary' | 'secondary-hollow' | 'default';
}

export interface SwitchItem<TValue = string> {
    value: TValue;
    iconInline: string;
}

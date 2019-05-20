import { Theme } from '..';

export interface ButtonProps {
    onClick: () => void | Promise<void>;
    className?: string;
    theme?: Theme;
}

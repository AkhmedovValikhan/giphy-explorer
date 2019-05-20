import { getWindow } from '../../utils/DomUtils';

export const calculateOffsetTop = (el: HTMLElement): number => {
    if (!el) { return 0; }
    return el.offsetTop + calculateOffsetTop(el.offsetParent as HTMLElement);
};

export const calculateBottomOffset = (el: HTMLElement) => {
    if (!el) { return 0; }
    const topPos = calculateOffsetTop(el);
    const elTotalHeight = topPos + el.offsetHeight;

    const win = getWindow();
    const winScrollTop = win.pageYOffset;
    const scolledHeight = winScrollTop + win.innerHeight;

    return elTotalHeight - scolledHeight;
};

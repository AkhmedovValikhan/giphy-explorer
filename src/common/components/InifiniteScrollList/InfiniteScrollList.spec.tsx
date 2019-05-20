import { calculateBottomOffset, calculateOffsetTop } from './InifiniteScrollListUtils';

let innerHeight = 0;
let pageYOffset = 0;
jest.mock('../../utils/DomUtils', () => ({
    getWindow: () => ({ innerHeight, pageYOffset }) as Window,
}));

const mockStructure = {
    offsetTop: 100,
    offsetHeight: 100,
    offsetParent: ({
        offsetTop: 200,
        offsetHeight: 200,
        offsetParent: ({
            offsetTop: 0,
            offsetHeight: 400,
            offsetParent: undefined,
        } as Partial<HTMLElement> as HTMLElement),
    } as Partial<HTMLElement> as HTMLElement),
} as Partial<HTMLElement> as HTMLElement;

describe('InfiniteScrollListUtils', () => {
    beforeEach(() => {
        innerHeight = 0;
        pageYOffset = 0;
    });

    it('should calculate offset top', () => {
        const offsetTop = calculateOffsetTop(mockStructure);

        expect(offsetTop).toBe(300);
    });

    it('should calculate offset to bottom', () => {
        const testCases = [
            [300, 0, 100],
            [300, 100, 0],
            [400, 0, 0],
            [500, 0, -100],
        ];

        testCases.forEach(([inner, yoffset, expResult]) => {
            innerHeight = inner;
            pageYOffset = yoffset;
            const offsetBottom = calculateBottomOffset(mockStructure);
            expect(offsetBottom).toBe(expResult);
        });
    });
});

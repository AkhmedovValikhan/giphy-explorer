import { buckets } from './ArrayUtils';

describe('ArrayUtils', () => {
    describe('buckets', () => {
        it('should split on buckets', () => {
            const input = [1, 2, 3, 4, 5, 6, 7, 8];
            const res = buckets(2, input);
            expect(res).toHaveLength(4);
        });
    });
});

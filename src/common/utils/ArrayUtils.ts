export const times = (count: number) => {
    const res = new Array(count);
    for (let i = 0; i < count; i++) {
        res[i] = i;
    }
    return res;
};

export const buckets = <TItem>(bucketsCount: number, items: TItem[]) => {
    const result = times(bucketsCount).map(() => []) as any[][];
    return items.reduce((res, item, indx) => {
        res[indx % bucketsCount].push(item);
        return res;
    }, result);
}

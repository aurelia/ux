/**
 * A wrapper-promise which rejects when discarded
 */
export declare class DiscardablePromise<T> implements PromiseLike<T> {
    private promise;
    constructor(promise: Promise<T>);
    static discarded: symbol;
    isDiscarded: boolean;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: (value: T) => TResult1 | PromiseLike<TResult1>, onrejected?: (reason: any) => TResult2 | PromiseLike<TResult2>): PromiseLike<TResult1 | TResult2>;
    discard(): void;
}

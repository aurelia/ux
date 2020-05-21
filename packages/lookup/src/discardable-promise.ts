/**
 * A wrapper-promise which rejects when discarded
 */
export class DiscardablePromise<T> implements PromiseLike<T> {
  constructor(private promise: Promise<T>) { }

  static discarded = Symbol("discarded");

  isDiscarded: boolean;

  then<TResult1 = T, TResult2 = never>(onfulfilled?: (value: T) => TResult1 | PromiseLike<TResult1>, onrejected?: (reason: any) => TResult2 | PromiseLike<TResult2>): PromiseLike<TResult1 | TResult2> {
    return this.promise.then(x => {
      if (this.isDiscarded) {
        return Promise.reject(DiscardablePromise.discarded);
      }
      else {
        return Promise.resolve(x);
      }
    }).then(onfulfilled, onrejected);
  }

  discard() {
    this.isDiscarded = true;
  }
}

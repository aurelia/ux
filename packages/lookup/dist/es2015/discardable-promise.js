/**
 * A wrapper-promise which rejects when discarded
 */
let DiscardablePromise = /** @class */ (() => {
    class DiscardablePromise {
        constructor(promise) {
            this.promise = promise;
        }
        then(onfulfilled, onrejected) {
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
    DiscardablePromise.discarded = Symbol("discarded");
    return DiscardablePromise;
})();
export { DiscardablePromise };
//# sourceMappingURL=discardable-promise.js.map
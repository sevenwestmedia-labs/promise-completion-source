export class PromiseCompletionSource<T> {
    promise: Promise<T>
    completed: boolean = false
    resolve!: (result: T) => Promise<void>
    reject!: (error: Error) => Promise<void>

    constructor() {
        const ensureNotComplete = () => {
            if (this.completed) {
                throw new Error('Promise already completed')
            }
            this.completed = true
        }
        this.promise = new Promise((resolve, reject) => {
            this.resolve = result => {
                ensureNotComplete()
                resolve(result)
                return new Promise<void>(r => setTimeout(r))
            }
            this.reject = error => {
                ensureNotComplete()
                reject(error)
                // We want to resolve this promise
                // because we are using this to know when callbacks are resolved
                // not get the error, you can await pcs.promise to get error
                return new Promise<void>(r => setTimeout(r))
            }
        })

        // When we reject the promise but the promise is not yet observed we get
        // a UnhandledPromiseRejectionWarning, by catching here we still preserve
        // the error (when .promise is observed) but prevent the warning
        // tslint:disable-next-line:no-empty
        this.promise.catch(() => {})
    }
}

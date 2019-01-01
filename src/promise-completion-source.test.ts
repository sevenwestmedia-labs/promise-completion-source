import { PromiseCompletionSource } from '.'

it('promise is running when initialised', async () => {
    const promiseCompletionSource = new PromiseCompletionSource<string>()

    const isPromiseRunning = await promiseIsStillRunning(
        promiseCompletionSource.promise
    )

    expect(isPromiseRunning).toBe(true)
    expect(promiseCompletionSource.completed).toBe(false)
})

it('promise resolves when resolve() called', async () => {
    const promiseCompletionSource = new PromiseCompletionSource<string>()

    await promiseCompletionSource.resolve('done')

    expect(promiseCompletionSource.promise).resolves.toBe('done')
    expect(promiseCompletionSource.completed).toBe(true)
})

it('promise rejects when reject() called', async () => {
    const promiseCompletionSource = new PromiseCompletionSource<string>()

    await promiseCompletionSource.reject(new Error('boom'))

    expect(promiseCompletionSource.promise).rejects.toThrowError('boom')
    expect(promiseCompletionSource.completed).toBe(true)
})

async function promiseIsStillRunning(promise: Promise<any>): Promise<boolean> {
    let hasResolved: boolean = false
    let hasRejected: boolean = false
    // These are microtasks, so if we clear the event loop they will all be resolved
    promise.then(() => (hasResolved = true)).catch(() => (hasRejected = true))

    await new Promise(resolve => setTimeout(resolve))
    return !(hasResolved || hasRejected)
}

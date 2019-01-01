# Promise completion source

[![Build Status](https://travis-ci.com/sevenwestmedia-labs/promise-completion-source.svg?branch=master)](https://travis-ci.com/sevenwestmedia-labs/promise-completion-source) [![NPM Package](https://www.npmjs.com/package/promise-completion-source)(https://img.shields.io/npm/v/promise-completion-source.svg)

Creates a promise producer which controls the completion/rejection of the promise available through the .promise key.

## Example

```ts
import { PromiseCompletionSource } from 'promise-completion-source'

const promiseCompletionSource = new PromiseCompletionSource<Result>()

// This is a promise which can be awaited or passed around as a future
const promise = promiseCompletionSource.promise

// Then you can resolve/reject using the completion source
promiseCompletionSource.resolve(result)
// or
promiseCompletionSource.reject(new Error('Some error'))

// You can also check completion
const isPromiseCompleted = promiseCompletionSource.completed
```

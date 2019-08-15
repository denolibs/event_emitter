# event_emitter API

Class Methods

## emitter.addListener

### `emitter.addListener(eventName: string | symbol, listener: Function): EventEmitter`

Alias for `emitter.on(eventName, listener);`

## emitter.emit

### `emitter.emit(eventName: string | symbol) : boolean`

Synchronously calls each of the listeners registered for the event named eventName, in the order they were registered, passing the supplied arguments to each. Returns true if the event had listeners, false otherwise.

## emitter.eventNames

### `emitter.eventNames() : [string | symbol]`

Returns an array listing the events for which the emitter has registered listeners. The values in the array will be strings or symbols.

## emitter.getMaxListeners

### `emitter.getMaxListeners() : number`

Returns the current max listener value for the EventEmitter which is either set by `emitter.setMaxListeners(n)` or defaults to `EventEmitter.defaultMaxListeners`.

## emitter.listenerCount

### `emitter.listenerCount(eventName: string | symbol) : number`

Returns the number of listeners listening to the event named `eventName`.

## emitter.listeners

### `emitter.listeners(eventName: string | symbol) : Function[]`

Returns a copy of the array of listeners for the event named eventName.

## emitter.off

### `emitter.off(eventName: string | symbol, listener: Function) : EventEmitter`

Alias for `emitter.removeListener()`.

## emitter.on

### `emitter.on(eventName: string | symbol, listener: Function) : EventEmitter`

Adds the `listener` function to the end of the listeners array for the event named `eventName`. No checks are made to see if the `listener` has already been added. Multiple calls passing the same combination of `eventName` and `listener` will result in the listener being added, and called, multiple times.

## emitter.once

### `emitter.once(eventName: string | symbol, listener: Function) : EventEmitter`

Adds a **one-time** `listener` function for the event named `eventName`. The next time eventName is triggered, this `listener` is removed and then invoked.

## emitter.prependListener

### `emitter.prependListener(eventName: string | symbol, listener: Function) : EventEmitter`

Adds the `listener` function to the _beginning_ of the listeners array for the event named `eventName`. No checks are made to see if the `listener` has already been added. Multiple calls passing the same combination of `eventName` and `listener` will result in the `listener` being added, and called, multiple times.

## emitter.prependOnceListener

### `emitter.prependOnceListener(eventName: string | symbol, listener: Function) : EventEmitter`

Adds a **one-time** `listener` function for the event named `eventName` to the _beginning_ of the listeners array. The next time `eventName` is triggered, this listener is removed, and then invoked.

## emitter.removeAllListeners

### `emitter.removeAllListeners(eventName?: string | symbol) : EventEmitter`

Removes all listeners, or those of the specified `eventName`.

## emitter.removeListener

### `emitter.removeListener(eventName: string | symbol, listener: Function) : EventEmitter`

Removes the specified `listener` from the listener array for the event named `eventName`.

## emitter.setMaxListeners

### `emitter.setMaxListeners(n) : EventEmitter`

By default EventEmitters will print a warning if more than `10` listeners are added for a particular event. This is a useful default that helps finding memory leaks. Obviously, not all events should be limited to just 10 listeners. The `emitter.setMaxListeners()` method allows the limit to be modified for this specific `EventEmitter` instance. The value can be set to `Infinity` (or `0`) to indicate an unlimited number of listeners.

## emitter.rawListeners

### `emitter.rawListeners(eventName: string | symbol) : Function[]`

Returns a copy of the array of listeners for the event named `eventName`, including any wrappers (such as those created by `.once()`).

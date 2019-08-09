# deno_event_emitter [![Build Status](https://travis-ci.org/ozjd/deno_event_emitter.svg?branch=master)](https://travis-ci.org/ozjd/deno_event_emitter)

A NodeJS-like EventEmitter for Deno written in 100% Typescript.

## Usage

### Extend EventEmitter Class

```TypeScript
import EventEmitter from 'https://raw.github.com/ozjd/deno_event_emitter/master/mod.ts';

class NewClass extends EventEmitter {
  public constructor() {
    super();
  }

  public createEvent(): NewClass {
    this.emit('event', 'The createEvent() method was called');
    return this; // Chainable
  }
}

const instance: NewClass = new NewClass();
instance.on('event', (message: string): void => {
  console.log(`Message received: ${message}`);
});
instance.createEvent();
```

## API

### Contents

1. [Methods](#Methods)

    + [emitter.addListener](#emitter.addListener)

    + [emitter.emit](#emitter.emit)

    + [emitter.eventNames](#emitter.eventNames)

    + [emitter.getMaxListeners](#emitter.getMaxListeners)

    + [emitter.listenerCount](#emitter.listenerCount)

    + [emitter.listener](#emitter.listener)

    + [emitter.off](#emitter.off)

    + [emitter.on](#emitter.on)

    + [emitter.once](#emitter.once)

    + [emitter.prependListener](#emitter.prependListener)

    + [emitter.prependOnceListener](#emitter.prependOnceListener)

    + [emitter.removeAllListeners](#emitter.removeAllListeners)

    + [emitter.removeListener](#emitter.removeListener)

    + [emitter.setMaxListeners](#emitter.setMaxListeners)

    + [emitter.rawListeners](#emitter.rawListeners)

### Methods
#### emitter.addListener
##### ``emitter.addListener(eventName: string | symbol, listener: Function);``  
Alias for ``emitter.on(eventName, listener);``  

#### emitter.emit
##### ``emitter.emit(eventName: string | symbol);``  
Synchronously calls each of the listeners registered for the event named eventName, in the order they were registered, passing the supplied arguments to each. Returns true if the event had listeners, false otherwise.  

#### emitter.eventNames
##### ``emitter.eventNames();``  
Returns an array listing the events for which the emitter has registered listeners. The values in the array will be strings or symbols.

#### emitter.getMaxListeners
##### ``emitter.getMaxListeners()``  
Returns the current max listener value for the EventEmitter which is either set by ``emitter.setMaxListeners(n)`` or defaults to ``EventEmitter.defaultMaxListeners``.  

#### emitter.listenerCount
##### ``emitter.listenerCount(eventName: string | symbol)``  
Returns the number of listeners listening to the event named ``eventName``.

#### emitter.listener
##### ``emitter.listeners(eventName: string | symbol)``  
Returns a copy of the array of listeners for the event named eventName.

#### emitter.off
##### ``emitter.off(eventName: string | symbol, listener: Function)``  
Alias for ``emitter.removeListener()``.

#### emitter.on
##### ``emitter.on(eventName: string | symbol, listener: Function)``  
Adds the ``listener`` function to the end of the listeners array for the event named ``eventName``. No checks are made to see if the ``listener`` has already been added. Multiple calls passing the same combination of ``eventName`` and ``listener`` will result in the listener being added, and called, multiple times.


#### emitter.once
##### ``emitter.once(eventName: string | symbol, listener: Function)``  
Adds a **one-time** ``listener`` function for the event named ``eventName``. The next time eventName is triggered, this ``listener`` is removed and then invoked.

#### emitter.prependListener
##### ``emitter.prependListener(eventName: string | symbol, listener: Function)``
Adds the ``listener`` function to the _beginning_ of the listeners array for the event named ``eventName``. No checks are made to see if the ``listener`` has already been added. Multiple calls passing the same combination of ``eventName`` and ``listener`` will result in the ``listener`` being added, and called, multiple times.  

#### emitter.prependOnceListener
##### ``emitter.prependOnceListener(eventName: string | symbol, listener: Function)``  
Adds a **one-time** ``listener`` function for the event named ``eventName`` to the _beginning_ of the listeners array. The next time ``eventName`` is triggered, this listener is removed, and then invoked.

#### emitter.removeAllListeners
##### ``emitter.removeAllListeners(eventName?: string | symbol)``  
Removes all listeners, or those of the specified ``eventName``.

#### emitter.removeListener
##### ``emitter.removeListener(eventName: string | symbol, listener: Function)``
Removes the specified ``listener`` from the listener array for the event named ``eventName``.  

#### emitter.setMaxListeners
##### ``emitter.setMaxListeners(n)``  
By default EventEmitters will print a warning if more than ``10`` listeners are added for a particular event. This is a useful default that helps finding memory leaks. Obviously, not all events should be limited to just 10 listeners. The ``emitter.setMaxListeners()`` method allows the limit to be modified for this specific ``EventEmitter`` instance. The value can be set to ``Infinity`` (or ``0``) to indicate an unlimited number of listeners.

#### emitter.rawListeners
##### ``emitter.rawListeners(eventName: string | symbol)``  
Returns a copy of the array of listeners for the event named ``eventName``, including any wrappers (such as those created by ``.once()``).

## Dependancies

None!

## Permissions

None!

## Differences (between this and NodeJS version)

- No runtime type checks (Deno / TypeScript support compile time checks)
- Error handling may require some more work.
- Does not implemented deprecated methods

## Licensing

Licensed under the permissive MIT license. See [LICENCE file](https://github.com/ozjd/deno_event_emitter/blob/master/LICENSE) for more information

# Pull requests welcome!

# deno_event_emitter [![Build Status](https://travis-ci.org/ozjd/deno_event_emitter.svg?branch=master)](https://travis-ci.org/ozjd/deno_event_emitter)

A NodeJS-like EventEmitter for Deno written in 100% Typescript.

## Recommended Usage:

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

## Documentation

Documentation for the NodeJS implementation can be found at https://nodejs.org/api/events.html#events_class_eventemitter

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

# event_emitter [![Build Status](https://travis-ci.org/denolibs/event_emitter.svg?branch=master)](https://travis-ci.org/denolibs/event_emitter)

A NodeJS-like EventEmitter for Deno written in 100% Typescript.

## Usage

### Basic

```TypeScript
import EventEmitter from "https://deno.land/x/event_emitter/mod.ts";

const emitter = new EventEmitter();

emitter.on("SayHello", (to: string) => {
  if (!to) {
    console.log("hello!");
  } else {
    console.log("hello" + to + "!");
  }
});

emitter.emit("SayHello");
// hello!
emitter.emit("SayHello", " world");
// hello world!
emitter.emit("SayHello", ", again, world");
// hello, again, world!
```

### Extend EventEmitter Class

```TypeScript
import EventEmitter from 'https://deno.land/x/event_emitter/mod.ts';

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
// Message received: The createEvent() method was called
```

## Documentation

[API](https://github.com/denolibs/event_emitter/blob/master/docs/api.md)

## Dependencies

None!

## Permissions

None!

## Differences (between this and NodeJS version)

- No runtime type checks (Deno / TypeScript support compile time checks)
- Error handling may require some more work.
- Does not implement deprecated methods

## Licensing

Licensed under the permissive MIT license. See [LICENCE file](https://github.com/denolibs/event_emitter/blob/master/LICENSE) for more information

<sup>This project is based on the open source [DenoLibs](https://github.com/denolibs) / **[deno_template](https://github.com/denolibs/deno_template)** template.</sup>
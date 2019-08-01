/*
 * EventEmitter for Deno by OzJD <https://github.com/ozjd>
 * Documentation: https://nodejs.org/api/events.html#events_class_eventemitter
 *
 * Recommended Usage:
 * import EventEmitter from 'https://raw.github.com/ozjd/deno_EventEmitter/master/mod.ts';
 * class NewClass extends EventEmitter {
 *   constructor() {
 *     super();
 *   }
 * }
 */

class EventEmitter {
  public static defaultMaxListeners: number = 10;
  private maxListeners: number | undefined;
  private events: Map<string | symbol, Function[]>;

  public constructor() {
    this.events = new Map();
  }

  private _addListener(eventName: string | symbol, listener: Function, prepend: boolean): EventEmitter {
    this.emit('newListener', eventName, listener);
    if (this.events.has(eventName)) {
      const listeners = this.events.get(eventName) as Function[];
      if (prepend) {
        listeners.unshift(listener);
      } else {
        listeners.push(listener);
      }
    } else {
      this.events.set(eventName, [listener]);
    }
    const max = this.getMaxListeners();
    if (max > 0 && this.listenerCount(eventName) > max) {
      const warning = new Error(
        `Possible EventEmitter memory leak detected.
         ${this.listenerCount(eventName)} ${eventName.toString()} listeners.
         Use emitter.setMaxListeners() to increase limit`,
      );
      warning.name = 'MaxListenersExceededWarning';
      console.warn(warning);
    }

    return this;
  }

  public addListener(eventName: string | symbol, listener: Function): EventEmitter {
    return this._addListener(eventName, listener, false);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public emit(eventName: string | symbol, ...args: any[]): boolean {
    if (this.events.has(eventName)) {
      const listeners = (this.events.get(eventName) as Function[]).slice(); // We copy with slice() so array is not mutated during emit
      for (const listener of listeners) {
        try {
          listener.apply(this, args);
        } catch (err) {
          this.emit('error', err);
        }
      }
      return true;
    } else if (eventName === 'error') {
      const errMsg = args.length > 0 ? args[0] : Error('Unhandled error.');
      throw errMsg;
    }
    return false;
  }

  public eventNames(): [string | symbol] {
    return Array.from(this.events.keys()) as [string | symbol];
  }

  public getMaxListeners(): number {
    return this.maxListeners || EventEmitter.defaultMaxListeners;
  }

  public listenerCount(eventName: string | symbol): number {
    if (this.events.has(eventName)) {
      return (this.events.get(eventName) as Function[]).length;
    } else {
      return 0;
    }
  }

  public listeners(eventName: string | symbol): Function[] {
    // TODO: This method needs to be written. Feel free to create a pull request!
    return this.rawListeners(eventName);
  }

  public off(eventName: string | symbol, listener: Function): EventEmitter {
    return this.removeListener(eventName, listener);
  }

  public on(eventName: string | symbol, listener: Function): EventEmitter {
    return this.addListener(eventName, listener);
  }

  public once(eventName: string | symbol, listener: Function): EventEmitter {
    const wrapped: Function = this.onceWrap(eventName, listener);
    this.on(eventName, wrapped);
    return this;
  }

  // Wrapped function that calls EventEmitter.removeListener(eventName, self) on execution.
  private onceWrap(eventName: string | symbol, listener: Function): Function {
    const wrapper = function(
      this: { eventName: string | symbol; listener: Function; rawListener: Function; context: EventEmitter },
      ...args: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
    ): void {
      this.context.removeListener(this.eventName, this.rawListener);
      this.listener.apply(this.context, args);
    };
    const wrapperContext = { eventName: eventName, listener: listener, rawListener: wrapper, context: this };
    const wrapped = wrapper.bind(wrapperContext);
    wrapperContext.rawListener = wrapped;
    return wrapped;
  }

  public prependListener(eventName: string | symbol, listener: Function): EventEmitter {
    return this._addListener(eventName, listener, true);
  }

  public prependOnceListener(eventName: string | symbol, listener: Function): EventEmitter {
    const wrapped: Function = this.onceWrap(eventName, listener);
    this.prependListener(eventName, wrapped);
    return this;
  }

  public removeAllListeners(eventName: string | symbol): EventEmitter {
    if (this.events.has(eventName)) {
      const listeners = (this.events.get(eventName) as Function[]).slice(); // Create a copy; We use it AFTER it's deleted.
      this.events.delete(eventName);
      for (const listener of listeners) {
        this.emit('removeListener', eventName, listener);
      }
    }
    return this;
  }

  public removeListener(eventName: string | symbol, listener: Function): EventEmitter {
    if (this.events.has(eventName)) {
      const arr: Function[] = this.events.get(eventName) as Function[];
      if (arr.indexOf(listener) !== -1) {
        arr.splice(arr.indexOf(listener), 1);
        this.emit('removeListener', eventName, listener);
        if (arr.length === 0) {
          this.events.delete(eventName);
        }
      }
    }
    return this;
  }

  public setMaxListeners(n: number): EventEmitter {
    this.maxListeners = n;
    return this;
  }

  public rawListeners(eventName: string | symbol): Function[] {
    if (this.events.has(eventName)) {
      return this.events.get(eventName) as Function[];
    } else {
      return [];
    }
  }
}

export default EventEmitter;

// Copyright (c) 2019 Denolibs authors. All rights reserved. MIT license.

import { runIfMain, test } from "https://deno.land/std/testing/mod.ts";
import {
  assertEquals,
  assertNotEquals
} from "https://deno.land/std/testing/asserts.ts";
import EventEmitter from "../mod.ts";

function eventListener1(): void {
  console.log("First event occured!");
}

function eventListener2(): void {
  console.log("Second event occured!");
}

function eventListener3(): void {
  console.log("Third event occured!");
}

function eventListener4(): void {
  console.log("Fourth event occured!");
}

function StatusListener(code: number, msg: string): void {
  console.log(`Got ${code} and ${msg}`);
}

test({
  name: "Add listeners",
  fn(): void {
  const myEmitter = new EventEmitter();

  myEmitter.on("eventName", eventListener1);
  myEmitter.on("eventName", eventListener2);

  assertEquals(myEmitter.listenerCount("eventName"), 2);
  }
});

test({
  name: "Emit listeners of registered event",
  fn(): void {
    const myEmitter = new EventEmitter();

    myEmitter.on("eventName", eventListener1);
    myEmitter.on("eventName", eventListener2);
    myEmitter.on("eventName", eventListener3);
    assertEquals(myEmitter.emit("eventName"), true);
  }
});

test({
  name: "Emit with callback",
  fn(): void {
    const myEmitter = new EventEmitter();

    myEmitter.on("eventName", StatusListener);
    assertEquals(myEmitter.emit("eventName", 200, "OK"), true);
  }
});

test({
  name: "Emit listener once",
  fn(): void {
    const myEmitter = new EventEmitter();

    myEmitter.once("eventNameOnce", eventListener1);
    myEmitter.once("eventNameOnce", eventListener2);
    myEmitter.once("eventNameOnce", eventListener3);
    myEmitter.once("eventNameOnce", eventListener4);
    myEmitter.emit("eventNameOnce");
    assertEquals(myEmitter.listenerCount("eventNameOnce"), 0);
  }
});

test({
  name: "Emit unregistered event",
  fn(): void {
    const myEmitter = new EventEmitter();

    myEmitter.on("eventName", eventListener1);
    myEmitter.on("eventName", eventListener2);
    myEmitter.on("eventName", eventListener3);

    assertEquals(myEmitter.emit("eventNameNotRegistered"), false);
  }
});

test({
  name: "Get all listeners from eventname specified",
  fn(): void {
    const myEmitter = new EventEmitter();

    const eventListenersTrue: Function[] = [
      eventListener1,
      eventListener2,
      eventListener3,
      eventListener4
    ];

    const eventListenersFalse: Function[] = [
      eventListener4,
      eventListener3,
      eventListener2,
      eventListener1
    ];

    myEmitter.on("eventName1", eventListener1);
    myEmitter.on("eventName1", eventListener2);
    myEmitter.on("eventName1", eventListener3);
    myEmitter.on("eventName1", eventListener4);

    assertEquals(myEmitter.listeners("eventName1"), eventListenersTrue);
    assertNotEquals(myEmitter.listeners("eventName1"), eventListenersFalse);
  }
});

test({
  name: "Get default maximal listeners per event",
  fn(): void {
    const myEmitter = new EventEmitter();
    assertEquals(myEmitter.getMaxListeners(), 10);
  }
});

test({
  name: "Set maxListeners value",
  fn(): void {
    const myEmitter = new EventEmitter();
    assertEquals(myEmitter.setMaxListeners(5), myEmitter);
  }
});

test({
  name: "Get maxListeners value",
  fn(): void {
    const myEmitter = new EventEmitter();

    const maxListenersBefore = myEmitter.getMaxListeners();
    myEmitter.setMaxListeners(5);
    assertEquals(myEmitter.getMaxListeners(), 5);
    assertNotEquals(myEmitter.getMaxListeners(), maxListenersBefore);
  }
});

test({
  name: "Add listeners",
  fn(): void {
    const myEmitter = new EventEmitter();

    myEmitter.on("eventName", eventListener1);
    myEmitter.on("eventName", eventListener2);

    assertEquals(myEmitter.listenerCount("eventName"), 2);
  }
});

test({
  name: "Remove specific listener",
  fn(): void {
    const myEmitter = new EventEmitter();

    myEmitter.on("eventName", eventListener1);
    myEmitter.on("eventName", eventListener2);
    myEmitter.on("eventName", eventListener3);
    myEmitter.on("eventName", eventListener4);
    myEmitter.off("eventName", eventListener2);

    assertEquals(myEmitter.listeners("eventName"), [
      eventListener1,
      eventListener3,
      eventListener4
    ]);
  }
});

test({
  name: "Remove all listeners from specified event",
  fn(): void {
    const myEmitter = new EventEmitter();

    myEmitter.on("eventName1", eventListener1);
    myEmitter.on("eventName1", eventListener2);
    myEmitter.on("eventName2", eventListener3);
    myEmitter.on("eventName2", eventListener4);
    myEmitter.removeAllListeners("eventName1");
    assertEquals(myEmitter.emit("eventName1"), false);
    assertEquals(myEmitter.emit("eventName2"), true);
  }
});

test({
  name: "Remove specific once listener",
  fn(): void {
    const myEmitter = new EventEmitter();

    myEmitter.once("eventName", eventListener1);
    myEmitter.once("eventName", eventListener2);
    myEmitter.off("eventName", eventListener1);
    assertEquals(myEmitter.listeners("eventName"), [eventListener2]);
  }
});

test({
  name: "Remove all listeners from all events",
  fn(): void {
    const myEmitter = new EventEmitter();

    myEmitter.on("eventName1", eventListener1);
    myEmitter.on("eventName1", eventListener2);
    myEmitter.on("eventName2", eventListener3);
    myEmitter.on("eventName2", eventListener4);
    myEmitter.removeAllListeners();
    assertEquals(myEmitter.eventNames(), []);
  }
});

test({
  name: "Remove all listeners including once listeners from specified event",
  fn(): void {
    const myEmitter = new EventEmitter();

    myEmitter.on("eventName1", eventListener1);
    myEmitter.on("eventName1", eventListener2);
    myEmitter.once("eventName1", eventListener3);
    myEmitter.once("eventName1", eventListener4);
    myEmitter.removeAllListeners("eventName1");
    assertEquals(myEmitter.emit("eventName1"), false);
    assertEquals(myEmitter.listeners("eventName1"), []);
  }
})

runIfMain(import.meta, { parallel: true });

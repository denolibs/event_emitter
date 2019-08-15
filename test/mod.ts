// Copyright (c) 2019 Denolibs authors. All rights reserved. MIT license.

import { runTests, test } from "https://deno.land/std/testing/mod.ts";
import {
  assertEquals,
  assertNotEquals
} from "https://deno.land/std/testing/asserts.ts";
import EventEmitter from "../mod.ts";

function hasListenerProp(cur: any): boolean {
  return cur.hasOwnProperty("listener");
}

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

test(function registerListeners(): void {
  const myEmitter = new EventEmitter();

  myEmitter.on("eventName", eventListener1);
  myEmitter.on("eventName", eventListener2);

  assertEquals(myEmitter.listenerCount("eventName"), 2);
});

test(function removeListeners(): void {
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
});

test(function removeAllListenersFromSpecifiedEvent(): void {
  const myEmitter = new EventEmitter();

  myEmitter.on("eventName1", eventListener1);
  myEmitter.on("eventName1", eventListener2);
  myEmitter.on("eventName2", eventListener3);
  myEmitter.on("eventName2", eventListener4);
  myEmitter.removeAllListeners("eventName1");

  assertEquals(myEmitter.listenerCount("eventName1"), 0);
});

test(function removeAllListenersFromAllEvents(): void {
  const myEmitter = new EventEmitter();

  myEmitter.on("eventName1", eventListener1);
  myEmitter.on("eventName1", eventListener2);
  myEmitter.on("eventName2", eventListener3);
  myEmitter.on("eventName2", eventListener4);
  myEmitter.removeAllListeners();

  const eventNames = myEmitter.eventNames();
  let nListener = 0;
  for (let i = 0; i < eventNames.length; i++) {
    nListener += myEmitter.listenerCount(eventNames[i]);
  }

  assertEquals(nListener, 0);
});

test(function emitRegisteredEvent(): void {
  const myEmitter = new EventEmitter();

  myEmitter.on("eventName", eventListener1);
  myEmitter.on("eventName", eventListener2);
  myEmitter.on("eventName", eventListener3);

  assertEquals(myEmitter.emit("eventName"), true);
});

test(function emitWithCallbackParameters(): void {
  const myEmitter = new EventEmitter();

  myEmitter.on("eventName", StatusListener);

  assertEquals(myEmitter.emit("eventName", 200, "OK"), true);
});

test(function emitOnce(): void {
  const myEmitter = new EventEmitter();

  myEmitter.once("eventNameOnce", eventListener1);
  myEmitter.once("eventNameOnce", eventListener2);
  myEmitter.once("eventNameOnce", eventListener3);
  myEmitter.once("eventNameOnce", eventListener4);
  myEmitter.emit("eventNameOnce");

  assertEquals(myEmitter.listenerCount("eventNameOnce"), 0);
});

test(function emitUnRegisteredEvent(): void {
  const myEmitter = new EventEmitter();

  myEmitter.on("eventName", eventListener1);
  myEmitter.on("eventName", eventListener2);
  myEmitter.on("eventName", eventListener3);

  assertEquals(myEmitter.emit("eventNameNotRegistered"), false);
});

test(function getListenersOfEventName(): void {
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
});

test(function listenerAccessOnRawListeners(): void {
  const myEmitter = new EventEmitter();
  myEmitter.once("eventNameOnce", eventListener1);
  myEmitter.once("eventNameOnce", eventListener2);
  myEmitter.once("eventNameOnce", eventListener3);
  myEmitter.once("eventNameOnce", eventListener4);
  const listOfListeners: Function[] = myEmitter.rawListeners("eventNameOnce");
  assertEquals(listOfListeners.every(hasListenerProp), true);
});

test(function getDefaultMaxListeners(): void {
  const myEmitter = new EventEmitter();
  assertEquals(myEmitter.getMaxListeners(), 10);
});

test(function setMaxListeners(): void {
  const myEmitter = new EventEmitter();
  assertEquals(myEmitter.setMaxListeners(5), myEmitter);
});

test(function getMaxListeners(): void {
  const myEmitter = new EventEmitter();

  const maxListenersBefore = myEmitter.getMaxListeners();
  myEmitter.setMaxListeners(5);
  assertEquals(myEmitter.getMaxListeners(), 5);
  assertNotEquals(myEmitter.getMaxListeners(), maxListenersBefore);
});

runTests();

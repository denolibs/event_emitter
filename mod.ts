// Copyright (c) 2019 Denolibs authors. All rights reserved. MIT license.

// Re-export default export
import Default from "./lib/mod.ts";
export default Default;

// Re-export all other exports
export * from "./lib/mod.ts";

// Execute
import "./lib/mod.ts";

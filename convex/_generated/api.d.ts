/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as affiliates from "../affiliates.js";
import type * as blog from "../blog.js";
import type * as bulkUpload from "../bulkUpload.js";
import type * as cms from "../cms.js";
import type * as functions from "../functions.js";
import type * as helpers from "../helpers.js";
import type * as ingestion from "../ingestion.js";
import type * as knowledgeBase from "../knowledgeBase.js";
import type * as newTables from "../newTables.js";
import type * as permissions from "../permissions.js";
import type * as seed from "../seed.js";
import type * as seedDemo from "../seedDemo.js";
import type * as seeding from "../seeding.js";
import type * as settings from "../settings.js";
import type * as store from "../store.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  affiliates: typeof affiliates;
  blog: typeof blog;
  bulkUpload: typeof bulkUpload;
  cms: typeof cms;
  functions: typeof functions;
  helpers: typeof helpers;
  ingestion: typeof ingestion;
  knowledgeBase: typeof knowledgeBase;
  newTables: typeof newTables;
  permissions: typeof permissions;
  seed: typeof seed;
  seedDemo: typeof seedDemo;
  seeding: typeof seeding;
  settings: typeof settings;
  store: typeof store;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};

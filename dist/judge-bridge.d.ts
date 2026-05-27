import type { LlmCaller } from "@mint/engine";
import type { MintApi } from "./api-client";
/**
 * Wraps our API's judge endpoint into the engine's LlmCaller interface.
 * The engine calls llm with {system, prompt, jsonOnly?, maxTokens?} and expects
 * back {text, inputTokens, outputTokens}.
 */
export declare function makeJudgeBridge(api: MintApi, runId: string): LlmCaller;

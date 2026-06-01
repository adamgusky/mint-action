import type { AgentCaller } from "@mint/browser";
import type { MintApi } from "./api-client";
/**
 * Wraps our API's agent-turn endpoint into the AgentCaller interface the
 * browser-side agent loop expects. Each call forwards a full Anthropic-style
 * conversation (system + messages + tools) and returns the assistant's
 * response (text and/or tool_use blocks) verbatim so the agent can dispatch
 * tools locally and resume.
 */
export declare function makeAgentBridge(api: MintApi, runId: string): AgentCaller;

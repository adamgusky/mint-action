export interface Mission {
    id: string;
    flowName: string;
    changedFeature: string;
    selectedFlows: Array<{
        flowId: string;
    }>;
    persona: string;
    requiredState: string[];
    assertions: string[];
    riskLevel: "low" | "medium" | "high";
    browserTestable: boolean;
    reason: string;
    prNumber?: number;
}
export interface StepEvent {
    index: number;
    type: string;
    intent: string;
    status: string;
    screenshotUrl?: string;
    durationMs?: number;
}
export interface CompleteInput {
    status: string;
    evidence: string[];
    consoleErrors: string[];
    networkErrors: string[];
    suggestedFix?: string;
    videoUrl?: string;
    previewUrl?: string;
    /** Tool-by-tool trace from the agent loop. Persisted so future runs of the
     *  same intent can replay it deterministically instead of re-exploring. */
    agentTrace?: Array<{
        tool: string;
        input: Record<string, unknown>;
        ok: boolean;
        result: string;
    }>;
    /** count_check observations from the agent. The comment renderer compares
     *  these against the brief's userStatedQuantities to surface intent vs
     *  reality divergence. */
    quantitativeObservations?: Array<{
        text: string;
        rowScopeCount: number;
        pageScopeCount: number;
        atStep: number;
    }>;
    /** Per-assertion outcome with DOM evidence. Surfaces what was
     *  actually confirmed (vs the freeform narrative summary) so
     *  partial_verified runs can report concrete wins instead of
     *  "blocked, sorry." */
    verifiedAssertions?: Array<{
        intent: string;
        elementId?: string;
        evidenceStepIndex?: number;
        result: "ok" | "missing" | "ambiguous" | "blocked";
        notes?: string;
    }>;
    /** Customer-actionable next steps. Attached on partial_verified /
     *  upstream_blocked / agent_stuck / code_not_present so the comment
     *  isn't just a dead-end status badge. */
    recommendations?: Array<{
        kind: "manual_verify" | "enable_upstream" | "fix_setup" | "rewrite_flow" | "fix_workflow" | "investigate";
        summary: string;
        link?: string;
        details?: string;
    }>;
    /** Third-party API failures detected during the run. Drives the
     *  upstream_blocked verdict path — your code isn't the problem. */
    upstreamSignals?: Array<{
        name: string;
        url: string;
        status: number;
        excerpt?: string;
    }>;
    /** Provenance — surfaced at the top of every comment so a reviewer
     *  can tell at a glance which commit was actually tested. */
    testedSha?: string;
    testedRef?: string;
    workflowSourceSha?: string;
    /** Best-effort run cost in USD. Lets customers reason about LLM spend. */
    estimatedCostUsd?: number;
}
export declare class MintApi {
    private base;
    private key;
    constructor(base: string, key: string);
    private request;
    getMission(id: string): Promise<Mission>;
    postStep(id: string, body: StepEvent): Promise<{
        ok: true;
    }>;
    postComplete(id: string, body: CompleteInput): Promise<{
        ok: true;
    }>;
    postJudge(id: string, ask: unknown): Promise<unknown>;
    postAgentTurn(id: string, body: unknown): Promise<{
        stopReason: string;
        content: Array<Record<string, unknown>>;
        usage: {
            inputTokens: number;
            outputTokens: number;
        };
    }>;
    syncFlows(repoId: string, flows: unknown[]): Promise<{
        synced: number;
    }>;
}

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
    syncFlows(repoId: string, flows: unknown[]): Promise<{
        synced: number;
    }>;
}

import { runSetupCommands, type MintConfig, type Persona } from "@mint/engine";
import { type CompleteInput } from "./api-client";
/** Resolve the persona the mission targets. The mission carries the persona
 *  id as a string; the actual {@link Persona} record (email/password/etc) lives
 *  on `config.auth.personas[id]`. Falls back to the first configured persona
 *  if the mission's named persona doesn't exist — the validateHarness path
 *  uses the same fallback for consistency. Returns null when the config has
 *  no personas at all (auth.method = "none"); the action should skip setup
 *  commands entirely in that case. */
export declare function resolveActivePersona(mission: {
    persona?: string;
}, config: MintConfig): {
    personaId: string;
    persona: Persona;
} | null;
/** Bridge surface used by {@link executeSetupCommandsOrComplete} to post
 *  a `setup_failed` verdict without taking a hard dependency on the full
 *  {@link MintApi} class — keeps the helper trivially mockable in tests. */
export type SetupCompleteSink = {
    postComplete(id: string, body: CompleteInput): Promise<{
        ok: true;
    }>;
};
/** Runner abstraction (defaulted) so tests can inject a fake instead of
 *  shelling out and spinning up real seed scripts. */
export type SetupDeps = {
    runSetup: typeof runSetupCommands;
    logger: {
        info: (msg: string) => void;
        error: (msg: string) => void;
        setFailed: (msg: string) => void;
    };
};
/** Provenance triple captured once at the top of run(). Threaded into every
 *  postComplete call (preflight-fail, setup-fail, happy-path) so the
 *  reviewer-facing "Tested: abc1234" line is consistent across verdicts. */
export type Provenance = {
    testedSha?: string;
    testedRef?: string;
    workflowSourceSha?: string;
};
/** Capture the provenance triple from the runner environment. Pure-ish
 *  (depends on env + an injected git resolver) so tests can pin the priority
 *  rules: GITHUB_SHA wins, falls back to `git rev-parse HEAD`, then "".
 *  GITHUB_HEAD_REF (set on pull_request triggers) wins over GITHUB_REF_NAME
 *  (set on push). GITHUB_WORKFLOW_SHA defaults to testedSha when absent —
 *  the case where workflow ref != head ref is rare and usually
 *  workflow_dispatch-only. */
export declare function captureProvenance(env: NodeJS.ProcessEnv, getGitHeadSha?: () => string | undefined): Provenance;
/** Run the customer's setup commands for the active persona. Returns
 *  `{ ok: true }` when setup succeeded (or was correctly skipped because
 *  there's no persona) and the action should proceed to the browser, OR
 *  `{ ok: false }` when something REQUIRED failed and the action MUST stop.
 *
 *  On failure, a `setup_failed` verdict is posted to the run with structured
 *  evidence + recommendations. The caller should return from `run()` rather
 *  than continuing to the browser. */
export declare function executeSetupCommandsOrComplete(input: {
    api: SetupCompleteSink;
    missionId: string;
    mission: {
        persona?: string;
    };
    config: MintConfig;
    runId: string;
    cwd?: string;
    /** Optional provenance — threaded into the setup_failed verdict so the
     *  comment renderer can show which commit failed setup. */
    provenance?: Provenance;
    deps?: Partial<SetupDeps>;
}): Promise<{
    ok: boolean;
}>;

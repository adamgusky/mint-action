/**
 * The slice of mission metadata we care about for SHA verification. Marked
 * `_mintMeta` on the wire because it's server-injected — not part of the
 * customer-authored mission body.
 */
export interface MissionMintMeta {
    prSha?: string;
    prNumber?: number;
    baseRef?: string;
}
/**
 * Dependencies factored out so the assertion is unit-testable without
 * touching real git or the GitHub Actions runtime. Production callers
 * accept the defaults; tests inject fakes.
 */
export interface AssertShaDeps {
    /** Returns the current runner HEAD SHA. Defaults to `git rev-parse HEAD`. */
    readonly getHeadSha?: () => string;
    /** Surface for non-fatal notes. Defaults to `@actions/core`. */
    readonly logger?: {
        info: (msg: string) => void;
        warning: (msg: string) => void;
    };
}
/**
 * Verify the runner is sitting on the PR head, not the workflow's baseRef.
 *
 * The Mint server bundles `_mintMeta.prSha` into every mission dispatched
 * from a pull request. A workflow that doesn't explicitly check out that
 * SHA stays on whatever ref `actions/checkout@v4` defaulted to — which for
 * `workflow_dispatch` events is the base branch (typically `main`), not
 * the PR head. The agent then dutifully reviews the base branch, reports
 * "the new tab isn't there," and the customer wastes a cycle debugging
 * code that never ran.
 *
 * This guard catches that misconfiguration before a single browser tool
 * call burns: it compares the current runner HEAD against the expected
 * prSha and throws an explicit fix-it error if they diverge.
 *
 * Missions without `_mintMeta.prSha` (local CLI runs, manual replays,
 * non-PR dispatches) are left alone — there's nothing to verify against.
 *
 * @throws Error when the runner HEAD doesn't match the expected prSha.
 *         Action.yml's `core.setFailed` path picks this up and stops the
 *         workflow before any browser work runs.
 */
export declare function assertRunningOnExpectedSha(mission: unknown, deps?: AssertShaDeps): void;
/**
 * Multi-line, paste-friendly error body. Exported for tests so we can pin
 * the exact wording — this message is the primary debugging surface a
 * customer sees when they hit this guard, so wording regressions matter.
 */
export declare function formatShaMismatchError(expectedSha: string, actualSha: string, meta: MissionMintMeta | undefined): string;

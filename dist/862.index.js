"use strict";
exports.id = 862;
exports.ids = [862];
exports.modules = {

/***/ 1862:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isLocked: () => (/* binding */ isLocked),
/* harmony export */   lockCriterion: () => (/* binding */ lockCriterion)
/* harmony export */ });
/* unused harmony exports lockedIndices, clearLocks */
/**
 * Shared registry of criteria the agent CAN'T attest as passed after the
 * fact (S1 risk #5).
 *
 * Why we need it: `wait_for_progress` is the agent's primary way to verify
 * an async action actually landed (form submit → server response → UI
 * update). When that wait TIMES OUT, the action didn't land in the time
 * we gave it — the page either never updated or updated to a different
 * state than the agent expected. If we then let the agent call
 * `complete(passed)` with a `criteria_evidence` attestation (the escape
 * valve that lets the agent quote a peek snippet to satisfy a missed
 * criterion), it can fabricate verbatim quotes from any prior peek and
 * claim victory.
 *
 * The lock is per-run and per-criterion-index. Phase G owns the
 * `complete()` handler that consults this registry; we own the
 * `wait_for_progress` handler that writes to it. Sharing this module is
 * what keeps the two phases decoupled without one importing the other.
 *
 * Storage is in-process state (Map keyed by runId) — the agent loop runs
 * inside a single Node process per run and we don't need to persist locks
 * across crashes. If the loop crashes mid-run, the whole verdict is
 * blocked anyway and the locks become moot.
 */
const LOCKS = new Map();
/** Mark the given (0-based) criterion index as locked for this run. Idempotent. */
function lockCriterion(runId, criterionIdx) {
    if (!runId || !Number.isInteger(criterionIdx) || criterionIdx < 0)
        return;
    let set = LOCKS.get(runId);
    if (!set) {
        set = new Set();
        LOCKS.set(runId, set);
    }
    set.add(criterionIdx);
}
/** Is this criterion locked? Phase G's complete() handler queries this. */
function isLocked(runId, criterionIdx) {
    return LOCKS.get(runId)?.has(criterionIdx) ?? false;
}
/** Returns the locked indices for a run (or empty array). Useful for
 *  rendering "these criteria can't be attested" hints in the refusal
 *  message Phase G builds. */
function lockedIndices(runId) {
    const set = LOCKS.get(runId);
    return set ? Array.from(set).sort((a, b) => a - b) : [];
}
/** Test/admin helper — wipe all locks for a run. Production code should
 *  not call this. */
function clearLocks(runId) {
    LOCKS.delete(runId);
}


/***/ })

};
;
//# sourceMappingURL=862.index.js.map
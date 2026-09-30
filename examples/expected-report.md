# Expected report excerpt

## Overall verdict

ready-with-changes — all three current profiles require repair or completion, but each incompatibility has a requirement-preserving path.

## Profile findings

| Profile | Gate | Severity | Evidence | Impact | Required change |
| --- | --- | --- | --- | --- | --- |
| account-search | endpoint/tools | required | supplied: function tool on Chat Completions | tool calling violates the snapshot | move request and parsing to Responses; retain the tool |
| policy-summary | reasoning | required | supplied: minimal | unsupported effort | use low, then evaluate quality |
| case-analysis | residency/processing | required | supplied: EU plus Fast | unsupported combination | retain EU residency and use Standard |
| case-analysis | cost | warning | unknown: cache-write tokens | exact total unavailable | collect cache-write usage |

The case-analysis cost is a known subtotal plus W / 1,000,000 × the cache-write rate. W must not be assumed to be zero.

## Validation plan

Run repaired profiles in non-production, attach request/response metadata and billing usage, stop on unsupported-parameter, tool, residency or budget failures, and roll back to the prior model route.

> This audit is advisory. No API request, model configuration, traffic allocation, residency setting, or budget was changed.

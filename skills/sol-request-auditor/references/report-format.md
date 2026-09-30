# Report format

Use the following section order.

## Overall verdict

State ready, ready-with-changes or blocked. Give one sentence naming the highest-precedence reason.

## Contract snapshot

Record model ID, effective date, source/owner, endpoint/tool rule, reasoning efforts, token limits, pricing threshold and residency/processing rule. Label unsupported or missing facts unknown.

## Required behavior

List the non-negotiable requirement for each profile.

## Profile findings

Use a table with these columns:

| Profile | Gate | Severity | Evidence | Impact | Required change |
| --- | --- | --- | --- | --- | --- |

The severity, evidence and required change fields are mandatory. Include pass rows when they help show that every gate was evaluated.

## Cost worksheet

For every profile, show rate selection, each token-class formula and either an exact total or known subtotal plus symbolic remainder. Then show a correctly labelled portfolio view.

## Repair plan

Order repairs by blocker, required and warning. Preserve stated requirements.

## Validation plan

For each repaired profile, specify owner, non-production test, pass condition, failure signal, evidence and rollback or stop action. Make clear that the plan has not been run.

## Unresolved inputs

List every unknown that prevents an exact compatibility or cost result. Write none only when there are no unknowns.

## Boundary

End the report with exactly:

> This audit is advisory. No API request, model configuration, traffic allocation, residency setting, or budget was changed.

# Audit rules

Use this reference after inventorying profiles. The model contract is an input, not a timeless fact: identify its source or owner and effective date in the report.

## Evidence classes

| Class | Meaning |
| --- | --- |
| supplied | Stated directly in the request profile or confirmed contract snapshot |
| derived | Arithmetic or logical consequence shown from supplied values |
| assumed | Working choice that needs owner confirmation |
| unknown | Required value is absent and must not be guessed |

## Compatibility gates

Evaluate compatibility before cost and in this order.

1. **Identity:** the requested model matches the contract snapshot.
2. **Endpoint and tools:** GPT-6.1 Sol tool calling uses the Responses API. Chat Completions is acceptable only for tool-free requests.
3. **Reasoning:** supported efforts are low, medium, high, xhigh and max. None and minimal are incompatible. Preserve the endpoint-specific parameter shape.
4. **Capacity:** compare total request input against the 1,050,000 context window and requested output against 128,000. If any component needed for the total is unknown, mark the capacity result unverified.
5. **Residency and processing:** EU data residency cannot use Fast mode. Preserve required residency and change the processing tier unless the requirement owner approves a different tradeoff.

Record each finding as:

| profile | gate | severity | evidence class and evidence | impact | required change |
| --- | --- | --- | --- | --- | --- |

Severity values:

- blocker: no compatible repair is known without violating a stated requirement;
- required: a compatible repair is known but the current request would violate the contract;
- warning: compatible, but evidence or measurement is incomplete;
- pass: compatible under the supplied snapshot.

## Cost calculation

Treat uncached input, cached input, cache writes and output as separate token classes when the packet defines them that way.

For each known class:

cost = tokens / 1,000,000 × applicable price per 1M tokens

Select the pricing band from the contract. If the request crosses the 272,000 input-token threshold, apply long-context prices to every token class for the full request.

When a priced token class is unknown:

- If a value is unknown, do not treat it as zero.
- calculate every known component;
- label the sum known subtotal, not total;
- express the missing amount symbolically, such as W / 1,000,000 × cache-write price;
- if token counts cannot be negative, the known subtotal is a lower bound;
- do not turn unknown into zero and do not invent an upper bound.

Portfolio totals may combine complete totals and known subtotals only when the label remains known subtotal and every symbolic remainder is retained.

## Verdict precedence

Apply these rules after all profile findings:

1. blocked: at least one blocker exists.
2. ready-with-changes: no blocker exists, but at least one required change or unverified required gate remains.
3. ready: every required gate passes and no required change remains.

Warnings never upgrade an incompatible request. Favorable cost never overrides a compatibility or residency failure.

## Repair and validation

A repair must preserve stated required behavior. For example, move a tool-using request to Responses rather than removing its tool, and move an EU-resident request off Fast rather than silently dropping residency.

For each repair, state:

- owner;
- configuration change;
- non-production validation input;
- pass condition;
- failure signal;
- rollback or stop action;
- evidence to attach.

Never describe a proposed validation as completed. A static audit does not establish live availability, latency, quality, account access, regional routing or billing.

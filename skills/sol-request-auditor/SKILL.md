---
name: sol-request-auditor
description: Use when reviewing or planning GPT-6.1 Sol API migrations, especially requests with tools, reasoning settings, long context, processing tiers, data residency, or incomplete token usage.
---

# Sol Request Auditor

Turn request profiles and a dated GPT-6.1 Sol contract snapshot into a compatibility report before any configuration or traffic changes.

## Inputs

Ask for or extract:

- endpoint and model ID;
- tool declarations and required behavior;
- reasoning effort and parameter shape;
- input, cached-input, cache-write and output tokens;
- processing tier and residency;
- context/output limits and prices from a dated trusted snapshot.

Mark an absent value unknown. Do not infer a missing token class, supported mode, price or live-test result.

## Workflow

1. Copy supplied contract facts into a dated snapshot. Separate confirmed facts from assumptions.
2. Inventory every request profile and its non-negotiable requirements.
3. Read references/audit-rules.md. Apply compatibility gates before cost:
   - model ID and endpoint;
   - tool calling;
   - reasoning effort;
   - context and output limits;
   - processing tier and data residency.
4. Price each token class separately. When input exceeds 272,000 tokens, apply long-context prices to the full request. If a priced class is unknown, report a known subtotal and symbolic remainder; do not treat unknown as zero.
5. Assign every finding a severity, evidence, impact and required change. Preserve requirements instead of deleting a tool or residency constraint to make a request appear compatible.
6. Determine the overall verdict using the precedence rules. Do not let low cost override a compatibility failure.
7. Format the result with references/report-format.md. Include concrete validation gates and end with its exact advisory boundary.

## Output quality

- Cover every profile exactly once in the finding table.
- Show arithmetic and units.
- Distinguish supplied evidence, derived calculations, assumptions and unresolved inputs.
- Describe proposed repairs as future actions. Never claim an API call, configuration change or rollout occurred unless independently evidenced.

This Skill performs document analysis only. It does not call the OpenAI API or change application settings.

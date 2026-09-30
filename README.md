# Sol Request Auditor

[中文说明](README.zh-CN.md)

Sol Request Auditor is a reusable Skill for reviewing GPT-6.1 Sol request profiles before a migration. It turns a dated model-contract snapshot and representative request settings into an evidence-linked compatibility report, exact or bounded cost worksheet, repair plan and non-production validation plan.

It is designed for API owners, platform teams and reviewers who need to preserve tool behavior, residency requirements and budget evidence while changing models.

## Who it is for

- API owners migrating existing workloads to GPT-6.1 Sol.
- Platform teams reviewing shared request builders and routing policies.
- FinOps reviewers checking token-class arithmetic and long-context pricing.
- Governance reviewers who need a traceable record of assumptions, unknowns and proposed changes.

## Use cases

- Detect tool calls left on Chat Completions when Responses is required.
- Find unsupported reasoning efforts or incorrect parameter shapes.
- Check context and output limits without hiding unknown token fields.
- Detect incompatible processing and data-residency combinations.
- Estimate one-request and portfolio cost without treating missing usage as zero.

## Features

- A fixed compatibility-gate order: identity, endpoint/tools, reasoning, capacity, then residency/processing.
- Four evidence classes: supplied, derived, assumed and unknown.
- Finding rows with severity, evidence, impact and required change.
- Short- and long-context cost worksheets with symbolic remainders.
- Verdict precedence that prevents favorable cost from overriding incompatibility.
- Repair and validation plans that preserve stated requirements.
- An exact advisory boundary separating analysis from executed changes.

## Workflow

1. Supply representative request profiles and a dated GPT-6.1 Sol contract snapshot.
2. State behavior that must be preserved, such as tools, Chat Completions or EU residency.
3. Ask the agent to use Sol Request Auditor.
4. Review the contract snapshot and profile inventory in the generated report.
5. Resolve required findings and collect missing usage.
6. Run the proposed non-production checks outside this Skill and attach real evidence.
7. Re-audit the repaired profiles before changing production traffic.

## Requirements

- [iPolloWork](https://github.com/Devin-AXIS/iPolloWork) 0.50.12 or later for the packaged installation tested here.
- A local project using the OpenCode engine.
- Request profiles and a trusted, dated model-contract snapshot.
- No API key or OpenAI connection is required: the Skill does not call an API.

Upstream model contracts and prices can change. Refresh the snapshot before each decision.

## Inputs and outputs

Inputs:

- model ID, endpoint and tools;
- reasoning effort and parameter shape;
- token usage by class;
- processing tier and data residency;
- context/output limits and prices;
- non-negotiable requirements.

Outputs:

- overall verdict: ready, ready-with-changes or blocked;
- contract snapshot and required-behavior ledger;
- evidence-linked profile findings;
- exact totals or bounded known subtotals;
- repair, validation and unresolved-input sections.

## End-to-end example

The example packet includes:

- account-search: Chat Completions plus a required function tool;
- policy-summary: tool-free Chat Completions with minimal reasoning;
- case-analysis: Responses, long context, unknown cache-write usage, Fast processing and required EU residency.

Invoke:

> Use Sol Request Auditor to audit examples/migration-packet.md. Preserve every stated requirement, show cost arithmetic, and do not claim live testing.

Expected result: ready-with-changes. The report moves account-search to Responses while retaining its tool, changes policy-summary from minimal to a supported effort, retains EU residency while moving case-analysis off Fast, and reports the unknown cache-write cost as a symbolic remainder. See [expected-report.md](examples/expected-report.md).

## Use in iPolloWork

1. Download sol-request-auditor-1.0.0.ipollowork-plugin from the GitHub Release.
2. Open iPolloWork and select **Extensions → Plugins → Add → File**.
3. Choose the downloaded file. Confirm publisher Sevaschan, version 1.0.0 and one Skill resource.
4. Install the plugin and verify **Sol Request Auditor** is enabled.
5. Open a local project, attach or paste a migration packet, and explicitly ask the agent to use Sol Request Auditor.
6. Confirm the run loads SKILL.md, audit-rules.md and report-format.md.
7. Export or save the generated Markdown report with the migration evidence.

For standalone Skill import, unzip sol-request-auditor-1.0.0-skill.zip and select the contained sol-request-auditor folder from the local Skill import screen.

## Build and package

Node.js 22 and the standard zip/unzip commands are sufficient:

~~~sh
npm test
npm run package
cd dist
shasum -a 256 -c SHA256SUMS.txt
~~~

The build creates an iPolloWork installer, standalone Skill ZIP, source ZIP and checksum manifest. The installer contains one schemaVersion 2 manifest and the complete Skill directory.

## FAQ

### Does it call GPT-6.1 Sol?

No. It audits supplied configuration and evidence. Live availability, quality, latency, regional routing and billing require separate non-production tests.

### Can it use current prices from memory?

No. Supply a dated trusted contract snapshot. Unknown or stale values remain explicit.

### Why is a cost sometimes a subtotal?

If any priced token class is unknown, an exact total would be fabricated. The report keeps the known subtotal and a symbolic remainder.

### Can I keep Fast mode by dropping EU residency?

Only if the requirement owner explicitly changes the residency requirement. The default repair preserves non-negotiable behavior.

## Validation

Version 1.0.0 was imported, enabled and invoked in iPolloWork 0.50.20 on macOS arm64 with the OpenCode engine. The acceptance run loaded both references and produced the expected verdict, compatibility findings, bounded cost treatment, repair plan and exact advisory ending. See [desktop acceptance](docs/desktop-acceptance.md).

Validated scope: declarative package import, Skill discovery, reference loading and one supplied-packet audit. Live OpenAI API requests, production routing, regional enforcement, account eligibility, latency, quality and billing were not tested.

## License

MIT

# Scenario: Deterministic migration audit

- Given: request profiles and a confirmed GPT-6.1 Sol contract snapshot
- When: the Skill evaluates compatibility and cost
- Then: every profile receives evidence-linked findings, bounded arithmetic and a precedence-based verdict

## Test Steps

- Case 1: identify endpoint, reasoning, residency and processing incompatibilities
- Case 2: use long-context pricing for the full request and preserve unknown priced fields as unknown

## Status

- [x] Write scenario document
- [x] Write solid test according to document
- [x] Run test and watch it failing
- [x] Implement to make test pass
- [x] Run test and confirm it passed
- [x] Refactor implementation without breaking test
- [x] Run test and confirm still passing after refactor

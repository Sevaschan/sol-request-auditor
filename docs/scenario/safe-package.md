# Scenario: Safe iPolloWork package

- Given: a pure Skill intended for ordinary file import
- When: the manifest and archive are inspected
- Then: one full Skill directory is declared and no privileged capability is present

## Test Steps

- Case 1: validate schema, identity, compatibility and Skill path
- Case 2: reject trusted source, permissions, authorization, local service, engine binding or process MCP fields

## Status

- [x] Write scenario document
- [x] Write solid test according to document
- [x] Run test and watch it failing
- [x] Implement to make test pass
- [x] Run test and confirm it passed
- [x] Refactor implementation without breaking test
- [x] Run test and confirm still passing after refactor

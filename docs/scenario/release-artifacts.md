# Scenario: Immutable release artifacts

- Given: a versioned project ready for distribution
- When: the package script runs
- Then: installer, standalone Skill, source archive and checksums are reproducible and structurally valid

## Test Steps

- Case 1: inspect archive roots, required files and exclusion of development data
- Case 2: verify SHA-256 values and archive size/file-count limits

## Status

- [x] Write scenario document
- [x] Write solid test according to document
- [x] Run test and watch it failing
- [x] Implement to make test pass
- [x] Run test and confirm it passed
- [x] Refactor implementation without breaking test
- [x] Run test and confirm still passing after refactor

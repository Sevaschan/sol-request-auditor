import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const manifest = JSON.parse(fs.readFileSync("ipollowork.plugin.json", "utf8"));

test("manifest declares one complete Skill for iPolloWork 0.50.12", () => {
  assert.equal(manifest.schemaVersion, 2);
  assert.equal(manifest.id, "sol-request-auditor");
  assert.equal(manifest.package.version, "1.0.0");
  assert.equal(manifest.package.publisher.id, "sevaschan");
  assert.equal(manifest.package.publisher.name, "Sevaschan");
  assert.equal(manifest.package.updateId, "sevaschan/sol-request-auditor");
  assert.equal(manifest.package.compatibility.ipollowork, ">=0.50.12");
  assert.deepEqual(manifest.resources, [{
    type: "skill",
    id: "sol-request-auditor",
    label: "Sol Request Auditor",
    path: "skills/sol-request-auditor",
    required: true
  }]);
});

test("manifest is an untrusted declarative package without privileged fields", () => {
  assert.equal(manifest.source.trusted, false);
  for (const field of ["permissions", "authorization", "engineBindings"]) {
    assert.equal(Object.hasOwn(manifest, field), false);
  }
  assert.equal(manifest.resources.some(resource =>
    ["local-service", "native", "ui", "mcp"].includes(resource.type)
  ), false);
});

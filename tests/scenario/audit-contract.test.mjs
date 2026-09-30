import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const skill = fs.readFileSync("skills/sol-request-auditor/SKILL.md", "utf8");
const rules = fs.readFileSync("skills/sol-request-auditor/references/audit-rules.md", "utf8");
const format = fs.readFileSync("skills/sol-request-auditor/references/report-format.md", "utf8");

test("Skill routes every compatibility gate before cost and verdict", () => {
  for (const term of [
    "Responses API", "Chat Completions", "tool calling", "reasoning",
    "272,000", "long-context", "EU data residency", "Fast mode",
    "known subtotal", "ready-with-changes", "blocked"
  ]) {
    assert.match(skill + rules, new RegExp(term.replace(/[.*+?^$()|[\]{}]/g, "\\$&"), "i"));
  }
  assert.match(rules, /compatibility.*before.*cost/i);
  assert.match(rules, /unknown.*do not.*zero/i);
});

test("report contract is auditable and preserves the non-action boundary", () => {
  for (const heading of [
    "Overall verdict", "Contract snapshot", "Profile findings",
    "Cost worksheet", "Repair plan", "Validation plan", "Unresolved inputs"
  ]) {
    assert.match(format, new RegExp(heading, "i"));
  }
  assert.match(format, /severity.*evidence.*required change/i);
  assert.match(format, /This audit is advisory\. No API request, model configuration, traffic allocation, residency setting, or budget was changed\./);
});

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import test from "node:test";

const dist = "dist";
const plugin = dist + "/sol-request-auditor-1.0.0.ipollowork-plugin";
const skillZip = dist + "/sol-request-auditor-1.0.0-skill.zip";
const sourceZip = dist + "/sol-request-auditor-1.0.0-source.zip";

test("release archives have the required roots and files", () => {
  for (const file of [plugin, skillZip, sourceZip]) assert.equal(fs.existsSync(file), true);
  const pluginEntries = execFileSync("unzip", ["-Z1", plugin], { encoding: "utf8" }).trim().split("\n");
  assert.deepEqual(pluginEntries.filter(path => path.endsWith("ipollowork.plugin.json")), ["ipollowork.plugin.json"]);
  assert(pluginEntries.includes("skills/sol-request-auditor/SKILL.md"));
  assert(pluginEntries.includes("skills/sol-request-auditor/references/audit-rules.md"));
  assert(pluginEntries.includes("skills/sol-request-auditor/references/report-format.md"));
  const skillEntries = execFileSync("unzip", ["-Z1", skillZip], { encoding: "utf8" });
  assert.match(skillEntries, /^sol-request-auditor\/SKILL\.md$/m);
  assert.match(skillEntries, /^sol-request-auditor\/references\/audit-rules\.md$/m);
});

test("checksums match all bounded release artifacts", () => {
  const sums = fs.readFileSync(dist + "/SHA256SUMS.txt", "utf8").trim().split("\n");
  assert.equal(sums.length, 3);
  for (const line of sums) {
    const [expected, name] = line.split(/\s{2}/);
    const file = dist + "/" + name;
    const actual = crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
    assert.equal(actual, expected);
    assert(fs.statSync(file).size < 12 * 1024 * 1024);
  }
  const pluginCount = execFileSync("unzip", ["-Z1", plugin], { encoding: "utf8" }).trim().split("\n").length;
  assert(pluginCount <= 512);
});

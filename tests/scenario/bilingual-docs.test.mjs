import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const en = fs.readFileSync("README.md", "utf8");
const zh = fs.readFileSync("README.zh-CN.md", "utf8");

test("both READMEs cover the full product workflow and concrete example", () => {
  const enSections = ["Who it is for", "Use cases", "Features", "Workflow", "Requirements", "Inputs and outputs", "End-to-end example", "Use in iPolloWork", "Build and package", "FAQ", "Validation"];
  const zhSections = ["适用对象", "使用场景", "核心功能", "工作流程", "环境要求", "输入与输出", "端到端示例", "在 iPolloWork 中使用", "构建与打包", "常见问题", "验证说明"];
  for (const section of enSections) assert.match(en, new RegExp(section, "i"));
  for (const section of zhSections) assert.match(zh, new RegExp(section));
  for (const doc of [en, zh]) {
    assert.match(doc, /https:\/\/github\.com\/Devin-AXIS\/iPolloWork/);
    assert.match(doc, /account-search/);
    assert.match(doc, /ready-with-changes/);
  }
});

test("public documentation is product-focused and accurately bounded", () => {
  const combined = en + zh;
  for (const prohibited of ["Hotspot background", "Why this exists", "热点背景", "热点与边界", "追热点"]) {
    assert.doesNotMatch(combined, new RegExp(prohibited, "i"));
  }
  assert.match(combined, /0\.50\.20/);
  assert.match(combined, /macOS arm64/);
  assert.match(combined, /OpenCode/);
  assert.match(combined, /does not call|不会调用/i);
});

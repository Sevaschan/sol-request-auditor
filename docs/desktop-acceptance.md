# Desktop acceptance / 桌面验收

## English

Tested on 2026-09-30 with iPolloWork 0.50.20 on macOS arm64 and the OpenCode engine.

### Installation

- Imported sol-request-auditor-1.0.0.ipollowork-plugin through Extensions → Plugins → Add → File.
- Preview showed Sol Request Auditor, publisher Sevaschan, version 1.0.0, one Skill and no Agent, command or MCP resource.
- The declarative safety check passed.
- Installed and enabled the plugin and its Skill.

The initial preview attempt exposed a noncanonical uppercase publisher ID. The manifest was corrected to the stable lowercase ID sevaschan, the package was rebuilt, and a fresh file selection passed.

### Invocation

The acceptance task explicitly requested sol-request-auditor and both references. iPolloWork loaded:

- skills/sol-request-auditor/SKILL.md
- skills/sol-request-auditor/references/audit-rules.md
- skills/sol-request-auditor/references/report-format.md

It audited sol-request-auditor-packet.md and wrote sol-request-auditor-acceptance.md.

### Result

- Verdict: ready-with-changes.
- Found the tool-on-Chat-Completions incompatibility.
- Found unsupported minimal reasoning.
- Preserved EU residency and moved the proposed repair off Fast.
- Reported $0.2500 and $0.1345 exact request costs.
- Reported $1.4040 and $1.7885 as known subtotals with the cache-write symbolic remainder.
- Included five gates per profile, requirement-preserving repairs, non-production validation steps and unresolved inputs.
- Ended with the exact advisory boundary.

The generated report was 208 lines. No external API was called and no model configuration, traffic, residency setting or budget was changed.

## 中文

验收日期为 2026-09-30，环境为 macOS arm64、iPolloWork 0.50.20 和 OpenCode 引擎。

### 安装

- 通过“扩展 → 插件 → 添加 → 文件”导入 sol-request-auditor-1.0.0.ipollowork-plugin。
- 预览显示 Sol Request Auditor、发布者 Sevaschan、版本 1.0.0、一个 Skill，且没有 Agent、命令或 MCP 资源。
- 声明式安全检查通过。
- 插件及其 Skill 已安装并启用。

第一次预览发现发布者 ID 使用了不规范的大写形式。清单已改为稳定的小写 ID sevaschan，重新构建后从全新文件选择入口导入成功。

### 调用

验收任务明确要求使用 sol-request-auditor 及两个参考文件。iPolloWork 实际加载了：

- skills/sol-request-auditor/SKILL.md
- skills/sol-request-auditor/references/audit-rules.md
- skills/sol-request-auditor/references/report-format.md

任务审计了 sol-request-auditor-packet.md，并生成 sol-request-auditor-acceptance.md。

### 结果

- 结论为 ready-with-changes。
- 找出了 Chat Completions 携带工具的不兼容问题。
- 找出了不支持的 minimal 推理档位。
- 保留欧盟驻留要求，并建议退出 Fast。
- 给出了 $0.2500 和 $0.1345 两个精确单请求成本。
- 将 $1.4040 和 $1.7885 正确标记为已知小计，并保留缓存写入符号余项。
- 每个配置覆盖五道门禁，并包含保要求修复、非生产验证步骤和未解决输入。
- 最后一行是精确的建议性边界。

生成报告共 208 行。验收没有调用外部 API，也没有修改模型配置、流量、驻留设置或预算。

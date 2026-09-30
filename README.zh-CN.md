# Sol 请求审计器

[English](README.md)

Sol Request Auditor 是一个用于 GPT-6.1 Sol 迁移前审查的可复用 Skill。它把带日期的模型合同快照和代表性请求配置整理为可追溯的兼容性报告、精确或有边界的成本工作表、修复计划及非生产验证计划。

它适合需要在切换模型时保留工具行为、数据驻留要求和预算证据的 API 负责人、平台团队及评审人员。

## 适用对象

- 将现有工作负载迁移到 GPT-6.1 Sol 的 API 负责人。
- 审查公共请求构建器和路由策略的平台团队。
- 核对分项 Token 计算与长上下文价格的 FinOps 人员。
- 需要追踪假设、未知项和建议变更的治理评审人员。

## 使用场景

- 发现仍通过 Chat Completions 发起、但必须迁移到 Responses 的工具调用。
- 找出不支持的推理档位或错误的参数结构。
- 检查上下文与输出限制，同时保留未知 Token 字段。
- 发现处理模式与数据驻留要求之间的不兼容组合。
- 在不把缺失用量当成零的前提下估算单请求和组合成本。

## 核心功能

- 固定的兼容性检查顺序：身份、端点与工具、推理、容量、驻留与处理模式。
- 四类证据：已提供、推导、假设和未知。
- 包含严重级别、证据、影响及必要变更的发现表。
- 支持短上下文和长上下文，并保留符号余项的成本工作表。
- 避免低成本覆盖不兼容问题的结论优先级。
- 保留既定要求的修复与验证计划。
- 精确的建议性边界，区分分析与真实执行。

## 工作流程

1. 提供代表性请求配置和带日期的 GPT-6.1 Sol 合同快照。
2. 写明必须保留的行为，例如工具、Chat Completions 或欧盟数据驻留。
3. 明确要求代理使用 Sol Request Auditor。
4. 检查生成报告中的合同快照和请求清单。
5. 解决必要变更并补充缺失用量。
6. 在 Skill 之外执行建议的非生产测试，并附上真实证据。
7. 在修改生产流量前，对修复后的配置再次审计。

## 环境要求

- 使用本项目已验证安装包时，需要 [iPolloWork](https://github.com/Devin-AXIS/iPolloWork) 0.50.12 或更高版本。
- 使用 OpenCode 引擎的本地项目。
- 请求配置和可信、带日期的模型合同快照。
- 不需要 API Key 或 OpenAI 连接：该 Skill 不会调用 API。

上游模型合同和价格可能变化。每次决策前都应更新快照。

## 输入与输出

输入：

- 模型 ID、端点和工具；
- 推理档位及参数结构；
- 按类别拆分的 Token 用量；
- 处理模式和数据驻留；
- 上下文、输出限制和价格；
- 不可妥协的业务要求。

输出：

- ready、ready-with-changes 或 blocked 总体结论；
- 合同快照和必要行为清单；
- 带证据的请求发现；
- 精确总额或有边界的已知小计；
- 修复计划、验证计划和未解决输入。

## 端到端示例

示例包包含：

- account-search：Chat Completions 加必要函数工具；
- policy-summary：无工具的 Chat Completions，但使用 minimal 推理；
- case-analysis：Responses、长上下文、未知缓存写入用量、Fast 处理和必要的欧盟驻留。

调用方式：

> 使用 Sol Request Auditor 审计 examples/migration-packet.md。保留所有既定要求，展示成本计算过程，并且不要声称完成了在线测试。

预期结果是 ready-with-changes。报告会在保留工具的前提下把 account-search 改为 Responses，把 policy-summary 的 minimal 改为受支持档位，在保留欧盟驻留的同时让 case-analysis 退出 Fast，并把未知缓存写入成本保留为符号余项。参见 [expected-report.md](examples/expected-report.md)。

## 在 iPolloWork 中使用

1. 从 GitHub Release 下载 sol-request-auditor-1.0.0.ipollowork-plugin。
2. 打开 iPolloWork，选择 **扩展 → 插件 → 添加 → 文件**。
3. 选择下载文件，确认发布者为 Sevaschan、版本为 1.0.0，并包含一个 Skill 资源。
4. 安装插件并确认 **Sol Request Auditor** 已启用。
5. 打开本地项目，附加或粘贴迁移资料，明确要求代理使用 Sol Request Auditor。
6. 确认运行时加载 SKILL.md、audit-rules.md 和 report-format.md。
7. 导出或保存生成的 Markdown 报告及迁移证据。

若使用独立 Skill 导入，请解压 sol-request-auditor-1.0.0-skill.zip，并在本地 Skill 导入页面选择其中的 sol-request-auditor 文件夹。

## 构建与打包

只需 Node.js 22 及系统自带的 zip/unzip 命令：

~~~sh
npm test
npm run package
cd dist
shasum -a 256 -c SHA256SUMS.txt
~~~

构建会生成 iPolloWork 安装包、独立 Skill ZIP、源码 ZIP 和校验和清单。安装包仅包含一份 schemaVersion 2 清单和完整 Skill 目录。

## 常见问题

### 它会调用 GPT-6.1 Sol 吗？

不会。它只审计已提供的配置和证据。实时可用性、质量、延迟、区域路由及计费需要单独的非生产测试。

### 可以直接采用记忆中的当前价格吗？

不可以。应提供带日期的可信合同快照，未知或过期数据必须明确保留。

### 为什么成本有时只是小计？

如果任何计价 Token 类别未知，给出精确总额会造成虚构。报告会保留已知小计和符号余项。

### 可以通过取消欧盟驻留来保留 Fast 吗？

只有要求负责人明确修改驻留要求时才可以。默认修复会保留不可妥协的行为。

## 验证说明

1.0.0 已在 macOS arm64、iPolloWork 0.50.20 和 OpenCode 引擎中完成导入、启用及调用。验收运行加载了两个参考文件，并生成预期结论、兼容性发现、有边界的成本处理、修复计划和精确建议性结尾。参见[桌面验收记录](docs/desktop-acceptance.md)。

已验证范围：声明式安装包导入、Skill 发现、参考文件加载，以及针对一个已提供资料包的审计。未测试真实 OpenAI API 请求、生产路由、区域策略执行、账号资格、延迟、质量和计费。

## 许可证

MIT

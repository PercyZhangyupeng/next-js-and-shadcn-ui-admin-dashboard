<div align="center">
  <strong>Custom Planning Consent Dashboard built with Next.js 15 & Shadcn UI</strong><br />
  一个基于 Next.js + Shadcn UI 构建的本地规划审批智能分析平台。
</div>

<br />

<p align="center">
  <strong>🌐 本地访问地址：</strong> <code>http://192.168.0.141:3000/dashboard/default</code>
</p>

---

## 🚀 项目简介（Project Overview）

本项目基于开源的 `next-shadcn-admin-dashboard` 模板进行二次开发，结合城建数据与审批规则，开发出一套面向城市规划审批流程的智能预测与数据管理后台系统。

主要使用技术栈包括：

- ✅ `Next.js 15`（基于 App Router 架构）
- ✅ `Tailwind CSS v4`
- ✅ `TypeScript`
- ✅ `Shadcn UI`
- ✅ 开发工具链：`Zod`、`ESLint`、`Prettier`、`Husky`

---

## ✅ 功能模块（Features）

| 模块名称                        | 功能说明                                      | 状态     |
|-------------------------------|----------------------------------------------|----------|
| Planning Consent Predict      | 根据回归模型预测审批所需工作日               | ✅ 已完成 |
| Similar Cases                 | 查找匹配条件的历史案例，支持分页排序         | ✅ 已完成 |
| Data Management               | 支持 JSON / CSV 数据查看、导入、导出与编辑   | ✅ 已完成 |
| Council/Zone Filter           | 根据 Council 与 Zone 筛选数据                | ✅ 已完成 |
| Project Search                | 后期拓展模块，支持开发项目条件查询           | 🚧 规划中 |
| Role-Based Access Control     | 多角色访问权限管理（RBAC）                    | 🚧 规划中 |
| Approval Analytics (Charts)   | 审批时长趋势图、类型分布图等数据可视化       | 🚧 规划中 |

---

## 🗂 文件结构说明（Directory Structure）

```bash
src/
├── app/
│   ├── (main)/dashboard/
│   │   ├── default/                   # 默认仪表盘首页
│   │   ├── planning-consent-predict/ # 审批预测模块
│   │   ├── data-management/          # 数据管理界面
│   │   ├── project-search/           # （预留模块）
│
├── components/
│   ├── ui/                            # Shadcn UI 基础组件
│   ├── shared/                        # 项目复用组件
│
├── public/data/                      # 样本数据文件，如 ConsentPlanning400Samples0312.json
├── config/、hooks/、utils/           # 配置项、自定义 hooks 与工具函数

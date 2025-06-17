<div align="center">
  <strong>一个基于 Next.js 构建的规划审批预测分析平台</strong><br />
  A custom planning consent prediction and analytics dashboard powered by Next.js 15 & Shadcn UI.
</div>

<br />

<p align="center">
  <strong>🌐 本地访问地址：</strong> <code>http://192.168.0.141:3000/dashboard/default</code>
</p>

---

## 🚀 项目简介（Project Overview）

本项目基于开源模板 `next-shadcn-admin-dashboard` 进行二次开发，结合大数据分析结果，构建了面向南澳住宅规划审批流程的智能预测和数据管理后台系统。

主要使用技术栈：

- ✅ `Next.js 15`（采用 App Router 架构）
- ✅ `Tailwind CSS v4`
- ✅ `TypeScript`
- ✅ `Shadcn UI`
- ✅ 工具链：`Zod`、`ESLint`、`Prettier`、`Husky`

---

## ✅ 功能模块（Features）

| 模块名称                  | 功能说明                                                                 | 状态       | 优先级 |
|---------------------------|--------------------------------------------------------------------------|------------|--------|
| Planning Consent Predict  | 通过七个条件进行审批天数预测，并显示相似案例和修正后预测结果           | ✅ 已完成   | ⭐核心功能 |
| Data Overview             | 显示数据库概况（样本数量、平均/中位审批时间、集中区间、趋势图）        | 🚧 框架完成 | 🔧扩展功能 |
| Similar Cases             | 展示与预测条件匹配的真实案例（高亮完全匹配，次高亮部分匹配）           | ✅ 已完成   | ⭐核心功能 |
| Data Management           | 增删改查数据库记录，支持 JSON/CSV 导入导出，设置为管理员专属功能       | ✅ 已完成   | 🔧扩展功能 |
| Project Search            | 支持基于七条件进行地图+表格形式的项目查询展示                          | 🚧 开发中   | 🔧扩展功能 |
| Council/Zone Filter       | 用于数据筛选和交互分析                                                   | 🚧 开发中    | 🔧扩展功能 |
| Approval Analytics        | 审批时间趋势图、类型分布图、预测与实际对比等图表分析                    | 🚧 规划中   | 🔧扩展功能 |
| Role-Based Access Control | 后台权限控制与多角色管理（RBAC）                                         | 🚧 规划中   | 🔧扩展功能 |

---

## 📊 模块说明（Module Description）

### 📌 1. Data Overview

- **功能描述**：展示全局审批数据趋势和核心指标。
- **指标内容**：
  - Sample Size（样本量）
  - Average Approval Time（平均审批时间）
  - Median Approval Time（中位审批时间）
  - 50% Data Concentration Range（50%集中区间）
- **趋势图功能**：
  - X 轴支持年/月/日视图切换
  - Y 轴为审批天数
  - 图表数据源于数据库动态统计结果

---

### 📌 2. Planning Consent Predict

- **功能描述**：基于七项审批条件预测审批天数，并提供参考案例。
- **模块结构**：
  - `Prediction Conditions`：筛选条件（共七项）
  - `Prediction Result`：
    - 直接预测值（回归模型结果）
    - 修正预测值 = 直接预测值 × 0.55 + 相似案例均值 × 0.45
  - `Similar Cases`：
    - 满足7项条件者为高亮（黄色）
    - 满足6项条件（除Council）也会列出但不高亮

---

### 📌 3. Project Search

- **功能描述**：根据七项条件过滤项目数据，地图 + 列表展示结果。
- **待开发内容**：
  - 与 `React-Leaflet` 地图联动展示
  - 与条件选择联动筛选项目列表

---

### 📌 4. Data Management

- **功能描述**：对原始审批数据进行增删改查与备份。
- **管理员权限**：
  - 支持添加新数据项
  - 支持 CSV 文件导入与导出
  - 可分页查看与删除数据
  - 核心字段如 Address、Application ID、Zone、Consent Days 等支持编辑

---

## 🗂 文件结构说明（Directory Structure）

```bash
src/
├── app/
│   ├── (main)/dashboard/
│   │   ├── default/                   # 数据总览页（Data Overview）
│   │   ├── planning-consent-predict/ # 审批预测模块
│   │   ├── data-management/          # 数据管理模块
│   │   ├── project-search/           # 项目搜索模块（开发中）
│
├── components/
│   ├── ui/                            # 基于 Shadcn UI 的通用组件
│   ├── shared/                        # 可复用的交互与展示组件
│
├── public/data/                      # 示例数据文件，如 ConsentPlanning400Samples0312.json
├── config/                           # 配置项
├── hooks/                            # 自定义 hooks
├── utils/                            # 工具函数库

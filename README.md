<div align="center">
  <strong>Custom Planning Consent Dashboard built with Next.js 15 & Shadcn UI</strong><br />
  An internal analytics dashboard for local development approval, powered by smart prediction and structured data management.
</div>

<br />

<p align="center">
  <strong>🌐 Local deployment:</strong> <code>http://192.168.0.141:3000/dashboard/default</code>
</p>

---

## 🚀 Project Overview

This project is a customised admin dashboard template built with:

- ✅ **Next.js 15 (App Router)**
- ✅ **Tailwind CSS v4**
- ✅ **TypeScript**
- ✅ **Shadcn UI**
- ✅ **Zod**, **ESLint**, **Prettier**, **Husky**, and more

It's extended for internal tools such as:

- ✅ **Planning Consent Prediction**: intelligent forecasting of development approval days using regression coefficients
- ✅ **Data Management**: CSV import/export, inline editing, row filtering
- ✅ ⚙️ Ready for multi-user, council-based analysis and RBAC extensions

---

## 📸 Screenshots

| Planning Consent Prediction | Data Management |
|----------------------------|-----------------|
| ![Prediction](media/predict-sample.png) | ![Data Table](media/datamanage-sample.png) |


---

## 🗂 Project Structure

```bash
src/
├── app/
│   ├── (main)/dashboard/
│   │   ├── default/                # Dashboard landing
│   │   ├── planning-consent-predict/  # Consent prediction form
│   │   ├── data-management/       # CSV import/export UI
│   │   ├── project-search/        # (optional future)
│
├── components/
│   ├── ui/                        # Shadcn UI primitives
│   ├── shared/                    # Custom reusable components
│
├── public/data/                  # JSON dataset (ConsentPlanning400Samples0312.json)
├── config/, hooks/, utils/       # Configuration and logic

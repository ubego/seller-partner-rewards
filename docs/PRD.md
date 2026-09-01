# Product Requirements Document (PRD)

**Project Name:** Ubego Seller Partner Reward Calculator
**Version:** 2.0
**Status:** Active
**Date:** 2026-08-27

## 1. Product Overview

### 1.1 Purpose
The **Ubego Seller Partner Reward Calculator** is a web-based Single Page Application (SPA) for the current museum sales compensation model.

The model reflects a realistic workload for a **full-time sales and partner relations manager working approximately 8 hours per day**.

The standard monthly sales expectation is:

**12 Qualified Meetings → 3 Pilot Contracts → 2 Full Contracts**

Contract signing and operational launch are two separate, additive reward tracks.

### 1.2 Value Proposition
*   **Transparency:** Clear visibility into KPI coefficients, meeting-plan bonus, and additive contract/launch components.
*   **Motivation:** Visualizes the financial impact of the next coefficient step.
*   **Simplicity:** Scenario planning for monthly actuals, including a direct Full Contract or Full Commercial Launch.

### 1.3 Target Audience
*   **Primary User:** Sales and Partner Relations Managers engaging with museums.
*   **Language:** Russian (RU).

---

## 2. Sales and Reward Tracks

### Contract Track
**Qualified Meeting → Pilot Contract Signed → Full Contract Signed**

Commercial achievements of the sales and partner relations manager with KPI-based compensation.

### Launch Track
**Pilot Launch → Full Commercial Launch**

Operational milestones with fixed compensation.

Contract rewards and launch rewards are independent and additive. Museums that reach different stages in one month do not have to belong to the same cohort.

---

## 3. Functional Requirements

### 3.1 Input Parameters

| Category | Parameter | Default |
| :--- | :--- | ---: |
| **Base** | Base salary | 10,000 ₽ |
| **KPI Plans** | Qualified Meetings plan | 12 |
| | Pilot Contracts plan | 3 |
| | Full Contracts plan | 2 |
| **Contract actuals** | Qualified Meetings | 12 |
| | Pilot Contracts Signed | 3 |
| | Full Contracts Signed | 2 |
| | Of which Direct Full Contracts | 0 |
| **Launch actuals** | Pilot Launches | 3 |
| | Full Commercial Launches | 2 |
| | Of which Direct Full Commercial Launches | 0 |

A **Direct Full Contract** also counts toward the Pilot Contract KPI. A **Direct Full Commercial Launch** also pays the unpaid Pilot Launch component. Previously paid components are not paid twice.

### 3.2 Compensation Rates

| Component | Base reward | KPI coefficient |
| :--- | ---: | ---: |
| Base salary | 10,000 ₽ | No |
| Qualified Meeting | 3,000 ₽ | Yes |
| Pilot Contract Signed | 10,000 ₽ | Yes |
| Pilot Launch | 10,000 ₽ | No |
| Full Contract Signed | 20,000 ₽ | Yes |
| Full Commercial Launch | 20,000 ₽ | No |
| Qualified Meetings KPI Completion Bonus | 10,000 ₽ / month | No |

Base salary is paid for correct and timely CRM, reporting, and documentation. If those conditions are not met, the salary component is 0 ₽ for the month.

### 3.3 KPI Coefficient Stairway

Each KPI is calculated independently.

| KPI achievement | Coefficient |
| :--- | ---: |
| Below 51% | ×0.80 |
| 51–99% | ×1.00 |
| 100–149% | ×1.30 |
| 150–199% | ×1.45 |
| 200%+ | ×1.57 |

Exactly 50% is underperformance (×0.80). Standard-plan achievement (100%) uses ×1.30.

Payment for a KPI-controlled component:

**actual × base rate × coefficient**

The plan influences the coefficient. It does not determine whether an actual completed result is paid.

Qualified Meetings KPI Completion Bonus: **10,000 ₽** if actual meetings ≥ meetings plan. No contract or launch condition applies.

### 3.4 Additive Direct Full Path

If a museum signs a Full Contract with no previously paid Pilot Contract, it counts toward both Pilot and Full Contract KPIs.

If a museum reaches Full Commercial Launch with no previously paid Pilot Launch:

**10,000 ₽ + 20,000 ₽ = 30,000 ₽**

Full Contract signing and Full Commercial Launch remain separate milestones.

### 3.5 Full Commercial Launch Definition

A Full Commercial Launch occurs when both conditions are satisfied:

1. the museum has published/placed all promotional and informational materials agreed under the Full Contract; and
2. the museum has started selling the Ubego quest to its own visitors.

Signing the contract, publishing the quest only on Ubego, preparing materials without displaying them, installing a QR code without museum-side sales, or completing technical preparation are not sufficient.

### 3.6 Output & Visualization
*   Real-time calculation on input change.
*   Funnel presented without plan numbers: **квалифицированные встречи → пилотные договоры → полные договоры**.
*   For each KPI-controlled component: actual, plan, achievement %, coefficient, additional results to the next coefficient.
*   Highlight when the meetings plan (and its bonus) is achieved.
*   Tooltips and on-page hints for formulas, launch definition, and the direct Full Launch rule.
*   Prominent total.

### 3.7 Standard Full-Time Scenario

Base salary 10,000 ₽ + 12 meetings, 3 Pilot Contracts, 3 Pilot Launches, 2 Full Contracts, 2 Full Commercial Launches → **227,800 ₽**.

Control cases:

*   150%+ example (18 meetings, 5 Pilot Contracts, 3 Full Contracts, 5 Pilot Launches, 3 Full Commercial Launches) → **367,800 ₽**
*   200% example (24 meetings, 6 Pilot Contracts, 4 Full Contracts, 6 Pilot Launches, 4 Full Commercial Launches) → **492,840 ₽**
*   Five meetings + one direct Full Contract → **36,000 ₽** (below the 40,000 ₽ control)

---

## 4. User Interface & Design System

### 4.1 Design Guidelines
The application follows the **Ubego Children's Service Design System**.

*   **Primary Color:** Orange (`#FF9500`)
*   **Secondary/Background:** Sky Blue (`#87CEEB`)
*   **Accent Color:** Red (`#FF0000`)
*   **Typography:** `Segoe UI`, Tahoma, Geneva, Verdana, sans-serif.
*   **Style:** Playful, cartoonish, friendly, with rounded corners and "soft" UI elements.
*   **Branding:** "Ubego" (First letter capitalized).

### 4.2 Key Components
1.  **Header:** "Ubego" text logo and link to `ubego.quest`.
2.  **Hero Section:** Title "КАЛЬКУЛЯТОР ПРЕМИИ" and the 12 → 3 → 2 funnel.
3.  **Calculator Interface:**
    *   **Left:** KPI plans, contract track, launch track. Nested "direct full" fields. Launch definition and direct-launch hints.
    *   **Right:** Breakdown cards with KPI progress and total.
4.  **Footer:** Copyright ("Ubego - квест-экскурсии в реальной жизни").

### 4.3 Required UI hints

**Direct Full Launch:**

> Если музей сразу выходит на полный коммерческий запуск, без отдельного пилотного запуска, менеджер по продажам и работе с партнерами получает обе ещё не выплаченные части вознаграждения: 10 000 ₽ за пилотный запуск + 20 000 ₽ за полный коммерческий запуск = 30 000 ₽.

**Full Commercial Launch definition:**

> Полный коммерческий запуск — момент, когда музей разместил все согласованные рекламные и информационные материалы и начал продавать квест своим посетителям. Только подписание договора или техническая готовность сами по себе не считаются полным коммерческим запуском.

**KPI progress example (9 of 12 meetings):**

> 9 из 12
> Выполнение плана: 75%
> Текущий коэффициент: ×1,00
> Ещё 3 встречи → ×1,30 и бонус 10 000 ₽

---

## 5. Technical Specifications

### 5.1 Technology Stack
*   **Framework:** Next.js 16 (App Router strategy).
*   **Language:** TypeScript.
*   **Styling:** Tailwind CSS v4.
*   **Icons:** Lucide React.
*   **Animation:** Framer Motion.

### 5.2 Application Architecture
*   **Rendering Strategy:** Static Site Generation (SSG) / Client-side interactivity (`'use client'`).
*   **Data Flow:** Local state (`useState`) in the Calculator component. Calculation in `src/lib/calculator.ts`.
*   **Deployment:** Vercel or any static hosting compatible with Next.js `output: export`.

### 5.3 Performance Requirements
*   **Load Time:** < 1.5s First Contentful Paint.
*   **Responsiveness:** Mobile (single column), Tablet, and Desktop (two-column calculator layout).

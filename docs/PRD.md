# Product Requirements Document (PRD)

**Project Name:** Ubego Seller Partner Reward Calculator
**Version:** 1.2
**Status:** Active/In Development
**Date:** 2026-02-24

## 1. Product Overview

### 1.1 Purpose
The **Ubego Seller Partner Reward Calculator** is a web-based Single Page Application (SPA) designed to help seller partners of Ubego (a platform for museum quests and excursions) calculate their monthly financial rewards.

### 1.2 Value Proposition
*   **Transparency:** Provides clear visibility into how rewards are calculated based on specific actions (meetings, signings, launches).
*   **Motivation:** Visualizes the financial impact of achieving Key Performance Indicators (KPIs).
*   **Simplicity:** Offers an easy-to-use interface for scenario planning ("What if I sign 2 more contracts?").

### 1.3 Target Audience
*   **Primary User:** Seller Partners / Sales Managers engaging with museums and shopping centers.
*   **Language:** Russian (RU).

---

## 2. Functional Requirements

### 2.1 Input Parameters
The user must be able to input the following data to customize the calculation:

| Category | Parameter | Description | Variable Name | Default Value | This is from |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **KPI Plans** | Plan Meetings | Target number of meetings per month | `planMeetings` | 12 | Positive Scenario |
| | Plan Signed | Target number of signed contracts | `planSigned` | 4 | Positive Scenario |
| | Plan Launched | Target number of launched quests | `planLaunched` | 4 | Positive Scenario |
| **Actuals** | Meetings | Actual meetings held | `meetings` | 12 | Positive Scenario |
| | Signed | Actual contracts signed | `signed` | 4 | Positive Scenario |
| | Launched | Actual quests launched | `launched` | 4 | Positive Scenario |
| **Base** | Base Salary | Fixed monthly salary component | `baseSalary` | 10,000 ₽ | Baseline |

### 2.2 Calculation Logic (Business Rules)
The Total Reward is the sum of the Base Salary and variable components.

**1. Meeting Components**
*   **Выплата за встречи (Meeting Reward):** 300 ₽ × `Meetings`
*   **Бонус за KPI по встречам (Meetings KPI Bonus):**
    *   IF `Meetings` ≥ `Plan Meetings`: 700 ₽ × `Meetings`
    *   ELSE: 0 ₽

**2. Signing Components**
*   **Выплата за подписание (Sign Reward):** 5,000 ₽ × `Signed`
*   **Бонус за KPI по подписаниям (Sign KPI Bonus):**
    *   IF `Signed` ≥ `Plan Signed`: 2,000 ₽ × `Signed`
    *   ELSE: 0 ₽

**3. Launch Components**
*   **Выплата за запуск (Launch Reward):** 20,000 ₽ × `Launched`
*   **Бонус за KPI по запускам (Launch KPI Bonus):**
    *   IF `Launched` ≥ `Plan Launched`: 5,000 ₽ × `Launched`
    *   ELSE: 0 ₽

### 2.3 Output & Visualization
*   **Real-time Calculation:** Results must update instantly upon input change.
*   **Detailed Breakdown:** Display individual cards for each reward component.
*   **KPI Highlighting:** Visual indication (Yellow background/border) when a specific KPI plan is met.
*   **Tooltips (Hints):** Use tooltips to explain the formula for every calculated value.
*   **Total:** Prominent display of the final sum.

---

## 3. User Interface & Design System

### 3.1 Design Guidelines
The application follows the **Ubego Children's Service Design System**.

*   **Primary Color:** Orange (`#FF9500`)
*   **Secondary/Background:** Sky Blue (`#87CEEB`)
*   **Accent Color:** Red (`#FF0000`)
*   **Typography:** `Segoe UI`, Tahoma, Geneva, Verdana, sans-serif.
*   **Style:** Playful, cartoonish, friendly, with rounded corners and "soft" UI elements.
*   **Branding:** "Ubego" (First letter capitalized).

### 3.2 Key Components
1.  **Header:**
    *   "Ubego" text logo.
    *   Navigation link to main site (`ubego.quest`).
    *   User profile icon placeholder.
2.  **Hero Section:**
    *   Large Title: "КАЛЬКУЛЯТОР ПРЕМИИ".
    *   Animated background elements (floating shapes/clouds) calculation concept.
3.  **Calculator Interface:**
    *   **Left Column (Inputs):** Grouped by "KPI Plans", "Actual Results", and "Base". All inputs have tooltips explaining the metric.
    *   **Right Column (Results):** Grid of cards showing rewards (Meeting, Sign, Launch). The Launch group spans full width on smaller screens to prevent overlap.
4.  **Footer:**
    *   Copyright info ("Ubego - квест-экскурсии в реальной жизни").
    *   Links to Privacy Policy (placeholder).

---

## 4. Technical Specifications

### 4.1 Technology Stack
*   **Framework:** Next.js 15 (App Router strategy).
*   **Language:** TypeScript.
*   **Styling:** Tailwind CSS v4.
*   **Icons:** Lucide React.
*   **Animation:** Framer Motion (for entry animations, hover effects, tooltips).

### 4.2 Application Architecture
*   **Rendering Strategy:** Static Site Generation (SSG) / Client-side interactivity (`'use client'`).
*   **Data Flow:** Local state management (`useState`) within the Calculator component. No backend database required.
*   **Deployment:** Vercel (recommended) or any static hosting compatible with Next.js `output: export`.

### 4.3 Performance Requirements
*   **Load Time:** < 1.5s First Contentful Paint.
*   **Responsiveness:** Fully responsive design adapting to Mobile (single column), Tablet, and Desktop (two-column calculator layout).

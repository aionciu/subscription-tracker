
# Phase 1 — Subscription Manager App (MVP) — Full Checklist

**Goal:** Build a simple, scalable and easy-to-use mobile app for tracking personal subscriptions (Romania-first), ready to expand in Phase 2.

**Tech stack:** React Native + TypeScript (strict), Supabase (Postgres, Auth, Storage), Firebase Cloud Messaging, NativeWind (Tailwind for RN), React Navigation (bottom tabs).

## 🎯 **Current Progress: ~45% Complete**

### ✅ **MAJOR ACHIEVEMENTS**
- **Authentication & Onboarding Flow: 100% COMPLETE** 🎉
- **Database Schema & Services: 100% COMPLETE** 
- **UI/UX Foundation: 90% COMPLETE**
- **Project Setup: 95% COMPLETE**

### 🚀 **NEXT PRIORITIES**
1. **Subscriptions CRUD** - Main subscription management
2. **Dashboard** - Value-first overview with calculations
3. **Notifications** - Push notification system
4. **Polish** - App icons, final touches

---

## Tabs (app structure)
- **Dashboard** — overview: Next Payment, Monthly Total, Yearly Projection  
- **Subscriptions** — CRUD list, add modal, provider selection  
- **Notifications** — upcoming renewals list, toggle, history of reminders  
- **Settings** — profile, theme, feedback, account deletion, subscription plan

---

## Full Task List (check off as you go)

### 0. Team / Project Essentials
- [ ] Create project board (issue tracker / Cursor / GitHub Projects) and backlog  
- [ ] Define owners for major areas (Frontend / Backend / Design / QA / DevOps)  
- [ ] Create initial roadmap & milestones (MVP date, Beta date)

**Deliverable:** Project board with owners and milestones.

---

### 1. Project Initialization & Dev Setup
- [x] Initialize React Native project with TypeScript (strict mode)  
- [x] Setup NativeWind (Tailwind RN) + theme config (colors, spacing, radii)  
- [x] Install core deps: react-navigation (bottom-tabs), @react-navigation/native, react-native-gesture-handler, react-native-reanimated, date-fns, supabase-js (TS), axios (if needed), firebase/app, firebase/messaging  
- [x] Setup ESLint, Prettier, Husky (pre-commit hooks) and basic lint rules  
- [x] Create folder structure: `src/screens`, `src/components`, `src/hooks`, `src/services`, `src/lib`, `src/types`  
- [ ] Create `.env.example`, local env loading, and secure secrets handling (do not commit keys)

**Deliverable:** Base repo with linting, formatting, Husky, project structure, and NativeWind configured.

---

### 2. Supabase & Backend Setup
- [x] Create Supabase project & link to repo env variables  
- [x] Configure Supabase Auth (email/password + OAuth for Google & Apple)  
- [x] Create initial DB schema (tables + relationships) and migrations using Supabase CLI:
  - users
  - subscriptions
  - subscription_providers
  - categories
  - billing_cycles
  - currencies
  - feature_flags
- [x] Implement Row Level Security (RLS) policies for per-user isolation
- [x] Create SQL seed/migration scripts (providers + categories + billing cycles + currencies)
- [x] Configure Supabase Storage for provider logos (or plan for CDN)

**Deliverable:** Supabase project with schema, RLS policies and seed data (SQL files committed).

---

### 3. TypeScript Types & Shared Models
- [x] Define TypeScript interfaces / types in `src/types`:
  - `User`, `Subscription`, `Provider`, `Category`, `BillingCycle`, `Currency`, `FeatureFlag`
- [x] Ensure Supabase client is typed and models are used across services
- [x] Create example API layer `src/services/supabaseClient.ts` with typed helpers

**Deliverable:** `src/types/*.ts` and typed supabase client wrapper.

---

### 4. Authentication & Onboarding Flow
- [x] Build signup/login screens (email + social sign-in) with supabase auth  
- [x] Implement "first run" onboarding:
  - [x] Show a scrollable list of prepopulated providers (toggle/select)
  - [x] Allow quick input of monthly cost for each selected provider (single input per provider)
  - [x] Defaults: currency = RON, billing_cycle = monthly, renewal_date = auto-set (1st of month or closest reasonable date)
  - [x] "Finish" populates user's subscriptions and redirects to Dashboard
- [ ] Add i18n configuration (Romanian default, English fallback)

**Deliverable:** Onboarding that creates an instant populated dashboard after ~2 minutes of user input.

---

### 5. Subscriptions — CRUD & UI
- [ ] Implement Subscriptions tab UI (list of cards) styled with NativeWind  
- [ ] Add FAB to open Add Subscription modal (provider dropdown pulled from DB)  
- [ ] Add "Custom Provider" path in modal (name + cost)  
- [ ] Implement Edit & Delete flows with confirmation modals  
- [ ] Validation on forms (cost positive number, reasonable date)  
- [ ] Implement optimistic UI updates and rollback on errors

**Deliverable:** Full subscription CRUD in-app with DB persistence and clean UI.

---

### 6. Dashboard — Value-first UX
- [ ] Implement "Next Payment" prioritized card (closest renewal)  
- [ ] Calculate & display "Monthly Total" (sum of active monthly subscriptions)  
- [ ] Show "Yearly Projection" (monthly total × 12) and quick tip (savings message)  
- [ ] Optional: allow user to enter monthly income to show % spent on subscriptions  
- [ ] Ensure all values update in real-time when subscriptions change

**Deliverable:** Dashboard showing Next Payment, Monthly Total, Yearly Projection, and reactive updates.

---

### 7. Notifications — Scheduling & Delivery
- [ ] Decide notification architecture:
  - Option A (recommended): Server-side scheduler using Supabase Edge Functions or a small serverless cron job that queries upcoming renewals and calls FCM to send push notifications
  - Option B: Local scheduled notifications (only work if app installed and allowed)
- [ ] Implement server-side scheduled job (Edge Function / serverless) to send reminders 3–5 days before renewal via FCM (and email if configured)  
- [ ] Notification preferences in Settings (enable/disable pushes, email)  
- [ ] Implement notification history in Notifications tab

**Deliverable:** Reliable reminder system delivering push notifications even when app is not active.

---

### 8. UI/UX Polish (NativeWind)
- [x] Create a design system (colors, spacing, typography, tokens) in NativeWind config  
- [x] Build reusable UI components: `Button`, `Card`, `Input`, `Modal`, `Select`, `Toggle`, `Icon`  
- [x] Implement Dark mode & theme switch in Settings  
- [x] Create onboarding UI components and layouts with progress indicators
- [ ] Create app icons and splash screens for Android & iOS (various sizes)  
- [ ] Implement provider logo display (from Supabase Storage or CDN)

**Deliverable:** Consistent, modern UI with dark mode and reusable components.

---

### 9. Monetization & Feature Flags
- [ ] Create `feature_flags` table and minimal admin toggles (or hardcoded flags for MVP)  
- [ ] Add placeholder "Upgrade" screen in Settings (UI only)  
- [ ] (Optional for MVP) Integrate Stripe for subscriptions:
  - Create Stripe keys in env
  - Implement Checkout session (client triggers, server webhook)
  - Handle webhooks to toggle `feature_flags` or user entitlement
- [ ] If Stripe not implemented, create a stub flow to mark user as Premium for testing

**Deliverable:** Feature flags in DB and an Upgrade UI; Stripe integration optional (deliver webhook docs if done).

---

### 10. Analytics, Monitoring & Error Tracking
- [ ] Integrate analytics (Firebase Analytics or Amplitude) for onboarding and funnel events: `onboard_started`, `onboard_completed`, `subscription_added`, `upgrade_clicked`  
- [ ] Integrate error/crash reporting (Sentry or equivalent)  
- [ ] Add basic logging for server-side Edge Functions

**Deliverable:** Analytics and crash reporting configured and tracking core events.

---

### 11. Testing & QA
- [ ] Unit tests for Supabase service helpers (Jest + React Native Testing Library)  
- [ ] Integration tests for main flows (subscription add/edit/delete)  
- [ ] E2E tests (Detox or Playwright mobile) for critical user journeys (onboarding → add subscription → dashboard)  
- [ ] Accessibility checks (axe or manual checks) and i18n strings review

**Deliverable:** Test suite covering critical flows; QA report with known issues and fixes.

---

### 12. Security, Privacy & Legal
- [ ] Implement Supabase Row Level Security (RLS) and verify policies with tests  
- [ ] Prepare Privacy Policy & Terms of Service (initial drafts) and link them in Settings/onboarding  
- [ ] Implement "Delete account" flow that removes user data (and a soft-delete option)  
- [ ] Ensure SSL/TLS and env-based key management; rotate keys as needed

**Deliverable:** RLS policies, privacy & TOS drafts, and a working account deletion feature.

---

### 13. CI / CD & Deployment
- [ ] Setup CI (GitHub Actions) for linting, tests, and type checks on PRs  
- [ ] Setup EAS/Expo or Fastlane pipeline to build Android/iOS test artifacts  
- [ ] Store secrets securely (GitHub Secrets or CI secret manager)  
- [ ] Publish internal test builds (TestFlight, Google Play Internal)

**Deliverable:** CI pipeline, automated builds, and test releases available.

---

### 14. Beta Release & Feedback Loop
- [ ] Recruit beta users (friends, community, mailing list, waitlist)  
- [ ] Launch closed beta, collect in-app feedback and crash logs  
- [ ] Run 1–2 product interviews from early testers to validate onboarding & retention  
- [ ] Iterate on issues, polish UX, and prioritize fixes

**Deliverable:** Beta feedback report and prioritized backlog for improvements.

---

### 15. Documentation & Handover
- [ ] Write README with setup steps, env variables, DB migration commands, and seed instructions  
- [ ] Add Developer Guide (how to run locally, deploy, update Supabase seeds)  
- [ ] Provide SQL seed files and sample `.env.example`  
- [ ] Provide TypeScript interfaces and sample API response shapes

**Deliverable:** Repo with README, developer docs, and seed SQL files.

---

## Final Deliverables (Phase 1)
- ✅ Fully working React Native app (TypeScript) with tab navigation and NativeWind styling  
- ✅ Supabase backend with schema, RLS, and seeded providers  
- ✅ Onboarding that populates a first dashboard in ~2 minutes  
- ❌ Subscriptions CRUD + Dashboard (Next Payment, Monthly Total, Yearly Projection)  
- ❌ Server-side scheduled push notifications (FCM) and notification tab  
- ❌ Basic monetization flags + Upgrade UI (Stripe optional)  
- ❌ Analytics & error reporting configured  
- ❌ CI/CD for builds and beta distribution  
- ❌ Documentation, SQL seeds, TypeScript models and handover pack

---

## Notes / Important Considerations (double-check items)
1. **Notifications architecture**: Local-only notifications are insufficient for reliable reminders across devices; prefer server-side scheduler for production.  
2. **Payments**: If you want to test monetization in MVP, add Stripe early — otherwise simulate premium flows.  
3. **Open Banking**: Phase 2 will require legal review and PSD2 provider contracts; design phase 1 to be non-invasive (no bank data stored).  
4. **Privacy**: Add a clear privacy notice in onboarding; users must be able to delete data per GDPR.  
5. **Assets**: Ensure provider logos are licensed or use generic icons until legal checks are done.

---

## Next suggestions (I can prepare these next):
- Generate SQL `CREATE TABLE` + `INSERT` seed script for providers, categories, billing_cycles, currencies.  
- Generate TypeScript interfaces for all models (User, Subscription, Provider, etc.).  
- Create sample Supabase Edge Function for scheduled notifications (template).  
- Export this checklist as `.md` file for Cursor (I saved it at the path below).


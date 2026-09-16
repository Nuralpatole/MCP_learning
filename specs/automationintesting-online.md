# Test Plan: Automation in Testing Hotel Booking

**Target:** https://automationintesting.online/
**Seed:** tests/seed.spec.ts
**Date:** 2026-09-15

## Overview
Cover the public hotel-booking experience: initial page rendering, room browsing, booking-form validation, and contact-form validation. Scenarios use the public site without completing a booking or sending a contact message.

## Preconditions
- The test can access `https://automationintesting.online/`.
- Each scenario starts with a fresh browser context and the site at its root URL.
- No real personal or payment information is entered.
- Booking and contact submissions are not completed during exploration.

## Scenarios

### Scenario 1.1 — Public home page renders the hotel experience
- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Fresh browser context at the target URL.
- **Steps:**
  1. Navigate to the target URL — expected: the hotel home page loads without a blocking error.
  2. Inspect the page landmarks and navigation — expected: the page exposes the hotel brand, primary navigation, and booking/contact entry points.
  3. Scroll through the initial content — expected: hotel information and room or accommodation content are visible.
- **Assertions:**
  - The page has a meaningful title or heading identifying the hotel site.
  - The primary navigation and the main booking call to action are visible and usable.
- **Edge cases considered:** The page should remain usable if non-essential imagery loads slowly or is unavailable.

### Scenario 1.2 — Room listings expose usable booking entry points
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Fresh browser context at the target URL.
- **Steps:**
  1. Navigate to the rooms or accommodation section — expected: the section becomes visible or the URL changes to the rooms view.
  2. Inspect each visible room listing — expected: room name, descriptive content, and an actionable booking control are available.
  3. Open a room’s booking flow without completing it — expected: the booking form or booking panel is displayed.
- **Assertions:**
  - At least one room listing is visible with a distinct name.
  - The booking flow exposes labeled guest and stay fields before any submission.
- **Edge cases considered:** Multiple room cards should not share ambiguous accessible names for their booking controls.

### Scenario 1.3 — Booking form identifies required fields
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** A booking form is open; no booking data has been submitted.
- **Steps:**
  1. Inspect the booking form without entering personal or payment data — expected: all required fields and controls are identifiable.
  2. Attempt to continue with required fields empty, if a non-final validation control is available — expected: inline validation identifies missing values and the form remains open.
- **Assertions:**
  - Required date, guest, and contact fields have visible labels or accessible names.
  - Missing required values produce an observable validation message rather than navigating to a confirmation state.
- **Edge cases considered:** Invalid date ranges, empty guest counts, and blank contact fields should be rejected before confirmation.

### Scenario 1.4 — Contact form identifies required fields
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Fresh browser context with the contact section or contact page open.
- **Steps:**
  1. Navigate to the contact section — expected: the contact form is visible.
  2. Inspect the form fields and submit control — expected: name, email, phone, subject, and message inputs are identifiable where present.
  3. Leave the form empty and use its validation-only submit action, without entering real-looking data — expected: required-field validation is displayed and no success confirmation is shown.
- **Assertions:**
  - The contact form exposes accessible names for its required inputs.
  - Empty submission stays on the contact form and identifies missing required information.
- **Edge cases considered:** An invalid or blank email address should not be accepted as a successful contact request.

### Scenario 2.1 — Customer completes the contact journey
- **Priority:** P1
- **Tags:** @critical
- **Preconditions:** Fresh browser context at the target URL; the environment is authorized to receive a test contact submission.
- **Test data:**
  - **Name:** `Nural Patole`
  - **Email:** `nural rajendrapatole@gmail.com`
  - **Phone:** `8983573039`
  - **Subject:** Select any available subject option.
  - **Message:** Use a clearly marked test message, such as `End-to-end contact journey test.`
- **Steps:**
  1. Navigate to the contact section — expected: the contact form is visible.
  2. Fill the name field with `Nural Patole` — expected: the value is retained.
  3. Fill the email field with `nural rajendrapatole@gmail.com` — expected: the value is retained and accepted as an email address.
  4. Fill the phone field with `8983573039` — expected: the value is retained and accepted by the form.
  5. Open the subject control and select any available option — expected: the selected subject is shown in the control.
  6. Fill the message field with the test message — expected: the message is retained.
  7. Submit the contact form in the authorized test environment — expected: a success confirmation is displayed and the form reports that the request was received.
- **Assertions:**
  - All supplied customer values remain visible in their corresponding fields before submission.
  - A subject option is selected rather than left at its placeholder value.
  - A successful submission produces a visible confirmation and does not show required-field or format errors.
- **Edge cases considered:** The flow must handle a subject list whose available options vary; the test should select the first enabled, non-placeholder option rather than relying on a hard-coded subject label.

## Not covered (and why)
- Completing a reservation is not covered because it may create persistent booking data and would require additional personal details.
- Payment, authentication, administrative, and destructive workflows are outside this public-site exploration.
- The contact journey should only be submitted in an authorized test environment; no live submission was performed during planning.
- Live browser exploration could not be completed because the available MCP browser session reported that a test session must be set up, but no session-bootstrap tool was available; selectors and page details should be confirmed by the Generator against the live target before implementation.
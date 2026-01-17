# MASTER SYSTEM TEST PROMPT: MASS OSS Live Verification

**Usage:** Copy and paste this entire prompt into an AI Agent (like Gemini, ChatGPT, or Claude) or give it to a QA Tester to execute a full system audit on the live deployment.

---

**ROLE:**
You are a Senior QA Automation Engineer and Product Owner for **MASS OSS (Open Source One-Stop-Shop)**. Your goal is to rigorously test the newly deployed enhancements on the live production environment.

**TARGET URL:**
`https://mass-car-workshop-vwms.vercel.app/`

**CONTEXT:**
We have just deployed a major update (`feature/m2-dev-library-integration`) adding 5+ new modules, AI tools, and a public verification system. We need to verify that all routes exist, features load, and critical paths are functional.

---

## 🧪 TEST PROTOCOL

Please execute the following test phases in order. For each phase, report:
- **Status:** [PASS / FAIL / WARN]
- **Observations:** User experience notes
- **Bugs:** Any errors or broken links

### PHASE 1: SMOKE & NAVIGATION
1. **Load Homepage:** Verify the landing page loads without errors.
2. **Dashboard Login:** Access the dashboard (use demo credentials or guest access if available).
3. **Sidebar Audit:** Click **EVERY** link in the sidebar (30+ links).
   - *Critical Check:* Ensure `Photo Studio`, `3D Configurator`, `EV Marketplace`, `Dealer Network`, `Reminders`, `Catalog`, `Delivery` do NOT return 404 errors.
4. **Theme Toggle:** Switch between Light and Dark mode. Does the UI persist correctly?

### PHASE 2: AI TOOLS SUITE
1. **Vehicle Photo Studio** (`/dashboard/photo-studio`):
   - Access the module.
   - Verify the "Upload Image" dropzone appears.
   - Test the "Remove Background" slider (functionality check).
2. **3D Configurator** (`/dashboard/configurator`):
   - Load the 3D viewer.
   - Click different **Colors** (check if car color changes).
   - Click different **Wheels**.
   - Toggle "Wrap Mode".
3. **AI Diagnostics** (`/dashboard/diagnostics`):
   - **OBD Look-up:** Enter code `P0300` and click Search. Verify definition appears.
   - **Visual Analysis:** Check if the image upload area works.

### PHASE 3: MARKETPLACE & REGIONAL DATA
1. **EV Marketplace** (`/dashboard/ev-marketplace`):
   - Browse the vehicle grid.
   - Test the filter (e.g., specific price range).
   - Scroll to "Charging Stations Map" (verify visualization).
2. **Dealer Network** (`/dashboard/dealer-network`):
   - Search for "Hargeisa".
   - Verify the list filters to show specific dealers.
   - Check if the "Verified" badge is visible on listings.

### PHASE 4: PUBLIC VERIFICATION (PASSPORT)
1. **Vehicle Passport:** Navigate manually to `/verify/MASS-VP-2026-001`.
2. **Data Validity:**
   - Check Vehicle Info (Toyota Land Cruiser).
   - Check Service History timeline.
   - Check Inspection Reports (Pass/Warning/Fail).
3. **QR Code:** Click the "QR Code" icon. Does a QR code generate and display?

### PHASE 5: UTILITIES & LAYOUT
1. **VIN Decoder** (Vehicle Registry):
   - Go to `/dashboard/vehicles`.
   - Click "Add Vehicle".
   - Enter a sample VIN (e.g., `JTM8R5EV5JD789012` - Toyota).
   - Click "Decode" (if implemented) or check if VIN field accepts input.
2. **Contact Support** (`/dashboard/contact`): 
   - Verify the form renders.
3. **Responsive Check:**
   - Resize browser to mobile view (< 768px).
   - Open the **Mobile Menu**.
   - Verify navigation is accessible/

---

## 📝 REPORTING TEMPLATE

After testing, provide a summary in this format:

```markdown
# 🛡️ MASS OSS QA Report
**Date:** [Today's Date]
**Tester:** [AI / User Name]
**Deployment:** [Commit Hash or content-hash]

## Executive Summary
[Brief overview of stability]

## Module Breakdown
| Module | Status | Notes |
| os | os | os |
| Navigation | ✅ PASS | All 38 links active |
| Photo Studio | ✅ PASS | UI Responsive |
| ... | ... | ... |

## Issues Found
1. [High/Med/Low] - Description of bug...

## UX Recommendations
- [Suggestion 1]
```

**START TESTING NOW.**

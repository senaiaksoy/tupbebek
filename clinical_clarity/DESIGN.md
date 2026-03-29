# Design System Strategy: The Scientific Editorial

## 1. Overview & Creative North Star

**Creative North Star: "The Clinical Curator"**
This design system rejects the "standard medical portal" aesthetic in favor of a high-end, editorial experience. It is designed to feel like a premium scientific journal—authoritative, calm, and intellectually rigorous. We move beyond the "template" look by utilizing intentional white space as a structural element, not just a gap. 

The system achieves distinction through **Soft Minimalism**: a rejection of harsh containment lines in favor of tonal depth and layered surfaces. By utilizing a "Soft UI" approach, we communicate empathy and accessibility without sacrificing the clinical precision required for a health portal. Layouts should favor intentional asymmetry—such as offset medical illustrations or typography that breaks traditional column constraints—to create a sense of bespoke craftsmanship and trust.

---

## 2. Colors & Surface Logic

The color palette is rooted in muted medical blues and neutral grays, designed to reduce cognitive load and visual anxiety.

### The "No-Line" Rule
Traditional 1px solid borders are strictly prohibited for sectioning or containment. Boundaries must be defined through **background color shifts** or **tonal transitions**. 
- To separate a major content block, transition from `surface` (#f8f9fa) to `surface_container_low` (#f1f4f6).
- For internal content modules, use `surface_container` (#eaeff1) to create a natural, soft boundary.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers, similar to stacked sheets of high-grade paper.
- **Base Level:** `surface` (#f8f9fa)
- **Primary Content Blocks:** `surface_container_lowest` (#ffffff) to provide maximum "pop" and focus.
- **Nested Detail Cards:** Use `surface_container_high` (#e3e9ec) within a container to draw the eye to secondary data or citations.

### Signature Textures & Glassmorphism
To add "soul" to the scientific aesthetic:
- **Glassmorphism:** For floating navigation or search bars, use `surface_container_lowest` with a 70% opacity and a 16px backdrop-blur. This integrates the UI into the content rather than layering it "on top."
- **Tonal Gradients:** For Hero sections or primary actions, use a subtle linear gradient from `primary` (#35618f) to `primary_dim` (#285582) at a 135-degree angle. This provides a professional depth that flat fills lack.

---

## 3. Typography: The Editorial Scale

We utilize a high-contrast typographic pairing to balance modern accessibility with traditional authority.

*   **Headlines (Noto Serif):** The "Voice of Authority." The elegant serif conveys history, trust, and academic rigor.
    *   *Display-LG (3.5rem):* Reserved for high-level landing page statements.
    *   *Headline-MD (1.75rem):* Standard for article titles and major section headers.
*   **Body & UI (Manrope):** The "Voice of Clarity." This modern sans-serif is optimized for long-form readability and high-density data.
    *   *Body-LG (1.0rem):* Standard article body text.
    *   *Label-MD (0.75rem):* Used for metadata, citations, and micro-copy.

**Intentional Hierarchy:** Always pair a `Headline-LG` (Serif) with a `Body-LG` (Sans-serif) to create a visual "anchor" for the reader’s eye.

---

## 4. Elevation & Depth

This system eschews the Material Design "floating" look for **Tonal Layering**.

*   **The Layering Principle:** Soft, natural lift is achieved by placing a `surface_container_lowest` card on a `surface_container_low` section. The change in hex code provides enough contrast to imply elevation without visual clutter.
*   **Ambient Shadows:** Where floating is required (e.g., a critical modal), use a "Long Shadow": 
    *   `box-shadow: 0 20px 40px rgba(43, 52, 55, 0.05);` (Using the `on_surface` color at 5% opacity).
*   **The Ghost Border:** If a visual anchor is needed for accessibility, use the `outline_variant` (#abb3b7) at **15% opacity**. This creates a "suggestion" of a boundary rather than a hard wall.

---

## 5. Components

### Buttons & Interaction
*   **Primary:** Fill with `primary` (#35618f), text in `on_primary` (#f5f7ff). Radius set to `xl` (0.75rem) for a softer, more approachable feel.
*   **Secondary:** No fill. `Ghost Border` (outline_variant @ 20%) with text in `primary`.
*   **States:** On hover, primary buttons should shift to `primary_dim`. Avoid high-energy "glow" effects.

### Cards & Informational Blocks
*   **Structure:** No divider lines. Use `Spacing-6` (2rem) of vertical white space to separate topics.
*   **Background:** Use `surface_container_lowest` for information that requires high trust (e.g., medical facts) and `surface_container` for secondary information.

### Input Fields & Search
*   **Styling:** Use `surface_container_low` as the field fill. Avoid 100% white inputs on light backgrounds to prevent "eye-flash."
*   **Focus State:** A 2px `outline` (#737c7f) at 30% opacity. 

### Scientific Lists
*   **Format:** Instead of bullet points, use `Label-MD` with a small, `primary_container` tinted square or a subtle `primary` colored dash.
*   **Spacing:** Increase line-height in lists to 1.6x to ensure scientific data is digestible.

---

## 6. Do’s and Don’ts

### Do:
*   **DO** use the `20` (7rem) spacing token for hero-to-content transitions. Ample white space is our primary branding tool.
*   **DO** use `tertiary` (#35685e) for success states or "Verified Source" badges—it provides a calm, "green-but-medical" feel.
*   **DO** ensure all text on `surface_variant` backgrounds uses `on_surface` to maintain WCAG AA accessibility standards.

### Don't:
*   **DON'T** use 100% black (#000000) for text. Use `on_surface` (#2b3437) to maintain a "soft" reading experience.
*   **DON'T** use the `full` (9999px) roundedness for buttons; it feels too "consumer-tech." Stick to `xl` (0.75rem) for a professional, clinical curve.
*   **DON'T** use traditional horizontal rules (`<hr>`). Separate sections with `surface` color shifts.
*   **DON'T** use bright, saturated red for errors. Use the muted `error` (#9f403d) to maintain the portal's calm authority.
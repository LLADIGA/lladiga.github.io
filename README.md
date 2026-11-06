# LLADIGA — Learning Language with Dialogue Games

Official website repository for **LLADIGA** (*Learning Language with Dialogue Games*), hosted at **[https://lladiga.github.io](https://lladiga.github.io)**.

LLADIGA is a 3-year bilateral research project carried out by the **University of Potsdam** (Prof. Dr. David Schlangen) and the **Free University of Bozen-Bolzano / unibz** (Prof. Raffaella Bernardi) within the bilateral collaboration framework between the **Deutsche Forschungsgemeinschaft (DFG)** — Priority Programme [SPP 2556 *LaSTing*](https://www.lasting-spp.org/) — and the **Autonomous Province of Bolzano – South Tyrol** (*D-SUD LAV*).

---

## Repository Structure

```text
.
├── index.html                  # Main semantic webpage
├── .nojekyll                   # Bypass Jekyll processing for instant static serving
└── assets/
    ├── css/
    │   └── styles.css          # Editorial design system & responsive layout
    ├── js/
    │   ├── site-data.js        # Interactive dialogue game episodes & structured data
    │   └── main.js             # Sandbox controls, publication filter & BibTeX copy
    └── img/
        ├── favicon.svg         # LLADIGA emblem
        ├── logos/              # Official Autonomous Province of Bolzano & DFG logos
        └── team/               # Consortium portraits
```

## Updating Content Over the Project Lifecycle

1. **Adding a Publication or Unveiling an Accepted Paper:**
   - Duplicate a `<article class="pub-card" data-category="peer-reviewed">` block inside `#publications` in `index.html`.
   - *Double-Blind Review Note:* Keep active anonymous submissions (e.g., ACL/EMNLP under review) out of this public repository until notification of acceptance.
2. **Adding Team Members or Collaborators:**
   - Place a square portrait (`>= 400×400 px` RGB JPEG/PNG) in `assets/img/team/` and add a `.person-card` entry under `#team` in `index.html`.
3. **Brand Compliance (Autonomous Province of Bolzano – South Tyrol):**
   - Per *Linee guida per soggetti finanziati* (pp. 54–55), `assets/img/logos/provincia-bolzano.png` in `.funder-band` must remain:
     - **Unmodified** (official trilingual red logo on `#FFFFFF` high-contrast background),
     - **Left-aligned** (`justify-content: flex-start`, positioned first even alongside other logos),
     - **At least `180 px` wide** across all viewports,
     - Surrounded by **`>= 2X` clear space** (*Area di rispetto*),
     - With textual acknowledgment placed **separately in the footer** rather than visually attached to the logo.

## Local Preview

```bash
python3 -m http.server 8080
# Open http://localhost:8080
```

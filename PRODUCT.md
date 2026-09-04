# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters and hiring managers screening for internships and entry-level software roles. Secondary: hackathon/event judges and potential collaborators evaluating shipped project work, and general networking visitors (e.g. from a LinkedIn profile link) forming a first impression. All are quick-scan visitors deciding in seconds whether to read further, click through to a project, or reach out.

## Product Purpose

A personal portfolio site for Syed Junaid Khalander, a B.E. Information Science Engineering student at Dayananda Sagar Academy of Technology and Management (DSATM), Bengaluru. It exists to get him shortlisted for internships/entry-level roles and to be a credible reference point when networking or applying to hackathons and programs. Success = a recruiter or judge can, within a scroll or two, verify real project work, technical range, and credibility (education, certifications, leadership) and take an action (view resume, open a project repo, make contact).

## Positioning

Not a generic CS-student template list of coursework — the differentiator is breadth of *shipped, working* projects across disparate domains (computer vision/networking, sustainability/design-thinking, full-stack with AI integration, accessibility tech, encrypted messaging) plus hands-on leadership (Vulcan Racing motorsport club, Formula Bharat) rather than only academic credentials.

## Operating Context

Actively used during internship application season (current driving goal). Linked from LinkedIn and GitHub profiles; canonical URL is a GitHub Pages deployment (`arachno-sapien.github.io/Portfolio`) auto-deployed via GitHub Actions on push to `main`. Visitors arrive cold with no prior context and typically on both desktop and mobile.

## Capabilities and Constraints

- Static site: plain HTML/CSS/JS, no build step, no framework, no backend.
- Sections: profile/hero, about, education, skills, certifications, projects, leadership, contact.
- Light/dark theme toggle persisted via localStorage, with system-preference default.
- Resume served as a static PDF (`assets/Resume.pdf`) opened via "View Resume" button.
- Deployment: GitHub Pages via `.github/workflows` on push to `main`. No server-side logic, no CMS — content changes are direct code edits.

## Brand Commitments

- Name: Syed Junaid Khalander. GitHub handle/brand: Arachno-Sapien.
- Existing identity assets in `assets/`: profile photo, logo/favicon (`image.png`), project screenshots, resume PDF.

## Evidence on Hand

- Real project list with descriptions, tech tags, and live GitHub repo links (7 projects: Real-time Video Transmission, Elysium, Data Structure Simulation Visualizer, Fund Management System, AdaptiControl, RetailOps AI, Bloc-Chat) — all in `index.html`.
- Real education history (DSATM, Aakash Institute × GR PU College, St. Paul's English School) with grades/dates.
- Real certifications and course list (IISc Bangalore, Infosys Springboard, DTU) and hackathon/event participation.
- Real leadership role: Vulcan Racing (college motorsport club), head of business operations for Formula Bharat 2027.
- Contact info: email, phone, LinkedIn, GitHub, Bengaluru location.
- No testimonials, case studies, press, or third-party endorsements on hand — future work must not fabricate these.

## Product Principles

1. Every claim must trace to real, verifiable evidence already in the codebase (repos, grades, certs) — never invent achievements, metrics, or testimonials.
2. Optimize for a recruiter's fast scan: credibility and project proof surface early, not buried after biography.
3. Breadth of shipped work across domains is the core differentiator — design and copy should keep that variety legible, not flatten it into a generic list.
4. Student-stage honesty over inflated seniority — confident but not overstated, since claims are easily checked against public GitHub repos.

## Accessibility & Inclusion

No specific standard mandated by the user; general web accessibility practice (contrast, keyboard nav, alt text) applies as sound default engineering, not a documented product requirement.

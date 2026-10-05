# Adnan Pal Portfolio — Living Spec

## Product

One-page personal portfolio for Adnan Pal, a B.Sc Computer Science student and full-stack developer in Navi Mumbai. The default light theme is editorial monochrome: white surfaces, black type, sharp borders, and generous whitespace. A theme toggle also supports a midnight dark variant.

## Sections and content

- Hero: staggered 3D word-reveal for “Hi, I’m Adnan Pal”, location, terminal-style profile JSON, project/contact CTAs
- About: Pillai College education (2023–2026), full-stack focus, availability, resume link
- Skills: Frontend, Backend, Database, and Tools groups
- Deployments: interactive AWS, Vercel, and Render platform tabs with services and deployment-log visuals
- Projects: Arcane, BuildNet, Trading Website, AI Website Builder, Notes Manager, and Data Structure Visualizer
- LeetCode: 62 solved problems with 28 Easy, 31 Medium, and 3 Hard; count-up numbers and scroll-triggered progress bars
- Contact: mailto, LinkedIn, GitHub, hire CTA, and copy-email interaction

## Key flows

1. Visitors use the sticky navigation or hero CTAs to jump through the one-page portfolio.
2. Visitors switch between AWS, Vercel, and Render tabs to review deployment capabilities.
3. Visitors open project repositories/live demos, the resume, or social links in their existing destinations.
4. Visitors use the mailto contact links or copy the email address. There is no backend contact form.
5. Visitors can switch between the default light mode and dark mode.

## Data and integrations

The portfolio is content-driven and does not require a third-party API or authentication. The existing FastAPI/Mongo skeleton status routes remain available but are not used by the portfolio UI. Contact is presentation-only via mailto and external social links.
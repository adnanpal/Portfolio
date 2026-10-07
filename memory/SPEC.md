# Adnan Pal Portfolio — Living Spec

## Product

One-page personal portfolio for Adnan Pal, rebuilt from the user's uploaded component architecture. The frontend uses an editorial monochrome light theme with a midnight dark variant, responsive navigation, sharp borders, generous whitespace, and one-time scroll-triggered motion. Backend files are intentionally untouched.

## Sections and content

- Hero: staggered 3D word-reveal for “Hi, I’m Adnan Pal”, location, terminal-style profile JSON, project/contact CTAs
- About: animated section heading, Pillai College education (2023–2026), full-stack focus, availability, resume link
- Skills: animated section heading plus Frontend, Backend, Database, and Tools groups
- Deployments: one-time “Ship it / Scale it” text-up reveal with interactive AWS, Vercel, and Render tabs, services, operational state, and deployment-log visuals
- Projects: Arcane, BuildNet, Trading Website, AI Website Builder, Notes Manager, and Data Structure Visualizer
- LeetCode: live LeetPulse requests for solved totals, difficulty breakdown, and recent submissions; 5-minute polling and visibility refresh remain intact
- Contact: preserved mailto form, LinkedIn, GitHub, hire CTA, and resume download

## Key flows

1. Visitors use the sticky navigation or hero CTAs to smoothly jump through the one-page portfolio, including from the mobile menu with a fixed-header offset.
2. Visitors switch between AWS, Vercel, and Render to review deployment services and status logs.
3. Visitors open project repositories/live demos, the resume, or social links in their existing destinations.
4. Visitors view live LeetCode stats and optionally expand recent submissions.
5. Visitors submit the existing contact form, which validates required fields and opens their configured email client through a mailto URL.
6. Visitors can switch between the default light mode and dark mode; preference persists locally.

## Data and integrations

The frontend calls the existing public LeetPulse API directly for LeetCode stats and recent submissions. It needs no API key. The FastAPI/Mongo backend remains unchanged and is not used by the portfolio UI. Contact uses mailto rather than a backend endpoint.
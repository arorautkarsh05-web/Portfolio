import { ProjectLandmark } from '../types';

export const featuredProjects: ProjectLandmark[] = [
  {
    id: "bayora",
    title: "BAYORA",
    category: "AI Security & Safety Testing",
    shortDescription: "Secure adversarial AI safety testing infrastructure with strict red/blue isolation.",
    fullDescription: "A controlled evaluation environment for AI models with strictly isolated red-team inputs, blue-team defenses, model state, and a tamper-evident audit trail. Bayora eliminates test contamination by enforcing cryptographic boundaries and verifiable state proofs.",
    highlights: [
      "Strictly isolated red-team and blue-team storage workspaces with canary decoys",
      "Tamper-evident, append-only cryptographic audit trail with SHA-256 hash chaining",
      "Ed25519 cryptographic signing authority for verifiable test outputs",
      "Proof Mode evaluation dashboard for independent auditor verification",
      "Controlled single-host evaluation environment preventing artifact leakage"
    ],
    technologies: ["FastAPI", "Python", "Next.js", "PostgreSQL", "Docker", "Ed25519", "SHA-256"],
    repository: "https://github.com/arorautkarsh05-web/Bayora",
    architectureNote: "Evaluator architecture verified from repository README; implements isolated namespaces for Red-Team, Blue-Team, Model Internal, and Append-Only Audit log.",
    accentColor: "#ef4444", // Crimson security red
    districtCoordinates: [-46, 0, -54]
  },
  {
    id: "ustaad",
    title: "EUROGRIP USTAAD NETWORK",
    category: "Full-Stack Engineering & Automotive Ecosystem",
    shortDescription: "Intelligent mechanic empowerment and verified brand advocacy ecosystem for TVS Eurogrip.",
    fullDescription: "An enterprise-grade digital ecosystem built to transform TVS Eurogrip's relationship with India's vast network of two-wheeler mechanics, authorized tyre dealers, and consumers. Replaces counterfeit-prone coupons with QR-authenticated digital passports.",
    highlights: [
      "Fitment Passport with QR authentication providing tamper-proof warranty and fitment validation",
      "Ustaad Academy interactive modules for automotive technician upskilling",
      "ToolBank Hub zero-capital equipment sharing marketplace across workshops",
      "Role-Based Access Control (RBAC) across mechanics, dealers, and administrators",
      "Decoupled client-server architecture with ACID-compliant MySQL relational transactions"
    ],
    technologies: ["React", "Node.js", "Express", "MySQL", "TypeScript", "Tailwind CSS"],
    repository: "https://github.com/arorautkarsh05-web/Ustaad",
    architectureNote: "Architected by Utkarsh Arora (Lead Developer & System Architect, Team Code Slayers) with strict ACID transactions.",
    accentColor: "#00d2ff", // Electric cyan blue
    districtCoordinates: [46, 0, -54]
  },
  {
    id: "paypal-resolve",
    title: "PAYPAL RESOLVE",
    category: "FinTech & AI Payment Intelligence",
    shortDescription: "AI-powered payment intelligence, transaction reconciliation, and automated resolution platform.",
    fullDescription: "Bridges the operational gap between raw PayPal webhook events and merchant Order Management Systems (OMS). Automates investigation of unmatched payments, currency mismatches, pending captures, duplicate retry risks, and disputes.",
    highlights: [
      "Automated 7-step pipeline: Detect ➔ Investigate ➔ Reconcile ➔ Decide ➔ Approve ➔ Execute ➔ Verify",
      "Deterministic FinTech guardrails: AI agent investigates and recommends while deterministic policies validate",
      "Idempotency keys, cumulative refund ceilings, and mandatory merchant approval workflows",
      "Authoritative Node.js + SQLite application server with ACID transactions (`BEGIN IMMEDIATE`)",
      "Separate FastAPI prototype microservice preserved as independent reference architecture"
    ],
    technologies: ["Node.js", "SQLite", "FastAPI", "Python", "React", "PayPal SDK", "ACID Transactions"],
    repository: "https://github.com/arorautkarsh05-web/PayPal-Resolve",
    architectureNote: "Dual-backend architecture: Authoritative Node.js/SQLite server drives the core platform and sandbox scenarios, while the FastAPI directory serves as an independent prototype.",
    accentColor: "#f59e0b", // FinTech gold
    districtCoordinates: [28, 0, -18]
  },
  {
    id: "webguard-ai",
    title: "WEBGUARD AI",
    category: "AI Automation & Website Reliability",
    shortDescription: "Autonomous website reliability, competitive intelligence, and browser automation platform.",
    fullDescription: "An intelligent website monitoring and competitive intelligence SaaS platform. Combines continuous HTTP availability checks with TinyFish API web intelligence (Search, Fetch, and Agent browser automation) to detect website anomalies and track competitor shifts.",
    highlights: [
      "Continuous HTTP availability fleet with roundtrip latency benchmarking and redirect chain audits",
      "Autonomous functional smoke testing powered by TinyFish Agent headless browser automation",
      "Automated competitor surveillance, price point extraction, and promotion tracking via TinyFish Search",
      "DOM change detection & visual diff viewer powered by TinyFish Fetch",
      "Built-in SSRF protection blocking loopback, private RFC1918 subnets, and cloud metadata endpoints"
    ],
    technologies: ["Next.js", "TypeScript", "TinyFish API", "Python", "Tailwind CSS", "Browser Automation"],
    repository: "https://github.com/arorautkarsh05-web/WebGuard-AI",
    architectureNote: "Safety policy enforces non-destructive automation with strict stopping guardrails prior to payment steps or irreversible actions.",
    accentColor: "#8b5cf6", // Royal purple
    districtCoordinates: [74, 0, 6]
  }
];


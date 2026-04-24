export type PortfolioContent = {
  identity: {
    name: string;
    title: string;
    location: string;
    githubUsername: string;
    githubUrl: string;
    linkedinUrl: string;
    email: string;
  };
  hero: {
    profileImage: {
      src: string;
      alt: string;
    };
    scramblePhrases: string[];
    intro: string;
    primaryCta: {
      label: string;
      href: string;
    };
    secondaryCta: {
      label: string;
      href: string;
    };
  };
  about: {
    summary: string;
    highlights: Array<{
      year: string;
      role: string;
      detail: string;
      href?: string;
    }>;
  };
  skills: Array<{
    name: string;
    badge: string;
    iconSrc?: string;
    description: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    href: string;
    repoHref?: string;
    tags: string[];
    maxTagRows?: 1 | 2;
  }>;
  contact: {
    videoSrc: string;
    bookingUrl: string;
    bookingLabel: string;
    blurb: string;
  };
};

export function getPortfolioContent(): PortfolioContent {
  return {
    identity: {
      name: "Nay Ayeyar",
      title: "Software Engineer / AI Engineer",
      location: "Dallas, TX",
      githubUsername: "nayeyar",
      githubUrl: "https://github.com/nayeyar",
      linkedinUrl: "https://www.linkedin.com/in/nay-ayeyar-8622b11a4",
      email: "nayayeyar2230@gmail.com",
    },
    hero: {
      profileImage: {
        src: "/resources/images/profilepic_788x788.png",
        alt: "Portrait of Nay Ayeyar",
      },
      scramblePhrases: [
        "Building software with product taste.",
        "Engineering AI experiences that feel useful.",
        "Turning ideas into fast, reliable systems.",
        "Shipping from concept to production.",
      ],
      intro:
        "I design and build modern web products, AI workflows, and engineering systems that are clear, fast, and ready for production.",
      primaryCta: {
        label: "Book a Call",
        href: "/contact",
      },
      secondaryCta: {
        label: "View GitHub",
        href: "https://github.com/nayeyar",
      },
    },
    about: {
      summary:
        "I work across frontend, backend, and applied AI with a bias for clean implementation, practical UX, and systems that can scale without becoming fragile.",
      highlights: [
        {
          year: "2025-2026",
          role: "AI Engineer",
          detail:
            "Building applied AI workflows and product-facing intelligence systems on top of large-scale platform and delivery experience at Verizon.",
          href: "https://www.verizon.com/",
        },
        {
          year: "2023-2024",
          role: "Full Stack Engineer",
          detail:
            "Worked primarily on backend-focused full-stack engineering for Verizon microservice and customer experience systems.",
          href: "https://www.verizon.com/",
        },
        {
          year: "2021-2022",
          role: "System Analyst",
          detail:
            "Supported analysis, systems design, and internal tooling work for NYCDOE platforms and operational workflows.",
          href: "https://infohub.nyced.org/",
        },
        {
          year: "2020",
          role: "Web Analyst",
          detail:
            "Managed websites, content operations, and web publishing workflows for NYC Department of Education properties.",
          href: "https://www.schools.nyc.gov/",
        },
      ],
    },
    skills: [
      {
        name: "GitLab",
        badge: "GL",
        iconSrc: "https://img.icons8.com/color/96/gitlab.png",
        description: "Repository management, merge workflows, and CI/CD automation in GitLab ecosystems.",
      },
      {
        name: "Jira",
        badge: "JR",
        iconSrc: "https://img.icons8.com/color/96/jira.png",
        description: "Backlog planning, issue tracking, sprint management, and delivery coordination.",
      },
      {
        name: "Kotlin",
        badge: "KT",
        iconSrc: "https://img.icons8.com/color/96/kotlin.png",
        description: "Strongly typed JVM development for backend services and platform integrations.",
      },
      {
        name: "Python",
        badge: "PY",
        iconSrc: "https://img.icons8.com/fluency/96/python.png",
        description: "Automation, APIs, AI integrations, and backend tooling.",
      },
      {
        name: "JavaScript",
        badge: "JS",
        iconSrc: "https://img.icons8.com/fluency/96/javascript.png",
        description: "Interactive web applications and product-focused frontend engineering.",
      },
      {
        name: "React",
        badge: "RE",
        iconSrc:
          "https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/external-react-a-javascript-library-for-building-user-interfaces-logo-color-tal-revivo.png",
        description: "Component systems, modern app architecture, and polished UI implementation.",
      },
      {
        name: "Java",
        badge: "JV",
        iconSrc: "https://img.icons8.com/fluency/96/java-coffee-cup-logo.png",
        description: "Enterprise services, backend integrations, and long-lived systems.",
      },
      {
        name: "Node.js",
        badge: "ND",
        iconSrc: "https://img.icons8.com/fluency/96/node-js.png",
        description: "Server-side JavaScript, APIs, and event-driven service implementation.",
      },
      {
        name: "Spring",
        badge: "SP",
        iconSrc: "https://img.icons8.com/color/96/spring-logo.png",
        description: "Java backend services, dependency management, and enterprise application structure.",
      },
      {
        name: "Docker",
        badge: "DK",
        iconSrc: "https://img.icons8.com/fluency/96/docker.png",
        description: "Containerized development, packaging, and consistent deployment workflows.",
      },
      {
        name: "Jenkins",
        badge: "JK",
        iconSrc: "https://img.icons8.com/color/96/jenkins.png",
        description: "Build automation, CI pipelines, and operational release workflows.",
      },
      {
        name: "Kubernetes",
        badge: "K8",
        iconSrc: "https://img.icons8.com/color/96/kubernetes.png",
        description: "Container orchestration, scaling, service management, and resilient deployments.",
      },
      {
        name: "Nginx",
        badge: "NG",
        iconSrc: "https://img.icons8.com/color/96/nginx.png",
        description: "Reverse proxy routing, load balancing, caching, and web server optimization.",
      },
      {
        name: "Apache Spark",
        badge: "SP",
        iconSrc: "https://img.icons8.com/color/96/apache-spark.png",
        description: "Distributed data processing for large-scale analytics and computation workflows.",
      },
      {
        name: "AWS",
        badge: "AW",
        iconSrc: "https://img.icons8.com/color/96/amazon-web-services.png",
        description: "Cloud infrastructure, managed services, and production deployment environments.",
      },
      {
        name: "TypeScript",
        badge: "TS",
        iconSrc: "https://img.icons8.com/fluency/96/typescript--v2.png",
        description: "Type-safe JavaScript architecture for maintainable frontend and backend codebases.",
      },
      {
        name: "Angular",
        badge: "AN",
        iconSrc: "https://img.icons8.com/fluency/96/angularjs.png",
        description: "Structured SPA development with component architecture and enterprise-ready patterns.",
      },
      {
        name: "Vue",
        badge: "VU",
        iconSrc: "https://img.icons8.com/fluency/96/vuejs.png",
        description: "Progressive frontend development with reactive components and lightweight composition.",
      },
      {
        name: "Google Cloud",
        badge: "GC",
        iconSrc: "https://img.icons8.com/fluency/96/google-cloud.png",
        description: "Cloud services for compute, storage, and scalable application infrastructure.",
      },
      {
        name: "Azure",
        badge: "AZ",
        iconSrc: "https://img.icons8.com/fluency/96/azure-1.png",
        description: "Enterprise cloud tooling, deployment pipelines, and managed service integration.",
      },
      {
        name: "GitHub",
        badge: "GH",
        iconSrc: "https://img.icons8.com/fluency/96/github.png",
        description: "Version control, collaboration, CI workflows, and shipping discipline.",
      },
      {
        name: "MySQL",
        badge: "MY",
        iconSrc: "https://img.icons8.com/fluency/96/mysql-logo.png",
        description: "Relational data modeling, query optimization, and transactional data operations.",
      },
      {
        name: "Redis",
        badge: "RD",
        iconSrc: "https://img.icons8.com/fluency/96/redis.png",
        description: "In-memory caching, pub/sub messaging, and fast state access patterns.",
      },
      {
        name: "Bootstrap",
        badge: "BS",
        iconSrc: "https://img.icons8.com/fluency/96/bootstrap.png",
        description: "Responsive UI scaffolding with utility-driven component patterns.",
      },
      {
        name: "CSS3",
        badge: "CS",
        iconSrc: "https://img.icons8.com/fluency/96/css3.png",
        description: "Modern styling, layout systems, and motion-driven visual interfaces.",
      },
      {
        name: "HTML5",
        badge: "HT",
        iconSrc: "https://img.icons8.com/fluency/96/html-5.png",
        description: "Semantic document structure and accessible markup for modern web applications.",
      },
      {
        name: "Cursor",
        badge: "CU",
        iconSrc: "https://img.icons8.com/fluency/96/cursor-ai.png",
        description: "AI-assisted development workflows for faster iteration and code generation.",
      },
      {
        name: "Figma",
        badge: "FG",
        iconSrc: "https://img.icons8.com/fluency/96/figma.png",
        description: "Collaborative interface design, prototyping, and design-system handoff workflows.",
      },
      {
        name: ".NET",
        badge: "DN",
        iconSrc: "https://img.icons8.com/fluency/100/net-framework.png",
        description: "Microsoft ecosystem development for backend services and enterprise applications.",
      },
      {
        name: "Linux",
        badge: "LX",
        iconSrc:
          "https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/external-linux-a-family-of-open-source-unix-like-operating-systems-based-on-the-linux-kernel-logo-color-tal-revivo.png",
        description: "Unix-based systems operations, server management, and command-line tooling.",
      },
      {
        name: "PostgreSQL",
        badge: "PG",
        iconSrc:
          "https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/external-postgre-sql-a-free-and-open-source-relational-database-management-system-logo-color-tal-revivo.png",
        description: "Advanced relational database design, querying, and production-grade data integrity.",
      },
      {
        name: "Postman",
        badge: "PM",
        iconSrc:
          "https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/external-postman-is-the-only-complete-api-development-environment-logo-color-tal-revivo.png",
        description: "API testing, contract validation, collection automation, and integration debugging.",
      },
      {
        name: "MongoDB",
        badge: "MG",
        iconSrc:
          "https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/external-mongodb-a-cross-platform-document-oriented-database-program-logo-color-tal-revivo.png",
        description: "Document database modeling and flexible schema design for dynamic application data.",
      },
      {
        name: "FastAPI",
        badge: "FA",
        iconSrc: "/resources/icons/FastAPI.png",
        description: "High-performance Python APIs with typed contracts and async-first patterns.",
      },
      {
        name: "RabbitMQ",
        badge: "RM",
        iconSrc: "/resources/icons/RabbitMQ.png",
        description: "Message queue infrastructure for reliable asynchronous event and job delivery.",
      },
    ],
    projects: [
      {
        name: "DashFlow",
        description:
          "A team task workspace for coordinating work across workspace, project, and task layers with deployment-ready backend operations.",
        href: "https://dashflow-lac.vercel.app/",
        repoHref: "https://github.com/Nomad-Agent/dashflow",
        tags: [
          "FastAPI",
          "TypeScript",
          "Docker",
          "Container Hardening",
          "Startup Migrations"
        ],
        maxTagRows: 2,
      },
      {
        name: "LogiMesh",
        description:
          "A logistics integration platform centered on event-driven backend flows, service reliability, and operational visibility.",
        href: "https://logimesh.vercel.app/",
        repoHref: "https://github.com/nayeyar/logimesh",
        tags: [
          "Event-Driven System",
          "RabbitMQ",
          "Workflow Orchestration",
          "Ansible"
        ],
        maxTagRows: 2,
      },
      {
        name: "Random Quote Generator",
        description:
          "A lightweight frontend app that fetches and presents quotes through a clean interaction loop.",
        href: "/projects/Random%20Quote%20Generator/index.html",
        tags: ["HTML", "CSS", "JavaScript"],
      },
      {
        name: "Portfolio Rebuild",
        description:
          "A redesign system focused on performance, motion, theming, and reusable content architecture.",
        href: "https://github.com/nayeyar/nayeyar.github.io",
        tags: ["Next.js", "Tailwind", "Motion"],
      },
    ],
    contact: {
      videoSrc: "/resources/images/video.mp4",
      bookingUrl: "#booking-link",
      bookingLabel: "Reserve a Strategy Call",
      blurb:
        "For consulting, freelance build work, and AI product collaboration, start with a booking request or reach out directly.",
    },
  };
}

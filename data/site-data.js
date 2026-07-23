// Single source of truth for site content. app.js reads this and renders every section.
window.SITE_DATA = {
  name: "Vishwa Patel",
  role: "Software Engineer",
  roles: ["Software Engineer", "Backend Builder", "Full-Stack Developer", "MS CS @ USC"],
  location: "Los Angeles, CA",
  tagline: "Backend engineer building reliable data pipelines and full-stack products. Currently pursuing an MS in Computer Science at USC.",
  photo: "assets/profile.jpg",
  email: "vishwasa@usc.edu",
  phone: "(213)-829-3399",
  githubUsername: "vishwapatel24051",
  social: {
    github: "https://github.com/vishwapatel24051",
    linkedin: "https://www.linkedin.com/in/vishwapatel2405/",
    resume: "Resume_VishwaPatel.pdf"
  },

  stats: [
    { value: 3, suffix: "+", label: "years in industry" },
    { value: 8, suffix: "+", label: "production features shipped" },
    { value: 90, suffix: "%", label: "throughput improvement" },
    { value: 15, suffix: "", label: "support tickets resolved / week" }
  ],

  about: "I'm a software engineer with three years at Casepoint building the backbone of a legal-tech extraction pipeline: recovering corrupted mailbox files, parallelizing document processing, and giving teams real-time visibility into pipeline state. I'm now pursuing an MS in Computer Science at USC (graduating December 2027), and building full-stack projects on the side — a job board with an AI resume analyzer, a DNA sequence alignment tool, and a Flutter pharmacy app.",

  skills: [
    { group: "Languages", items: ["Java", "Python", "C++", "C#", "C", "JavaScript", "Dart", "HTML", "CSS"] },
    { group: "Databases", items: ["PostgreSQL", "MySQL", "SQLite", "Cassandra", "HBase"] },
    { group: "Frameworks & Tools", items: ["Spring Boot", "Spring MVC", "ReactJS", "Flutter", "Docker", "Redis", "Elasticsearch", "RabbitMQ", "jQuery", "Git"] }
  ],

  experience: [
    {
      company: "Casepoint Pvt. Ltd",
      location: "Gujarat, India",
      role: "Software Engineer",
      start: "May 2025",
      end: "June 2025",
      bullets: [
        "Implemented custom field selection in the legal hold reporting module, reducing report generation time by 30% and giving clients configurable, self-service reporting flexibility while maintaining regulatory compliance.",
        "Resolved 10–20 high-priority production support tickets weekly related to file extraction and processing failures, performing root-cause analysis and code-level fixes to meet client SLAs."
      ]
    },
    {
      company: "Casepoint Pvt. Ltd",
      location: "Gujarat, India",
      role: "Associate Software Engineer",
      start: "July 2023",
      end: "May 2025",
      bullets: [
        "Redesigned the extraction workflow for parallel processing, boosting throughput by ~90% over the single-threaded design.",
        "Engineered a PST repair service with automated recovery, retry logic, and concurrency control for corrupted mailbox files, cutting manual intervention by 50–70%.",
        "Designed a Redis-based status tracking system spanning 6+ processing stages, reducing status update latency by 80%.",
        "Extended the metadata extraction service to support a new file format for forensic analysis, plus a companion agent to track audio-peak collection progress in real time.",
        "Upgraded core extraction libraries (Oracle, Aspose, VintaSoft), cutting extraction errors and failures by 40%+.",
        "Collaborated with 5+ cross-functional product and engineering stakeholders to deliver 8+ production features end to end."
      ]
    },
    {
      company: "Casepoint Pvt. Ltd",
      location: "Gujarat, India",
      role: "Software Engineer Intern",
      start: "January 2023",
      end: "June 2023",
      bullets: [
        "Developed a desktop-based Recruitment System using .NET MVC, C#, Windows Forms, PostgreSQL, and Kendo UI, implementing 20+ UI screens and comprehensive client/server-side validations.",
        "Integrated RabbitMQ for asynchronous internal messaging between application components, delivering features in an Agile development cycle."
      ]
    },
    {
      company: "Amiseq",
      location: "Pune, India",
      role: "Software Engineering Intern (Backend)",
      start: "June 2022",
      end: "July 2022",
      bullets: [
        "Developed 10+ RESTful API endpoints using Spring Boot and PostgreSQL, implementing CRUD operations and modular services following a microservices architecture.",
        "Tested and debugged API endpoints with Postman, catching integration issues before deployment."
      ]
    }
  ],

  projects: [
    {
      name: "TechHire",
      subtitle: "AI Job Search Platform",
      start: "May 2026",
      end: "June 2026",
      url: "https://github.com/vishwapatel24051/TechHire",
      description: "Full-stack job board (200+ live postings) with fast search/filtering by skills, salary, visa sponsorship, and work mode, backed by a search API averaging ~7ms response time. Includes an AI resume analyzer (Groq/Llama, three-model pipeline) that scores candidate fit 0–100 and rewrites weak bullets against the target job.",
      metrics: [
        { value: "200+", label: "live postings" },
        { value: "~7ms", label: "search API" },
        { value: "85pt", label: "fit-score spread" }
      ],
      stack: ["Python", "FastAPI", "React", "PostgreSQL", "Docker", "Groq"]
    },
    {
      name: "Sequence Alignment",
      subtitle: "Global DNA Sequence Alignment",
      start: "April 2026",
      end: "May 2026",
      url: "https://github.com/vishwapatel24051/Sequence-Alignment",
      description: "Global DNA sequence alignment implemented two ways — Needleman-Wunsch dynamic programming and Hirschberg's divide-and-conquer — cutting space from O(mn) to O(m+n) with identical optimal alignments. Benchmarked CPU time and peak memory across input sizes.",
      metrics: [
        { value: "O(m+n)", label: "space, down from O(mn)" },
        { value: "2", label: "algorithms benchmarked" }
      ],
      stack: ["Python"]
    },
    {
      name: "Speed Medilane",
      subtitle: "Medicine Ordering & Pharmacy App",
      start: "March 2026",
      end: "May 2026",
      url: "https://github.com/vishwapatel24051/Speed_Medilane",
      description: "Cross-platform Flutter app for medicine search, daily medication reminders, nearby pharmacy lookup, and preorders. Integrated Supabase PostgreSQL with Row Level Security and SECURITY DEFINER RPCs, blocking direct table access from the client.",
      metrics: [],
      stack: ["Flutter", "Dart", "Supabase", "PostgreSQL"]
    }
  ],

  education: [
    {
      school: "University of Southern California",
      location: "CA, USA",
      degree: "M.S. Computer Science",
      start: "January 2026",
      end: "December 2027",
      gpa: "3.66/4",
      notes: "Analysis of Algorithms, Web Technologies, Database Systems, Agentic AI, Natural Language Processing"
    },
    {
      school: "Gujarat Technological University",
      location: "Gujarat, India",
      degree: "B.E. Computer Engineering",
      start: "August 2019",
      end: "June 2023",
      gpa: "8.98/10",
      notes: "Data Structures, OOP Principles, Theory of Computation, Compiler Design, Software Engineering, Operating Systems"
    }
  ],

  awards: [
    { title: "Python for Everybody Specialization", issuer: "Coursera", note: "Python, databases, web scraping, and data visualization" },
    { title: "Casepoint Excellence Award 2024", issuer: "Sprint Delivery Standout", note: "Awarded for outstanding sprint delivery and performance" }
  ]
};

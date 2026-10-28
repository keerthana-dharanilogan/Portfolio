/**
 * KEERTHANA DHARANILOGAN — PROFESSIONAL PORTFOLIO
 * UI/UX Designer | Web Designer
 * Interactive Behaviors, Case Study Modal, and Micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHeader();
  initMobileNav();
  initScrollSpy();
  initProjectFilter();
  initCaseStudyModal();
  initCopyEmail();
  initContactForm();
  initScrollReveal();
  initBackToTop();
});

/* ==========================================================================
   1. Theme Management (Light / Dark Mode)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('kd_portfolio_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('kd_portfolio_theme', newTheme);
  });
}

/* ==========================================================================
   2. Header & Scroll Effects
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   3. Mobile Navigation
   ========================================================================== */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (!toggle || !navMenu) return;

  toggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('open');
    toggle.classList.toggle('active');
    navMenu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', !isOpen);
  });

  // Close when clicking a nav link
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navMenu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      toggle.classList.remove('active');
      navMenu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   4. ScrollSpy (Active Section Navigation)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -70% 0px'
  });

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   5. Project Filtering
   ========================================================================== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-categories') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'grid';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   6. Case Study Modal Data & System
   ========================================================================== */
const projectCaseStudies = {
  siechem: {
    title: "Siechem Technologies Corporate Digital Ecosystem",
    category: "Corporate Web Design & WordPress Development",
    role: "Lead Web Designer (Siechem Technologies Pvt. Ltd.)",
    duration: "June 2023 – Present",
    tools: ["WordPress", "WPBakery", "HTML5", "CSS3", "JavaScript", "Figma", "Photoshop"],
    heroImg: "images/projects/siechem.jpg",
    overview: "Designed, developed, and deployed the corporate web ecosystem for Siechem Technologies, a premier manufacturer of specialized wires and cables for aerospace, defense, automotive, solar, and railway industries.",
    tabs: {
      overview: `
        <div class="cs-section">
          <h4>Project Summary & Scope</h4>
          <p>Siechem Technologies required a modern digital transformation to present their high-performance specialty cable lines to global procurement teams, defense contractors, and engineering leads. As the in-house Web Designer, I led the complete UI redesign and WordPress implementation across 3 company web properties.</p>
          <div class="cs-grid-2">
            <div class="cs-card">
              <h5>My Core Responsibilities</h5>
              <p>• End-to-end wireframing, UI prototyping, and responsive layout design.<br>
                 • Custom WordPress theme development using WPBakery, HTML5, CSS3, and JavaScript.<br>
                 • Designing technical product catalog templates and filter structures.<br>
                 • Producing digital marketing creatives, brochures, banners, and product visuals.</p>
            </div>
            <div class="cs-card">
              <h5>Project Architecture</h5>
              <p>• Multi-property WordPress infrastructure.<br>
                 • High-density technical specification tables with responsive scrolling.<br>
                 • Lead generation quotation workflows with instant email dispatch.<br>
                 • Cross-browser testing and mobile speed optimization.</p>
            </div>
          </div>
        </div>
      `,
      problem: `
        <div class="cs-section">
          <h4>The Challenge & Objectives</h4>
          <p>The previous company website had accumulated years of technical debt: non-responsive desktop-only layouts, unstructured PDF-only cable specifications, slow page loading speeds, and severe friction for mobile industrial buyers looking for compliance certifications (AS9100, EN 50264, ISO/TS 16949).</p>
          <div class="cs-grid-2">
            <div class="cs-card">
              <h5>Client & User Pain Points</h5>
              <p>• Industrial buyers couldn't quickly search or filter cables by temperature, voltage, or industry.<br>
                 • Mobile visitors experienced broken tables and cumbersome PDF downloads.<br>
                 • Outdated corporate visual language did not reflect Siechem's advanced manufacturing facilities.</p>
            </div>
            <div class="cs-card">
              <h5>Project Goals</h5>
              <p>• Deliver a clean, high-contrast, editorial corporate aesthetic.<br>
                 • Standardize product catalog pages with clean technical spec tables.<br>
                 • Achieve 100% mobile responsiveness across smartphones and tablets.<br>
                 • Streamline the Request a Quote procurement funnel.</p>
            </div>
          </div>
        </div>
      `,
      process: `
        <div class="cs-section">
          <h4>Design & Development Process</h4>
          <p>Following a user-centered development process, I aligned closely with Siechem's product engineering and marketing teams to structure product hierarchies:</p>
          <div class="cs-card" style="margin-bottom: 16px;">
            <h5>1. Information Architecture & Wireframing</h5>
            <p>Mapped out the entire catalog hierarchy covering 6 primary sectors: Aerospace, Railway, Defense, Solar, Automotive, and Industrial Automation. Created low-fidelity wireframes in Figma to validate navigation depth and technical table responsiveness.</p>
          </div>
          <div class="cs-card" style="margin-bottom: 16px;">
            <h5>2. WordPress & Frontend Implementation</h5>
            <p>Built responsive page templates with clean modular components in WordPress and WPBakery. Handcrafted custom CSS for sticky product filters, interactive accordions for compliance data, and optimized image assets for rapid loading.</p>
          </div>
          <div class="cs-card">
            <h5>3. Cross-Team Collaboration & Marketing Creatives</h5>
            <p>Designed synchronized marketing materials using Photoshop and Illustrator, ensuring digital catalog visuals, tradeshow banners, and downloadable product sheets shared a unified corporate identity.</p>
          </div>
        </div>
      `,
      screens: `
        <div class="cs-section">
          <h4>Final Implementation & Features</h4>
          <p>The deployed corporate ecosystem delivers an authoritative, high-performance experience for domestic and international B2B buyers:</p>
          <div class="case-study-banner">
            <img src="images/projects/siechem.jpg" alt="Siechem Technologies Final Web UI" style="width:100%; border-radius:8px;">
          </div>
          <div class="cs-grid-2">
            <div class="cs-card">
              <h5>Interactive Product Catalog</h5>
              <p>Category-based grid with immediate visual cues for aerospace, naval, and automotive cables, linking directly to technical data sheets.</p>
            </div>
            <div class="cs-card">
              <h5>Responsive Technical Tables</h5>
              <p>Smoothly scrollable, legible specification tables that adapt gracefully to handheld screens without cutting off conductor dimensions or voltage ratings.</p>
            </div>
          </div>
        </div>
      `,
      learnings: `
        <div class="cs-section">
          <h4>Outcomes & Professional Growth</h4>
          <p>Deploying 3 company websites in an industrial manufacturing context strengthened my ability to bridge UX design with practical business realities:</p>
          <div class="cs-grid-2">
            <div class="cs-card">
              <h5>Real-World Deliverables</h5>
              <p>• Successfully launched 3 live company websites with zero downtime.<br>
                 • Reduced user steps to submit a quotation from 5 to 2 clicks.<br>
                 • Established a reusable corporate visual design language across web and marketing channels.</p>
            </div>
            <div class="cs-card">
              <h5>Key Lessons Learned</h5>
              <p>Designing for complex industrial datasets requires prioritizing typography, information hierarchy, and data readability over decorative clutter. Close collaboration with product engineers is vital for domain accuracy.</p>
            </div>
          </div>
        </div>
      `
    }
  },

  finpulse: {
    title: "FinPulse — Digital Banking & Wealth Mobile App",
    category: "UI/UX Case Study (Concept Project)",
    role: "Lead UI/UX Designer (Google UX Design Framework)",
    duration: "Concept Case Study",
    tools: ["Figma", "FigJam", "Design Systems", "Prototyping", "Google UX Methodology"],
    heroImg: "images/projects/finpulse-fintech.jpg",
    overview: "A comprehensive, end-to-end UI/UX case study demonstrating user research, empathy mapping, wireframing, design systems, and high-fidelity mobile app design for modern personal banking and wealth management.",
    tabs: {
      overview: `
        <div class="cs-section">
          <h4>Concept Case Study Overview</h4>
          <p>FinPulse is a concept digital banking application designed to make financial health, budgeting, and recurring payment tracking effortless for young working professionals. Designed as part of applying the Google UX Design Professional Certificate methodology, this project showcases full design lifecycle thinking.</p>
          <div class="cs-grid-2">
            <div class="cs-card">
              <h5>Project Goals</h5>
              <p>• Simplify everyday banking interactions to under 3 taps.<br>
                 • Provide clear, non-judgmental spending analytics with visual donut breakdowns.<br>
                 • Create an accessible, modern design system with WCAG AA compliance.<br>
                 • Eliminate financial anxiety through clear hierarchy and predictable actions.</p>
            </div>
            <div class="cs-card">
              <h5>UX Design Toolkit</h5>
              <p>• User Personas & Journey Mapping in FigJam.<br>
                 • Paper & Digital Low-Fidelity Wireframing.<br>
                 • Interactive Component Architecture with Auto-Layout.<br>
                 • Usability Testing and Iteration Cycles.</p>
            </div>
          </div>
        </div>
      `,
      problem: `
        <div class="cs-section">
          <h4>Problem Statement & User Insights</h4>
          <p>Traditional banking apps are notorious for overwhelming users with legacy menus, ambiguous transaction statements, and rigid categorization. Users often resort to third-party spreadsheets or abandon tracking altogether.</p>
          <div class="cs-grid-2">
            <div class="cs-card">
              <h5>User Research Findings</h5>
              <p>• 72% of surveyed users expressed anxiety when opening traditional bank apps due to cluttered promotions.<br>
                 • Unrecognized merchant abbreviations caused confusion in transaction logs.<br>
                 • Users wanted instant clarity on how much they could safely spend before their next paycheck.</p>
            </div>
            <div class="cs-card">
              <h5>Persona Archetype</h5>
              <p><strong>Alex, 27 — Product Specialist</strong><br>
                 Needs a banking app that automatically categorizes food, rent, and investments while giving a one-glance view of daily safe-to-spend limits without tedious manual setup.</p>
            </div>
          </div>
        </div>
      `,
      process: `
        <div class="cs-section">
          <h4>Design Process & Iterations</h4>
          <p>Applying the 5-stage Google UX Design framework: Empathize, Define, Ideate, Prototype, and Test:</p>
          <div class="cs-card" style="margin-bottom: 16px;">
            <h5>1. Information Architecture & User Flow</h5>
            <p>Mapped user flows for the 3 primary jobs-to-be-done: checking total balance/spend breakdown, making a quick payment, and reviewing categorized activity. Minimized navigation depth to a streamlined 4-tab bottom bar.</p>
          </div>
          <div class="cs-card" style="margin-bottom: 16px;">
            <h5>2. Low-Fidelity Wireframes to High-Fidelity UI</h5>
            <p>Sketched multiple dashboard arrangements to test whether a circular chart or horizontal bar gave faster comprehension. Wireframe testing showed that a central donut chart with immediate legend tap filters was the most intuitive.</p>
          </div>
          <div class="cs-card">
            <h5>3. Design System & Accessibility</h5>
            <p>Formulated an electric indigo/violet primary color system with high-contrast text tokens, generous 44px+ tap targets, clear iconography, and standardized card elevations.</p>
          </div>
        </div>
      `,
      screens: `
        <div class="cs-section">
          <h4>High-Fidelity UI Showcase</h4>
          <p>The polished mobile experience features clean visual balance, crisp cards, and purposeful whitespace:</p>
          <div class="case-study-banner">
            <img src="images/projects/finpulse-fintech.jpg" alt="FinPulse Mobile UI Showcase" style="width:100%; border-radius:8px;">
          </div>
          <div class="cs-grid-2">
            <div class="cs-card">
              <h5>Home Dashboard</h5>
              <p>Clean balance hero card with expandable spending donut, quick transfer action chips, and a visual progress indicator for savings goals.</p>
            </div>
            <div class="cs-card">
              <h5>Activity Feed</h5>
              <p>Chronological transaction timeline with recognized brand avatars (Starbucks, Amazon), clean expense color coding, and filter toggles.</p>
            </div>
          </div>
        </div>
      `,
      learnings: `
        <div class="cs-section">
          <h4>Key Learnings & Impact</h4>
          <p>This project consolidated my understanding of user research and scalable component design:</p>
          <div class="cs-grid-2">
            <div class="cs-card">
              <h5>Design System Scalability</h5>
              <p>Constructed a fully modular Figma component library using variants, auto-layout 5.0, and design tokens that can seamlessly scale to tablet or web banking views.</p>
            </div>
            <div class="cs-card">
              <h5>Recruiter Note</h5>
              <p>FinPulse is a concept design study created to demonstrate full-cycle UI/UX capabilities, design system rigor, and adherence to human-centered design standards.</p>
            </div>
          </div>
        </div>
      `
    }
  },

  demand_est: {
    title: "Demand-Est AI Food Demand Forecaster",
    category: "AI & Data Visualization Dashboard",
    role: "Project Intern (Academic Project / IBM Data Analysis Contribution)",
    duration: "IBM Academic & Skill Vertex Project",
    tools: ["Python", "Data Analysis", "HTML5", "CSS3", "JavaScript", "Analytics"],
    heroImg: "images/projects/demand-est.jpg",
    overview: "Contributed to global sales analysis and demand forecasting algorithms for the Demand-Est AI Food Demand Forecaster to help food supply chains minimize regional food wastage.",
    tabs: {
      overview: `
        <div class="cs-section">
          <h4>Project Overview & Objectives</h4>
          <p>Food distribution networks often suffer from extreme volatility in regional demand, causing massive perishable food spoilage on one end and stockouts on the other. Demand-Est is an AI-powered forecasting system designed to predict weekly regional demand and advise distribution centers on optimal allocation.</p>
          <div class="cs-grid-2">
            <div class="cs-card">
              <h5>My Role & Contributions</h5>
              <p>• Contributed to comprehensive global sales data analysis and trend evaluation.<br>
                 • Designed and developed dashboard layout modules to visualize predictive trends.<br>
                 • Collaborated on project assembly, frontend data presentation, and reporting workflows.</p>
            </div>
            <div class="cs-card">
              <h5>Key Project Indicators</h5>
              <p>• 14-day regional demand trend visualization.<br>
                 • Waste prevention tracking cards with estimated loss reduction percentage.<br>
                 • Multi-region risk alerts (High Waste Risk vs. Stockout Risk).</p>
            </div>
          </div>
        </div>
      `,
      problem: `
        <div class="cs-section">
          <h4>The Problem & Data Challenges</h4>
          <p>Perishable inventory managers were relying on historical spreadsheets without real-time seasonality adjustments or predictive modeling. The primary challenge was structuring complex multi-variant time-series predictions into an easily actionable dashboard.</p>
        </div>
      `,
      process: `
        <div class="cs-section">
          <h4>Analytics & Interface Design Process</h4>
          <p>1. Analyzed regional sales datasets to identify high-variance food categories.<br>
             2. Crafted high-contrast visual charts contrasting Actual Demand vs. Predicted Demand.<br>
             3. Formatted critical metric callouts (145,200 units predicted demand, 18.5% waste reduction) for instant scanning.</p>
        </div>
      `,
      screens: `
        <div class="cs-section">
          <h4>Dashboard Interface</h4>
          <div class="case-study-banner">
            <img src="images/projects/demand-est.jpg" alt="Demand-Est AI Dashboard" style="width:100%; border-radius:8px;">
          </div>
        </div>
      `,
      learnings: `
        <div class="cs-section">
          <h4>Learnings & Takeaways</h4>
          <p>Gained deep appreciation for data density in dashboard design. Learned how color coding and predictive boundary lines allow decision-makers to act quickly on supply chain risks.</p>
        </div>
      `
    }
  },

  sacs: {
    title: "Secure Cloud Storage System (SACS)",
    category: "Cloud Security & Access Control System",
    role: "Lead Researcher & Interface Developer (B.Tech Capstone Project)",
    duration: "B.Tech Final Year Capstone Project",
    tools: ["Cloud Storage", "Security Protocols", "Python", "Web Interface", "Access Control"],
    heroImg: "images/projects/sacs-cloud.jpg",
    overview: "An Empowered Secure Cloud Storage using a Dignifiable Access Control System against Malevolent Data Publishers, featuring real-time access policy enforcement and threat monitoring.",
    tabs: {
      overview: `
        <div class="cs-section">
          <h4>Project Summary & Architecture</h4>
          <p>Enterprise cloud repositories are increasingly targeted by malevolent data publishers who inject tampered, unauthorized, or poisoned datasets. SACS introduces a dignifiable cryptographic access control protocol that sanitizes incoming data and enforces fine-grained permission matrices.</p>
          <div class="cs-grid-2">
            <div class="cs-card">
              <h5>My Role & Focus</h5>
              <p>• Authored the system architecture and access policy workflow.<br>
                 • Built the web-based administrative security dashboard for policy enforcement.<br>
                 • Designed real-time threat alert visualizers and cryptographic key status tables.</p>
            </div>
            <div class="cs-card">
              <h5>Security Features</h5>
              <p>• Granular role-based access control (RBAC).<br>
                 • Malevolent publisher activity anomaly spikes monitor.<br>
                 • Cryptographic key lifecycle tracker across multi-cloud volumes.</p>
            </div>
          </div>
        </div>
      `,
      problem: `
        <div class="cs-section">
          <h4>Security Objective</h4>
          <p>Standard cloud storage relies on simple authentication tokens that can be intercepted or abused by compromised publisher accounts. SACS prevents data pollution by requiring multi-stage cryptographic verification and continuous real-time auditing.</p>
        </div>
      `,
      process: `
        <div class="cs-section">
          <h4>Methodology & UI Implementation</h4>
          <p>Designed a high-density, dark-accented security monitoring console where DevOps and security admins can review active access policies, publisher threat events, and encryption health at a single glance.</p>
        </div>
      `,
      screens: `
        <div class="cs-section">
          <h4>Security Console Interface</h4>
          <div class="case-study-banner">
            <img src="images/projects/sacs-cloud.jpg" alt="SACS Security Dashboard" style="width:100%; border-radius:8px;">
          </div>
        </div>
      `,
      learnings: `
        <div class="cs-section">
          <h4>Results & Academic Recognition</h4>
          <p>Awarded top marks in the B.Tech Information Technology capstone defense at Sri Balaji Chocalingam Engineering College, demonstrating practical cloud security design with clean UI execution.</p>
        </div>
      `
    }
  },

  caresync: {
    title: "CareSync — Hospital Management & Healthcare Web Portal",
    category: "Healthcare Web Application & Full-Stack Development",
    role: "Web Developer Intern (Skill Vertex)",
    duration: "February 2023 – April 2023",
    tools: ["PHP", "MySQL", "Bootstrap", "HTML5", "CSS3", "JavaScript"],
    heroImg: "images/projects/caresync-health.jpg",
    overview: "Engineered a full-stack hospital management web application streamlining patient admissions, doctor appointment scheduling, bed availability, and medical department records.",
    tabs: {
      overview: `
        <div class="cs-section">
          <h4>Project Background & Scope</h4>
          <p>During my internship at Skill Vertex, I was part of the early core engineering cohort responsible for creating robust full-stack web applications. I developed the CareSync hospital management portal to help clinics coordinate healthcare services efficiently.</p>
          <div class="cs-grid-2">
            <div class="cs-card">
              <h5>My Contributions</h5>
              <p>• Designed responsive UI views for patient intake and appointment schedules.<br>
                 • Developed database schemas in MySQL for patient records, doctors, and rooms.<br>
                 • Built backend PHP logic for appointment booking, status updates, and admissions.<br>
                 • Implemented real-time bed occupancy progress indicators.</p>
            </div>
            <div class="cs-card">
              <h5>Key Features</h5>
              <p>• Patient registration and admission logs.<br>
                 • Doctor appointment calendar with real-time confirmation status.<br>
                 • Ward capacity visualizer (General, ICU, Maternity).<br>
                 • Fully responsive layouts for desktop computers and tablet nurse stations.</p>
            </div>
          </div>
        </div>
      `,
      problem: `
        <div class="cs-section">
          <h4>The Healthcare Challenge</h4>
          <p>Small to mid-sized healthcare centers suffered from administrative bottlenecks due to handwritten paperwork and fragmented desktop software. Medical receptionists and nursing staff needed a single responsive portal to monitor bed status and manage admissions without delays.</p>
        </div>
      `,
      process: `
        <div class="cs-section">
          <h4>Engineering Process</h4>
          <p>Iterated from user wireframes to a responsive Bootstrap and PHP web architecture. Tested patient admission forms to minimize mandatory fields and ensure instant validation feedback.</p>
        </div>
      `,
      screens: `
        <div class="cs-section">
          <h4>CareSync Hospital Portal Interface</h4>
          <div class="case-study-banner">
            <img src="images/projects/caresync-health.jpg" alt="CareSync Hospital Portal" style="width:100%; border-radius:8px;">
          </div>
        </div>
      `,
      learnings: `
        <div class="cs-section">
          <h4>Internship Growth & Outcomes</h4>
          <p>Recognized as a leading intern developer for completing core modules ahead of schedule and delivering an accessible, responsive user interface that required zero staff retraining.</p>
        </div>
      `
    }
  }
};

function initCaseStudyModal() {
  const modalBackdrop = document.getElementById('case-study-modal-backdrop');
  const closeBtn = document.getElementById('modal-close-btn');
  const openButtons = document.querySelectorAll('[data-open-case-study]');
  if (!modalBackdrop || !closeBtn) return;

  const modalTitle = document.getElementById('modal-project-title');
  const modalCategory = document.getElementById('modal-project-category');
  const modalBody = document.getElementById('modal-tab-content');
  const tabButtons = document.querySelectorAll('.modal-tab-btn');

  let currentProject = null;
  let activeTab = 'overview';

  function renderContent() {
    if (!currentProject || !projectCaseStudies[currentProject]) return;
    const project = projectCaseStudies[currentProject];
    
    modalTitle.textContent = project.title;
    modalCategory.textContent = project.category;

    const contentHtml = project.tabs[activeTab] || project.tabs.overview;
    modalBody.innerHTML = contentHtml;
  }

  function openModal(projectId) {
    if (!projectCaseStudies[projectId]) return;
    currentProject = projectId;
    activeTab = 'overview';
    
    // reset tab UI
    tabButtons.forEach(btn => {
      if (btn.getAttribute('data-tab') === 'overview') {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    renderContent();
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-open-case-study');
      openModal(projectId);
    });
  });

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTab = btn.getAttribute('data-tab');
      renderContent();
    });
  });

  closeBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. Copy Email & Toast Notification
   ========================================================================== */
function initCopyEmail() {
  const copyButtons = document.querySelectorAll('[data-copy-email]');
  const toast = document.getElementById('toast-notice');
  const toastText = document.getElementById('toast-text');

  function showToast(message) {
    if (!toast) return;
    if (toastText) toastText.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-copy-email') || 'keerthanadharanilogan@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        showToast('Email address copied to clipboard!');
      } catch (err) {
        // fallback
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Email address copied to clipboard!');
      }
    });
  });
}

/* ==========================================================================
   8. Contact Form Handling
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status-msg');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const subject = form.querySelector('[name="subject"]').value.trim() || 'Project Inquiry';
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      if (statusMsg) {
        statusMsg.style.display = 'block';
        statusMsg.style.color = '#ef4444';
        statusMsg.textContent = 'Please fill out all required fields.';
      }
      return;
    }

    // Direct mailto bridge
    const mailtoUrl = `mailto:keerthanadharanilogan@gmail.com?subject=${encodeURIComponent(subject + ' - from ' + name)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;
    window.location.href = mailtoUrl;

    if (statusMsg) {
      statusMsg.style.display = 'block';
      statusMsg.style.color = 'var(--success)';
      statusMsg.textContent = 'Opening your email client... Thank you for reaching out!';
    }

    form.reset();
  });
}

/* ==========================================================================
   9. Scroll Reveal Animations
   ========================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    elements.forEach(el => observer.observe(el));
  } else {
    // fallback
    elements.forEach(el => el.classList.add('revealed'));
  }
}

/* ==========================================================================
   10. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

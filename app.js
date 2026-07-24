// ---------- Data (your real info) ----------
const PROFILE = {
  name: "W.J.M. Sathsarani Arambepola",
  shortName: "Sathsarani",
  email: "sathsaraniarambepola848@gmail.com",
  location: "Sri Lanka",
  links: {
    github: "https://github.com/Sathsarani03",
    linkedin: "https://www.linkedin.com/in/sathsarani-arambepola-10b4a233a",
    kaggle: "#", // you said currently no
    cv: "cv/MyCv.pdf"      // add later if you make a CV PDF
  }
};

// Your current skills (you can edit levels anytime)
const SKILLS = [
  { name: "Python", level: 60, label: "Learning" },
  { name: "SQL", level: 55, label: "Learning" },
  { name: "Java", level: 50, label: "Learning" },
  { name: "HTML", level: 50, label: "Learning" },
  { name: "SSMS", level: 45, label: "Learning" },
  { name: "Workflow / Problem Solving", level: 55, label: "Growing" }
];

// Projects placeholders (ready to fill later)
const PROJECTS = [
  {
    title: "Project Slot #1 (Coming Soon)",
    desc: "Add your first Data Science or analytics project here. Example: a Python + Pandas analysis with charts and insights.",
    tags: ["analytics"],
    stack: ["Python", "Pandas", "Visualization"],
    demo: "#",
    code: "#"
  },
  {
    title: "Project Slot #2 (Coming Soon)",
    desc: "Example idea: SQL project using SSMS — build tables, write queries, generate reports and insights.",
    tags: ["db"],
    stack: ["SQL", "SSMS", "Database Design"],
    demo: "#",
    code: "#"
  },
  {
    title: "Project Slot #3 (Coming Soon)",
    desc: "Example idea: Java OOP mini system (library / rental / booking) + documentation + screenshots.",
    tags: ["software"],
    stack: ["Java", "OOP", "File Handling"],
    demo: "#",
    code: "#"
  },
  {
    title: "Project Slot #4 (Coming Soon)",
    desc: "Example idea: simple ML model in Python (classification/regression) with clear explanation of results.",
    tags: ["ml"],
    stack: ["Python", "scikit-learn", "Evaluation"],
    demo: "#",
    code: "#"
  }
];

// No experience yet — keep a simple section that looks professional
const EXPERIENCE = [
  {
    role: "Undergraduate Student",
    org: "SLTC University",
    date: "May 2025 — Present",
    desc: "Learning Data Science foundations and building skills in Python, SQL, Java, and web basics."
  }
];

// Picked 6 modules from your list
const MODULES = [
  "Programming Concepts (Python)",
  "Object-Oriented Programming (OOP)",
  "Introductory Calculus",
  "Mathematics for Computing",
  "Business Analysis & Software Design",
  "Data Technology"
];

// ---------- Helpers ----------
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ---------- Theme ----------
const themeToggle = $("#themeToggle");
const savedTheme = localStorage.getItem("theme");
if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);

function updateThemeIcon() {
  const t = document.documentElement.getAttribute("data-theme");
  themeToggle.textContent = t === "light" ? "🌞" : "🌙";
}
updateThemeIcon();

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateThemeIcon();
});

// ---------- Mobile nav ----------
const navToggle = $("#navToggle");
const navList = $("#navList");
navToggle.addEventListener("click", () => {
  const open = navList.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
});
navList.addEventListener("click", (e) => {
  if (e.target.matches("a")) navList.classList.remove("is-open");
});

// ---------- Fill profile in hero + contact ----------
$("#myEmail").textContent = PROFILE.email;

// Replace hero name + avatar letter
const heroTitle = document.querySelector(".hero h1");
if (heroTitle) {
  heroTitle.innerHTML = `
    Hi, I’m <span class="accent">${escapeHtml(PROFILE.shortName)}</span> 👋<br />
    Data Science Undergraduate at SLTC University.
  `;
}


function setHref(id, url) {
  const el = $(id);
  if (!el) return;
  el.href = url;
  if (url === "#") el.addEventListener("click", (e) => e.preventDefault());
}
setHref("#githubLink", PROFILE.links.github);
setHref("#linkedinLink", PROFILE.links.linkedin);
setHref("#kaggleLink", PROFILE.links.kaggle);
setHref("#cvLink", PROFILE.links.cv);

setHref("#githubLink2", PROFILE.links.github);
setHref("#linkedinLink2", PROFILE.links.linkedin);

$("#copyEmailBtn").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(PROFILE.email);
    $("#copyEmailBtn").textContent = "✅";
    setTimeout(() => ($("#copyEmailBtn").textContent = "📋"), 900);
  } catch {
    alert("Copy not allowed in this browser. Please copy manually.");
  }
});

// ---------- Skills render ----------
const skillsGrid = $("#skillsGrid");
skillsGrid.innerHTML = SKILLS.map(s => `
  <div class="skill">
    <div class="skill-top">
      <div class="skill-name">${escapeHtml(s.name)}</div>
      <div class="level">${escapeHtml(s.label)}</div>
    </div>
    <div class="bar" aria-label="${escapeHtml(s.name)} level">
      <div class="fill" style="width:${Math.max(8, Math.min(100, s.level))}%"></div>
    </div>
  </div>
`).join("");

// ---------- Modules render ----------
const moduleTags = $("#moduleTags");
moduleTags.innerHTML = MODULES.map(m => `<span class="badge">${escapeHtml(m)}</span>`).join("");

// Update education year text
const eduYear = $("#eduYear");
if (eduYear) eduYear.textContent = "May 2025 — Present";

// ---------- Projects render + filter ----------
const projectsGrid = $("#projectsGrid");

function renderProjects(filter = "all") {
  const items = PROJECTS.filter(p => filter === "all" ? true : p.tags.includes(filter));
  projectsGrid.innerHTML = items.map(p => `
    <article class="project">
      <h3>${escapeHtml(p.title)}</h3>
      <p>${escapeHtml(p.desc)}</p>
      <div class="meta">
        ${p.stack.map(x => `<span class="badge">${escapeHtml(x)}</span>`).join("")}
      </div>
      <div class="actions">
        <a href="${p.demo}" target="_blank" rel="noreferrer">Live / Demo</a>
        <a href="${p.code}" target="_blank" rel="noreferrer">Code</a>
      </div>
    </article>
  `).join("");

  // update hero stats
  $("#statProjects").textContent = `${PROJECTS.length}+`;
  $("#statTech").textContent = `${SKILLS.length}+`;
  $("#statCollab").textContent = `0+`;
}
renderProjects("all");

$$(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".filter-btn").forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    renderProjects(btn.dataset.filter);
  });
});

// ---------- Experience render ----------
const timeline = $("#timeline");
timeline.innerHTML = EXPERIENCE.map(x => `
  <div class="titem">
    <div class="ttop">
      <div>
        <div class="trole">${escapeHtml(x.role)}</div>
        <div class="torg">${escapeHtml(x.org)}</div>
      </div>
      <div class="tdate">${escapeHtml(x.date)}</div>
    </div>
    <p class="tdesc">${escapeHtml(x.desc)}</p>
  </div>
`).join("");

// ---------- Contact form (mailto) ----------
$("#contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const name = fd.get("name").toString().trim();
  const email = fd.get("email").toString().trim();
  const message = fd.get("message").toString().trim();

  const subject = encodeURIComponent(`Portfolio Contact — ${name}`);
  const body = encodeURIComponent(
`Hi Sathsarani,

${message}

From: ${name}
Email: ${email}`
  );

  window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
});

// ---------- Active nav highlight on scroll ----------
const sections = ["about","skills","projects","education","contact"].map(id => document.getElementById(id));
const navLinks = Array.from($$(".nav-link"));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove("is-active"));
      const active = navLinks.find(a => a.getAttribute("href") === `#${entry.target.id}`);
      if (active) active.classList.add("is-active");
    }
  });
}, { rootMargin: "-45% 0px -50% 0px", threshold: 0.05 });

sections.forEach(s => observer.observe(s));

// ---------- Footer year ----------
$("#year").textContent = new Date().getFullYear();

// ---------- Utils ----------
function escapeHtml(str){
  return str.replace(/[&<>"']/g, (m) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[m]));
}

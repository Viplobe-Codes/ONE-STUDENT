/* Edit this configuration to add real, brand-specific links and work. Keep URLs empty until they are ready to publish. */
const siteConfig = {
  links: {
    instagram: "https://www.instagram.com/i_wanna.work/",
    email: "rsharma.gmc@gmail.com",
    other: []
  },
  projects: [],
  services: [
    { title: "Personal & portfolio websites", description: "Simple, responsive websites that give a person or idea a clear home online." },
    { title: "Landing pages", description: "Focused pages for sharing a project, resource, or small idea." },
    { title: "Python & automation", description: "Small scripts to reduce repetitive tasks and make everyday workflows easier." },
    { title: "Data cleaning & visualizations", description: "Organize a dataset and present useful patterns in a clear way." },
    { title: "Video & short-form editing", description: "Thoughtful edits for short videos and digital content." },
    { title: "Digital content support", description: "Help plan, prepare, and polish practical digital materials." }
  ]
};

const phrases = [
  "const ideas = build();",
  "learning_by_doing();",
  "turning_ideas_into_projects();",
  "growing_one_step_at_a_time();"
];

const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[char]));

function safeUrl(value, allowMail = false) {
  if (typeof value !== "string" || !value.trim()) return "";
  if (allowMail && /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(value)) return value;
  try {
    const url = new URL(value);
    if (url.protocol === "https:" || url.protocol === "http:") return url.href;
  } catch (error) {
    if (!(error instanceof TypeError)) throw error;
  }
  return "";
}

function socialIcon(name) {
  if (name === "github") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.1-1.5 6.1-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6S17.5.7 15 2.5a13 13 0 0 0-7 0C5.5.7 4.3 1.5 4.3 1.5a4.8 4.8 0 0 0-.1 3.6 5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.1 6.4 6.1 6.7A3.4 3.4 0 0 0 8 18v4"/></svg>';
  if (name === "linkedin") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v11M4 4v.1M9 20V9h4v2a4 4 0 0 1 7 3v6M13 14v6"/><circle cx="4" cy="4" r="1.5"/></svg>';
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m4 7 8 6 8-6"/></svg>';
}

function renderSocials() {
  const destinations = [
    { key: "github", label: "GitHub" },
    { key: "instagram", label: "Instagram" },
    { key: "linkedin", label: "LinkedIn" }
  ];
  document.querySelector("#hero-socials").innerHTML = destinations.map(({ key, label }) => {
    const url = safeUrl(siteConfig.links[key]);
    return url ? `<a class="social-link" href="${escapeHTML(url)}" aria-label="ONE STUDENT on ${label}" target="_blank" rel="noopener noreferrer">${socialIcon(key)}</a>` : "";
  }).join("");

  const links = [];
  const instagram = safeUrl(siteConfig.links.instagram);
  const email = safeUrl(siteConfig.links.email, true);
  const github = safeUrl(siteConfig.links.github);
  if (instagram) links.push({ label: "Instagram ↗", href: instagram, primary: true, external: true });
  if (email) links.push({ label: "Email ↗", href: email, external: email.startsWith("https:") });
  if (github) links.push({ label: "GitHub ↗", href: github, external: true });
  (Array.isArray(siteConfig.links.other) ? siteConfig.links.other : []).forEach(item => {
    const href = safeUrl(item && item.url);
    if (href && item.label) links.push({ label: `${item.label} ↗`, href, external: true });
  });
  const container = document.querySelector("#contact-links");
  container.innerHTML = links.map(link => `<a class="contact-link${link.primary ? " primary" : ""}" href="${escapeHTML(link.href)}"${link.external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${escapeHTML(link.label)}</a>`).join("");
  if (instagram) {
    container.querySelector(".primary")?.setAttribute("aria-label", "Visit the ONE STUDENT Instagram profile");
  }
  const note = document.querySelector("#contact-note");
  note.textContent = links.length ? "Connect through the brand links above." : "Add real brand links in the links section of script.js to make them appear here.";
}

function renderProjects() {
  const container = document.querySelector("#project-list");
  const projects = Array.isArray(siteConfig.projects) ? siteConfig.projects : [];
  if (!projects.length) {
    container.innerHTML = '<p class="empty-projects">Projects are being built. Check back as experiments become ready to share.</p>';
    return;
  }
  container.innerHTML = projects.map(project => {
    const demo = safeUrl(project.demoUrl);
    const source = safeUrl(project.sourceUrl);
    const links = [demo && `<a href="${escapeHTML(demo)}" target="_blank" rel="noopener noreferrer">Live demo ↗</a>`, source && `<a href="${escapeHTML(source)}" target="_blank" rel="noopener noreferrer">Source ↗</a>`].filter(Boolean).join("");
    return `<article class="project-card"><div class="project-top"><span class="project-category">${escapeHTML(project.category || "Experiment")}</span><span class="project-status">${escapeHTML(project.status || "In Progress")}</span></div><h3>${escapeHTML(project.title || "Untitled project")}</h3><p>${escapeHTML(project.description || "")}</p>${links ? `<div class="project-links">${links}</div>` : ""}</article>`;
  }).join("");
}

function renderServices() {
  const services = Array.isArray(siteConfig.services) ? siteConfig.services : [];
  document.querySelector("#service-list").innerHTML = services.map((service, index) => `<article class="service-item"><h3>${escapeHTML(service.title || "Service")}</h3><p>${escapeHTML(service.description || "")}</p><a href="#contact" aria-label="Enquire about ${escapeHTML(service.title || "this service")}">Enquire <span aria-hidden="true">↗</span></a></article>`).join("");
}

function setupSubtitle() {
  const output = document.querySelector("#typed-text");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) {
    output.textContent = phrases[0];
    document.querySelector(".cursor").hidden = true;
    return;
  }
  let phraseIndex = 0;
  let charIndex = phrases[0].length;
  let deleting = false;
  const tick = () => {
    const current = phrases[phraseIndex];
    if (deleting) {
      charIndex--;
      output.textContent = current.slice(0, charIndex);
      if (charIndex <= 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        window.setTimeout(tick, 260);
        return;
      }
      window.setTimeout(tick, 30);
    } else {
      charIndex++;
      output.textContent = phrases[phraseIndex].slice(0, charIndex);
      if (charIndex >= phrases[phraseIndex].length) {
        deleting = true;
        window.setTimeout(tick, 1550);
        return;
      }
      window.setTimeout(tick, 45);
    }
  };
  window.setTimeout(() => { phraseIndex = 0; deleting = true; tick(); }, 1700);
}

const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#site-nav");
menuButton.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
  menuButton.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
  menu.classList.toggle("open", !expanded);
});
menu.addEventListener("click", event => {
  if (event.target.closest("a")) {
    menu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();
renderSocials();
renderProjects();
renderServices();
setupSubtitle();

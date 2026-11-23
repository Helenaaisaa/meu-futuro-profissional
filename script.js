
// Interações do portfólio de Isadora Eugenio

const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle?.querySelector(".theme-icon");

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

const progressBar = document.getElementById("scrollProgress");
const cursorGlow = document.querySelector(".cursor-glow");

// Tema claro/escuro: preferência salva no navegador.
const savedTheme = localStorage.getItem("isadora-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
  updateThemeButton(true);
}

function updateThemeButton(isDark) {
  if (!themeIcon || !themeToggle) return;

  themeIcon.textContent = isDark ? "☾" : "☼";

  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Ativar tema claro" : "Ativar tema escuro"
  );
}

themeToggle?.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");

  localStorage.setItem(
    "isadora-theme",
    isDark ? "dark" : "light"
  );

  updateThemeButton(isDark);
});

// Menu adaptado para telas menores.
menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));

  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Fechar menu" : "Abrir menu"
  );
});

// Fecha o menu depois de clicar em uma seção.
mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");

    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Abrir menu");
  });
});

// Barra de progresso da leitura.
function updateScrollProgress() {
  const pageHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress =
    pageHeight > 0 ? (window.scrollY / pageHeight) * 100 : 0;

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }
}

window.addEventListener("scroll", updateScrollProgress, {
  passive: true
});

updateScrollProgress();

// Animações de entrada conforme as seções aparecem na tela.
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => {
    item.classList.add("is-visible");
  });
}

// Efeito de luz que acompanha o cursor em computadores.
if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener(
    "pointermove",
    (event) => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    },
    { passive: true }
  );
}

// Ano atualizado automaticamente no rodapé.
const yearElement = document.getElementById("currentYear");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Configurações fáceis de alterar.
const WHATSAPP_NUMBER = "5553997058349";
const INSTAGRAM_URL = "https://www.instagram.com/";
const META_PIXEL_ID = "1626871032781530";

function loadMetaPixel() {
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod
        ? n.callMethod.apply(n, arguments)
        : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    "script",
    "https://connect.facebook.net/en_US/fbevents.js"
  );

  fbq("init", META_PIXEL_ID);
  fbq("track", "PageView");
}

function trackMetaEvent(eventName, parameters = {}) {
  if (typeof fbq === "function") {
    fbq("track", eventName, parameters);
  }
}

function createWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function setupContactLinks() {
  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    const message =
      link.dataset.message ||
      "Olá! Gostaria de saber mais sobre a Luna Estética Avançada.";

    link.href = createWhatsAppUrl(message);
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    link.addEventListener("click", () => {
      trackMetaEvent("Contact", {
        content_name: "WhatsApp",
        contact_channel: "WhatsApp",
      });
    });
  });

  document.querySelectorAll("[data-instagram]").forEach((link) => {
    link.href = INSTAGRAM_URL;
  });
}

function setupLeadForm() {
  const form = document.getElementById("lead-form");
  const serviceSelect = document.getElementById("service");

  document.querySelectorAll("[data-select-service]").forEach((link) => {
    link.addEventListener("click", () => {
      serviceSelect.value = link.dataset.selectService;
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const service = serviceSelect.value;
    const availability = document
      .getElementById("availability")
      .value.trim();

    const availabilityText = availability
      ? ` Minha disponibilidade é: ${availability}.`
      : "";
    const message =
      `Olá! Meu nome é ${name}. Tenho interesse em ${service}.` +
      `${availabilityText} Gostaria de saber mais sobre a avaliação.`;

    trackMetaEvent("Lead", {
      content_name: service,
      contact_channel: "WhatsApp",
    });

    window.open(createWhatsAppUrl(message), "_blank", "noopener");
  });
}

function setupMobileMenu() {
  const button = document.querySelector(".menu-button");
  const navigation = document.querySelector(".main-nav");

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    button.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
    navigation.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Abrir menu");
      navigation.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    });
  });
}

function setupRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");

  if (
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((element) => observer.observe(element));
}

loadMetaPixel();
setupContactLinks();
setupLeadForm();
setupMobileMenu();
setupRevealAnimations();

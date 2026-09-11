const menuToggle = document.querySelector(".menu-toggle");
const navPanel = document.querySelector(".nav-panel");

menuToggle.addEventListener("click", () => {
  const isOpen = navPanel.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navPanel.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navPanel.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const state = {
  humidity: 78,
  temperature: 31.4,
  potassium: "low",
};

const elements = {
  humidityInput: document.getElementById("humidityInput"),
  temperatureInput: document.getElementById("temperatureInput"),
  potassiumInput: document.getElementById("potassiumInput"),
  humidityValue: document.getElementById("humidityValue"),
  temperatureValue: document.getElementById("temperatureValue"),
  potassiumValue: document.getElementById("potassiumValue"),
  humidityBar: document.getElementById("humidityBar"),
  temperatureBar: document.getElementById("temperatureBar"),
  potassiumBar: document.getElementById("potassiumBar"),
  parcelStatus: document.getElementById("parcelStatus"),
  analysisTitle: document.getElementById("analysisTitle"),
  analysisText: document.getElementById("analysisText"),
  recommendationText: document.getElementById("recommendationText"),
  resetDemo: document.getElementById("resetDemo"),
};

function potassiumLabel(value) {
  return {
    low: "Bajo",
    normal: "Normal",
    high: "Alto",
  }[value];
}

function potassiumWidth(value) {
  return {
    low: 28,
    normal: 72,
    high: 92,
  }[value];
}

function updateDemo() {
  const humidityConcern = state.humidity < 35;
  const temperatureConcern = state.temperature > 34;
  const potassiumConcern = state.potassium === "low";
  const highPotassium = state.potassium === "high";
  const hasConcern = humidityConcern || temperatureConcern || potassiumConcern || highPotassium;

  elements.humidityValue.textContent = `${state.humidity}%`;
  elements.temperatureValue.textContent = `${state.temperature.toFixed(1)} C`;
  elements.potassiumValue.textContent = potassiumLabel(state.potassium);
  elements.humidityBar.style.width = `${state.humidity}%`;
  elements.temperatureBar.style.width = `${((state.temperature - 12) / 30) * 100}%`;
  elements.potassiumBar.style.width = `${potassiumWidth(state.potassium)}%`;

  elements.parcelStatus.textContent = hasConcern ? "Requiere atencion" : "Condiciones normales";
  elements.parcelStatus.classList.toggle("ok", !hasConcern);

  if (potassiumConcern) {
    elements.analysisTitle.textContent = "Deficit detectado";
    elements.analysisText.textContent = "Se detecto un posible deficit de potasio en la Parcela 03.";
    elements.recommendationText.textContent = "Recomendacion: evaluar una aplicacion de fertilizante rico en potasio.";
    elements.potassiumBar.style.background = "var(--warning)";
    return;
  }

  if (humidityConcern) {
    elements.analysisTitle.textContent = "Humedad baja";
    elements.analysisText.textContent = "La humedad del suelo esta por debajo del rango esperado para esta simulacion.";
    elements.recommendationText.textContent = "Recomendacion: revisar estrategia de riego y condiciones del suelo.";
    elements.potassiumBar.style.background = "var(--leaf)";
    return;
  }

  if (temperatureConcern) {
    elements.analysisTitle.textContent = "Temperatura elevada";
    elements.analysisText.textContent = "La Parcela 03 registra una temperatura alta que conviene vigilar.";
    elements.recommendationText.textContent = "Recomendacion: monitorear el cultivo y contrastar con humedad disponible.";
    elements.potassiumBar.style.background = "var(--leaf)";
    return;
  }

  if (highPotassium) {
    elements.analysisTitle.textContent = "Nutriente elevado";
    elements.analysisText.textContent = "El potasio aparece por encima del rango normal en la simulacion.";
    elements.recommendationText.textContent = "Recomendacion: validar medicion antes de considerar nuevas aplicaciones.";
    elements.potassiumBar.style.background = "var(--amber)";
    return;
  }

  elements.analysisTitle.textContent = "Condiciones normales";
  elements.analysisText.textContent = "No se detectan condiciones criticas en la Parcela 03 con los valores actuales.";
  elements.recommendationText.textContent = "Recomendacion: mantener monitoreo continuo y registrar el historial.";
  elements.potassiumBar.style.background = "var(--leaf)";
}

elements.humidityInput.addEventListener("input", (event) => {
  state.humidity = Number(event.target.value);
  updateDemo();
});

elements.temperatureInput.addEventListener("input", (event) => {
  state.temperature = Number(event.target.value);
  updateDemo();
});

elements.potassiumInput.addEventListener("change", (event) => {
  state.potassium = event.target.value;
  updateDemo();
});

elements.resetDemo.addEventListener("click", () => {
  state.humidity = 78;
  state.temperature = 31.4;
  state.potassium = "low";
  elements.humidityInput.value = state.humidity;
  elements.temperatureInput.value = state.temperature;
  elements.potassiumInput.value = state.potassium;
  updateDemo();
});

updateDemo();

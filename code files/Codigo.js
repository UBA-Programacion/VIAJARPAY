window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Smooth scroll para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Compensar altura de navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

/**
 * Función para seleccionar países (funcionalidad adicional)
 * Maneja la selección de tarjetas de países si se implementa en el futuro
 * @param {string} country - Código del país seleccionado
 */
function selectCountry(country) {
  // Remover clase activa de todas las tarjetas de países
  document.querySelectorAll(".country-card").forEach((card) => {
    card.classList.remove("active");
  });

  // Agregar clase activa al país seleccionado
  if (event && event.currentTarget) {
    event.currentTarget.classList.add("active");
  }

  // Log para debugging - se puede expandir con más funcionalidad
  console.log("Selected country:", country);
}

/**
 * Función para actualizar el contador de países
 * Actualiza el display del valor actual del slider de países
 */
function updateCountryCount() {
  const countries = document.getElementById("countries").value;
  document.getElementById("countryCount").textContent = countries;
}

/**
 * Función principal de cálculo de ahorros
 * Calcula y actualiza todos los valores de la comparación de costos
 */
function calculateSavings() {
  // Obtener valores de los inputs del usuario
  const budget = parseFloat(document.getElementById("budget").value) || 3000;
  const countries = parseInt(document.getElementById("countries").value) || 8;
  const duration = parseInt(document.getElementById("duration").value) || 12;

  // Actualizar el display del contador de países
  document.getElementById("countryCount").textContent = countries;

  // Calcular costos del método tradicional
  // Fórmula: 6% base por país con multiplicador de duración
  const baseFeePerCountry = budget * 0.06; // 6% promedio de fee por país
  const durationMultiplier = Math.sqrt(duration) / Math.sqrt(12); // Retornos decrecientes para viajes largos
  const traditionalCost = Math.round(
    baseFeePerCountry * countries * durationMultiplier
  );

  // Calcular costos con VIAJAR-PAY
  // Fórmula: 1% del presupuesto + €2 por país
  const viajarpayCost = Math.round(budget * 0.01 + countries * 2);

  // Calcular el ahorro total
  const totalSavings = traditionalCost - viajarpayCost;

  // Actualizar los valores en la interfaz
  document.getElementById(
    "traditionalCost"
  ).textContent = `€${traditionalCost}`;
  document.getElementById("travelpayCost").textContent = `€${viajarpayCost}`;
  document.getElementById("totalSavings").textContent = `€${totalSavings}`;
}

/**
 * Funcionalidad de scroll suave para enlaces de navegación
 * Mejora la experiencia de usuario al navegar por la página
 */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

/**
 * Inicialización de la calculadora cuando el DOM está listo
 * Asegura que todos los valores se calculen correctamente al cargar la página
 */
document.addEventListener("DOMContentLoaded", function () {
  updateCountryCount();
  calculateSavings();
});

/**
 * Inicialización alternativa para compatibilidad
 * Maneja casos donde el DOM ya está cargado cuando se ejecuta el script
 */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    updateCountryCount();
    calculateSavings();
  });
} else {
  // El DOM ya está cargado, inicializar inmediatamente
  updateCountryCount();
  calculateSavings();
}

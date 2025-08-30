// Configuración de videos con IDs de Google Drive
const videos = {
  video1: {
    id: "1fqRJb3vVwnj8eh1Z_gen4ZQPDbb0ZGnL",
  },
  video2: {
    id: "1lKiDZe0Vmb9wuzdP-a2JnNOSMEvb89oW",
  },
  video3: {
    id: "1fqRJb3vVwnj8eh1Z_gen4ZQPDbb0ZGnL",
  },
  video4: {
    id: "1lKiDZe0Vmb9wuzdP-a2JnNOSMEvb89oW",
  },
  video5: {
    id: "1fqRJb3vVwnj8eh1Z_gen4ZQPDbb0ZGnL",
  },
  video6: {
    id: "1awQeG9pXgoRljO3KSBSb73E3GIZ5fG0y",
  },
};

// Función para convertir URL de Google Drive a embed
function getGoogleDriveEmbedUrl(fileId) {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

// Función para abrir el modal con video específico
function openVideoModal(videoKey) {
  const video = videos[videoKey];
  if (!video) {
    console.error("Video no encontrado:", videoKey);
    return;
  }

  const modal = document.getElementById("videoModal");
  const iframe = document.getElementById("videoPlayer");
  const title = document.getElementById("videoTitle");

  // Configurar contenido del modal
  title.textContent = video.title;
  iframe.src = getGoogleDriveEmbedUrl(video.id);

  // Mostrar modal
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// Función para cerrar el modal
function closeVideoModal() {
  const modal = document.getElementById("videoModal");
  const iframe = document.getElementById("videoPlayer");

  modal.style.display = "none";
  iframe.src = "";
  document.body.style.overflow = "auto";
}

// Event listeners cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  // Botón de cerrar
  const closeBtn = document.querySelector(".close");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeVideoModal);
  }

  // Cerrar al hacer clic fuera del modal
  const modal = document.getElementById("videoModal");
  if (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeVideoModal();
      }
    });
  }

  // Cerrar con tecla Escape
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeVideoModal();
    }
  });

  // Conectar botones existentes con videos
  const buttonMappings = {
    video1Btn: "video1", // Boton Comercios
    video2Btn: "video2", // Botón VIAJEROS
    video3Btn: "video3", // Botón Saber como Comercio
    video4Btn: "video4", // Botón Aplicar como Viajero
    video5Btn: "video5", // Botón Aprender como Comercio
    video6Btn: "video6", // Botón Ver Pitch Deck
  };

  // Asignar eventos a los botones
  Object.entries(buttonMappings).forEach(([buttonId, videoKey]) => {
    const button = document.getElementById(buttonId);
    if (button) {
      button.addEventListener("click", function (e) {
        e.preventDefault(); // Prevenir navegación
        openVideoModal(videoKey);
      });
    }
  });
});

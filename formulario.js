const form = document.getElementById("my-form");
const formStatus = document.getElementById("my-form-status");
const formStatusNombre = document.getElementById("my-form-status-nombre");
const formStatusEmail = document.getElementById("my-form-status-email");
const formStatusAsunto = document.getElementById("my-form-status-asunto");
const formStatusMensaje = document.getElementById("my-form-status-mensaje");

const mensajes = {
  OK: "Mensaje enviado. Gracias por contactarme!",
  ERROR:
    "Lo siento, hubo un error al enviar el formulario. Intente nuevamente más tarde.",
  MAX: "Máximo 50 caracteres",
  MAX_LARGO: "Máximo 300 caracteres",
  VACIO: "Este campo es obligatorio",
  NO_COINCIDE: "Este formato no coincide",
};

const formatoEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/;

const esVacio = (texto) => {
  return texto === "" || texto.trim() === "";
};

const validarNombre = (nombre) => {
  if (nombre.length > 50) {
    formStatusNombre.innerHTML = mensajes.MAX;
    return false;
  }
  if (esVacio(nombre)) {
    formStatusNombre.innerHTML = mensajes.VACIO;
    return false;
  }
  return true;
};

const validarCorreo = (email) => {
  if (esVacio(email)) {
    formStatusEmail.innerHTML = mensajes.VACIO;
    return false;
  }
  if (!formatoEmail.test(email)) {
    formStatusEmail.innerHTML = mensajes.NO_COINCIDE;
    return false;
  }
  return true;
};

const validarAsunto = (asunto) => {
  if (asunto.length > 50) {
    formStatusAsunto.innerHTML = mensajes.MAX;
    return false;
  }
  if (esVacio(asunto)) {
    formStatusAsunto.innerHTML = mensajes.VACIO;
    return false;
  }
  return true;
};

const validarMensaje = (mensaje) => {
  if (mensaje.length > 300) {
    formStatusMensaje.innerHTML = mensajes.MAX_LARGO;
    return false;
  }
  if (esVacio(mensaje)) {
    formStatusMensaje.innerHTML = mensajes.VACIO;
    return false;
  }
  return true;
};

function handleSubmit(event) {
  event.preventDefault();
  formStatusNombre.innerHTML = "";
  formStatusAsunto.innerHTML = "";
  formStatusEmail.innerHTML = "";
  formStatusMensaje.innerHTML = "";
  const data = new FormData(event.target);

  const esNombreValido = validarNombre(data.get("nombre"));
  const esEmailValido = validarCorreo(data.get("email"));
  const esAsuntoValido = validarAsunto(data.get("asunto"));
  const esMensajeValido = validarMensaje(data.get("mensaje"));

  if (esNombreValido && esEmailValido && esAsuntoValido && esMensajeValido) {
    fetch("https://formspree.io/f/xeqnbwgv", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          formStatus.innerHTML = mensajes.OK;
          form.reset();
        } else {
          response.json().then(() => {
            formStatus.innerHTML = mensajes.ERROR;
          });
        }
      })
      .catch(() => {
        formStatus.innerHTML = mensajes.ERROR;
      });
  }
}

form.addEventListener("submit", handleSubmit);

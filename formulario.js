const form = document.getElementById("my-form");
const formStatus = document.getElementById("my-form-status");
const formStatusNombre = document.getElementById("my-form-status-nombre");
const formStatusEmail = document.getElementById("my-form-status-email");

const mensajes = {
  OK: "Gracias por contactarme!",
  ERROR: "Lo siento, hubo un error al enviar el formulario",
  NOMBRE_LARGO: "mensaje nombre largo",
  VACIO: "Este campo es obligatorio",
  NO_COINCIDE: "Este formato no coincide",
};

const formatoEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/;

const esVacio = (texto) => {
  return texto === "" || texto.trim() === "";
};

const validarNombre = (nombre) => {
  if (nombre.length > 50) {
    formStatusNombre.innerHTML = mensajes.NOMBRE_LARGO;
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

const validarAsunto = () => {};

const validarMensaje = () => {};

function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);

  const esNombreValido = validarNombre(data.get("nombre"));
  const esEmailValido = validarCorreo(data.get("email"));

  if (esNombreValido && esEmailValido) {
    console.log("todo ok, envio data");
    return;
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

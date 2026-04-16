document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.getElementById("chat-toggle");
  const chat = document.getElementById("chat");
  const closeBtn = document.getElementById("close-chat");
  const input = document.getElementById("msg");
  const mensajes = document.getElementById("mensajes");

  // abrir / cerrar chat
  if (toggle) {
    toggle.addEventListener("click", () => {
      chat.classList.toggle("hidden");
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      chat.classList.add("hidden");
    });
  }

  // Enter para enviar
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        enviar();
      }
    });
  }

  // función enviar (solo UI)
  window.enviar = function () {
    const mensaje = input.value.trim();
    if (!mensaje) return;

    agregarMensaje(mensaje, "user");
    input.value = "";

    // respuesta simulada (frontend only)
    setTimeout(() => {
      const respuesta = generarRespuestaLocal(mensaje);
      agregarMensaje(respuesta, "bot");
    }, 500);
  };

  // agregar mensaje al chat
  function agregarMensaje(texto, tipo) {
    const div = document.createElement("div");
    div.classList.add("msg", tipo);
    div.textContent = texto;

    mensajes.appendChild(div);
    mensajes.scrollTop = mensajes.scrollHeight;
  }

  // lógica simple frontend (sin backend)
  function generarRespuestaLocal(texto) {
    texto = texto.toLowerCase();

    if (texto.includes("dolor de cabeza")) {
      return "💡 Podría ser estrés o falta de descanso. Intenta hidratarte y descansar.";
    }

    if (texto.includes("fiebre")) {
      return "🌡️ Podría ser infección. Si persiste, consulta a un médico.";
    }

    if (texto.includes("tos")) {
      return "🫁 Mantente hidratado y observa si hay otros síntomas.";
    }

    return "🤖 No tengo suficiente información, pero si los síntomas persisten, consulta a un médico.";
  }

});
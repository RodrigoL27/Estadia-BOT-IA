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

  // 🔥 FUNCIÓN PRINCIPAL (YA CON BACKEND)
  window.enviar = async function () {
    const mensaje = input.value.trim();
    if (!mensaje) return;

    agregarMensaje(mensaje, "user");
    input.value = "";

    try {
      const res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ mensaje })
      });

      const data = await res.json();

      agregarMensaje(data.reply, "bot");

    } catch (error) {
      agregarMensaje("❌ Error al conectar con el servidor", "bot");
    }
  };

  function agregarMensaje(texto, tipo) {
    const div = document.createElement("div");
    div.classList.add("msg", tipo);
    div.textContent = texto;

    mensajes.appendChild(div);
    mensajes.scrollTop = mensajes.scrollHeight;
  }

});
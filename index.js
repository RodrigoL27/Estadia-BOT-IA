require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

// 🔐 API KEY segura desde .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// ---------------------
// TU LÓGICA (SE QUEDA)
// ---------------------
function analizarSintomas(texto = "") {
  texto = texto.toLowerCase();

  let nivel = "leve";
  let especialidad = "Medicina general";
  let recomendacion = "Descanso y monitoreo.";

  if (
    texto.includes("dolor en el pecho") ||
    texto.includes("no puedo respirar") ||
    texto.includes("convulsiones")
  ) {
    nivel = "alto";
    especialidad = "Urgencias / Cardiología";
    recomendacion = "Acude inmediatamente a urgencias.";
  }

  else if (
    texto.includes("fiebre") ||
    texto.includes("infección") ||
    texto.includes("dolor fuerte")
  ) {
    nivel = "medio";
    especialidad = "Medicina general";
    recomendacion = "Consulta con un médico lo antes posible.";
  }

  else if (
    texto.includes("dolor de cabeza") ||
    texto.includes("resfriado") ||
    texto.includes("tos")
  ) {
    nivel = "leve";
    especialidad = "Ninguna necesaria";
    recomendacion = "Puedes tomar paracetamol y descansar.";
  }

  return { nivel, especialidad, recomendacion };
}

// ---------------------
// ENDPOINT CON IA (HUMANO)
// ---------------------
app.post("/chat", async (req, res) => {
  const { mensaje } = req.body;

  if (!mensaje) {
    return res.status(400).json({
      reply: "Falta el mensaje del usuario"
    });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
Eres un asistente médico de triage humano, cercano y empático.

Hablas como un doctor real pero de forma natural, como en una conversación.
NO uses formato de lista ni encabezados tipo "Respuesta:".

Tu estilo:
- Conversacional
- Empático
- Claro y breve

Tu objetivo:
- Entender los síntomas
- Hacer preguntas si falta información
- Dar orientación básica


Reglas:
- NO des diagnósticos definitivos
- Respuestas no tan largas y legibles
- Integra todo en un solo mensaje natural
- Haz preguntas por si es que falta informacion

- NO menciones el nivel de riesgo en cada respuesta
- Solo menciona el nivel si:
  1) el caso parece grave, o
  2) ya tienes suficiente información



IMPORTANTE:
Al final del mensaje, menciona de forma natural:
- nivel de riesgo (leve, medio o alto)
- especialidad sugerida
- recomendación

Ejemplo:
"Entiendo cómo te sientes... podrías decirme si tienes fiebre? Por ahora parece algo leve, podrías acudir con un médico general si no mejora."
`
        },
        {
          role: "user",
          content: mensaje
        }
      ]
    });

    const respuestaIA = completion.choices[0].message.content;

    // 🧠 respaldo lógico
    const resultado = analizarSintomas(mensaje);

    const respuesta = `${respuestaIA}`;

    res.json({ reply: respuesta });

  } catch (error) {
    console.error(error);

    const resultado = analizarSintomas(mensaje);

    res.json({
      reply: `
⚠️ En este momento no puedo acceder a la IA, pero aún puedo orientarte.

Parece un caso ${resultado.nivel}. ${resultado.recomendacion}
`
    });
  }
});

// ---------------------
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🔥");
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
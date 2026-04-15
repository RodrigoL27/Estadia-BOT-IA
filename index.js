const express = require("express");
const cors = require("cors");

const app = express();

// 🔥 IMPORTANTE
app.use(cors());
app.use(express.json());

// Función de análisis simple
function analizarSintomas(texto = "") {
texto = texto.toLowerCase();

```
let nivel = "leve";
let especialidad = "Medicina general";
let recomendacion = "Descanso y monitoreo.";

// 🚨 CASOS GRAVES
if (
    texto.includes("dolor en el pecho") ||
    texto.includes("no puedo respirar") ||
    texto.includes("convulsiones")
) {
    nivel = "alto";
    especialidad = "Urgencias / Cardiología";
    recomendacion = "Acude inmediatamente a urgencias.";
}

// ⚠️ CASOS MEDIOS
else if (
    texto.includes("fiebre") ||
    texto.includes("infección") ||
    texto.includes("dolor fuerte")
) {
    nivel = "medio";
    especialidad = "Medicina general";
    recomendacion = "Consulta con un médico lo antes posible.";
}

// 🙂 CASOS LEVES
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
```

}

// Endpoint principal
app.post("/chat", (req, res) => {
const { mensaje } = req.body;

```
if (!mensaje) {
    return res.status(400).json({
        reply: "Falta el mensaje del usuario"
    });
}

const resultado = analizarSintomas(mensaje);

const respuesta = `
```

Este sistema realiza una orientación inicial y no sustituye un diagnóstico médico profesional.

Nivel de riesgo: ${resultado.nivel}
Especialidad sugerida: ${resultado.especialidad}
Recomendación: ${resultado.recomendacion}
`;

```
res.json({ reply: respuesta });
```

});

// Endpoint de prueba
app.get("/", (req, res) => {
res.send("Servidor de bot médico funcionando 🔥");
});

// Servidor
app.listen(3000, () => {
console.log("Servidor corriendo en http://localhost:3000");
});

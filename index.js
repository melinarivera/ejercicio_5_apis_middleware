const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

const items = [
  { id: 1, nombre: "Mac", precio: 15000 },
  { id: 2, nombre: "Mouse", precio: 500 },
  { id: 3, nombre: "Teclado", precio: 1200 }
];

app.get("/", (req, res) => {
  res.json({ message: "Servidor funcionando correctamente" });
});

// 1. Primera api 
app.get("/items", (req, res) => {
  res.json({
    ok: true,
    data: items
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
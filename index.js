const express = require("express");
const logger = require("./middleware/logger");
const auth = require("./middleware/auth");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

const items = [
  { id: 1, nombre: "Mac", precio: 15000 },
  { id: 2, nombre: "Mouse", precio: 500 },
  { id: 3, nombre: "Teclado", precio: 1200 },
];

app.get("/", (req, res) => {
  res.json({ message: "Servidor funcionando correctamente" });
});

// 1. Primera api
app.get("/items", (req, res) => {
  res.json({
    ok: true,
    data: items,
  });
});

// 2. Segunda api
app.post("/items", (req, res) => {
  const { nombre, precio } = req.body;

  const nuevoItem = {
    id: items.length + 1,
    nombre,
    precio,
  };

  items.push(nuevoItem);

  res.status(201).json({
    ok: true,
    message: "Item creado correctamente",
    data: nuevoItem,
  });
});


//api 3

app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, precio } = req.body;

  const item = items.find((i) => i.id === id);

  if (!item) {
    return res.status(404).json({
      ok: false,
      message: "Item no encontrado",
    });
  }

  item.nombre = nombre ?? item.nombre;
  item.precio = precio ?? item.precio;

  res.json({
    ok: true,
    message: "Item actualizado",
    data: item,
  });
});

//api 4
app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = items.findIndex((i) => i.id === id);

  if (index === -1) {
    return res.status(404).json({
      ok: false,
      message: "Item no encontrado",
    });
  }

  const eliminado = items.splice(index, 1);

  res.json({
    ok: true,
    message: "Item eliminado",
    data: eliminado[0],
  });
});

//api 5

app.get("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const item = items.find((i) => i.id === id);

  if (!item) {
    return res.status(404).json({
      ok: false,
      message: "Item no encontrado",
    });
  }

  res.json({
    ok: true,
    data: item,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
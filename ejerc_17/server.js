import express from "express";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(__dirname));

// Logging
if (!fs.existsSync(path.join(__dirname, "logs"))) fs.mkdirSync(path.join(__dirname, "logs"));
const accessLogStream = fs.createWriteStream(path.join(__dirname, "logs", "access.log"), { flags: "a" });
app.use(morgan("combined", { stream: accessLogStream }));
app.use(morgan("dev"));

// Archivos JSON
const albumsPath = path.join(__dirname, "data", "albunes.json");
const artistasPath = path.join(__dirname, "data", "artista.json");

// Leer y guardar JSON
const leerJSON = (ruta) => fs.existsSync(ruta) ? JSON.parse(fs.readFileSync(ruta, "utf-8")) : [];
const guardarJSON = (ruta, datos) => fs.writeFileSync(ruta, JSON.stringify(datos, null, 2), "utf-8");

// -----------------------------
// CRUD Álbumes
// -----------------------------
app.get("/albumes", (req, res) => {
  res.json(leerJSON(albumsPath));
});

app.post("/albumes", (req, res) => {
  const albumes = leerJSON(albumsPath);
  const nuevo = {
    id: Date.now(),
    titulo: req.body.titulo || "Desconocido",
    artista: req.body.artista || "Desconocido",
    anio: req.body.anio || "N/A",
    pais: req.body.pais || "N/A",
    foto: req.body.foto || "",
    genero: req.body.genero || "N/A"
  };
  albumes.push(nuevo);
  guardarJSON(albumsPath, albumes);
  res.status(201).json(nuevo);
});

app.put("/albumes/:id", (req, res) => {
  const albumes = leerJSON(albumsPath);
  const idx = albumes.findIndex(a => a.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Álbum no encontrado" });

  albumes[idx] = {
    ...albumes[idx],
    titulo: req.body.titulo || albumes[idx].titulo,
    artista: req.body.artista || albumes[idx].artista,
    anio: req.body.anio || albumes[idx].anio,
    pais: req.body.pais || albumes[idx].pais,
    foto: req.body.foto || albumes[idx].foto,
    genero: req.body.genero || albumes[idx].genero
  };
  guardarJSON(albumsPath, albumes);
  res.json(albumes[idx]);
});

app.delete("/albumes/:id", (req, res) => {
  let albumes = leerJSON(albumsPath);
  albumes = albumes.filter(a => a.id != req.params.id);
  guardarJSON(albumsPath, albumes);
  res.sendStatus(204);
});

// -----------------------------
// CRUD Artistas
// -----------------------------
app.get("/artistas", (req, res) => {
  res.json(leerJSON(artistasPath));
});

app.post("/artistas", (req, res) => {
  const artistas = leerJSON(artistasPath);
  const nuevo = {
    id: Date.now(),
    nombre: req.body.nombre || "Desconocido",
    pais: req.body.pais || "N/A",
    foto: req.body.foto || ""
  };
  artistas.push(nuevo);
  guardarJSON(artistasPath, artistas);
  res.status(201).json(nuevo);
});

app.put("/artistas/:id", (req, res) => {
  const artistas = leerJSON(artistasPath);
  const idx = artistas.findIndex(a => a.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Artista no encontrado" });

  artistas[idx] = {
    ...artistas[idx],
    nombre: req.body.nombre || artistas[idx].nombre,
    pais: req.body.pais || artistas[idx].pais,
    foto: req.body.foto || artistas[idx].foto
  };
  guardarJSON(artistasPath, artistas);
  res.json(artistas[idx]);
});

app.delete("/artistas/:id", (req, res) => {
  let artistas = leerJSON(artistasPath);
  artistas = artistas.filter(a => a.id != req.params.id);
  guardarJSON(artistasPath, artistas);
  res.sendStatus(204);
});

// -----------------------------
// Servir index.html
// -----------------------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// -----------------------------
// Iniciar servidor
// -----------------------------
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

import express from "express";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import albumController from "./album/album.controller.js";
import artistaController from "./artista/artista.controller.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const accessLog = fs.createWriteStream("access.log", { flags: "a" });
app.use(morgan("combined", { stream: accessLog }));


app.use("/", albumController);
app.use("/", artistaController);

app.get("/", (req, res) => {
  res.send(`
    <h1>Discoteca Virtual</h1>
    <a href="/albumes">Ver Álbumes</a><br>
    <a href="/artistas">Ver Artistas</a>
  `);
});

app.listen(3000, () => console.log("http://localhost:3000"));

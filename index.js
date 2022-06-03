const express = require("express");
const { Contenedor } = require("./contenedor.js");
const PORT = 8080;
const app = express();

// devuelve un numero aleatorio entre min y max ambos incluidos
function getRandom(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// creo el objeto productos con el contenido de productos.txt
const productos = new Contenedor("./productos.txt");

// creo el servidor de Express en el puerto indicado
const server = app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

// loguear cualquier error a consola
server.on("error", (error) => console.log(`Error en servidor ${error}`));

// ruta /productos arreglo con los productos disponibles
app.get("/productos", (req, res) => {
  res.send(productos.getAll());
});

// ruta /productoRandom selecciona un producto al azar de los disponibles
app.get("/productoRandom", (req, res) => {
  const arrayProductos = productos.getAll();
  const seleccion = getRandom(0, arrayProductos.length - 1);
  res.send(arrayProductos[seleccion]);
});

// ruta / portada
app.get("/", (req, res) => {
  res.send(
`<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css">
<style>body {  background: #eaafc8;  background: -webkit-linear-gradient(to right, #eaafc8, #654ea3);  background: linear-gradient(to right, #eaafc8, #654ea3);  min-height: 100vh;}</style>
<section class="py-5 text-white">
  <div class="container py-4">
    <div class="row">
      <div class="col-lg-8 mx-auto text-center">
        <h1 class="display-4">Coderhouse programacion backend 31000</h1>
        <p class="lead mb-0">Desafio 3: Servidor con express</p>
      </div>
    </div>
  </div>
</section>`
  );
});

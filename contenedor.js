const fs = require("fs");
const encoding = "utf8";

class Contenedor {
  constructor(nombreArchivoContenedor) {
    // Guarda el nombre del archivo contenedor e inicializa
    // el contenido de listaProductos con el contenido
    // del archivo
    this.nombreArchivo = nombreArchivoContenedor;
    this.listaProductos = this.readFromFile();
  }
  // escribe listaProductos en el archivo indicado por nombreArchivo
  async saveToFile() {
    try {
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(this.listaProductos),
        encoding
      );
    } catch (error) {
      throw error;
    }
  }
  // lee el contenido de nombreArchivo
  readFromFile() {
    try {
      return JSON.parse(fs.readFileSync(this.nombreArchivo));
    } catch (error) {
      // Hubo un error al leer el archivo,
      // asumo que no existe y retorno un arreglo vacio
      return [];
    }
  }
  // agrega un nuevo producto a listaProductos y graba en disco
  // retorna el id del nuevo producto
  save(producto) {
    // busco el id maximo actual y le sumo 1
    let id = 0;
    this.listaProductos.forEach((element) => {
      if (element.id > id) id = element.id;
    });
    id++;
    // seteo el id en el objeto
    producto.id = id;
    // agrego el objeto a la lista de productos
    this.listaProductos.push(producto);
    // escribo el archivo (async)
    this.saveToFile();
    return id;
  }
  // devuelve el indice en listaProductos de idBuscado si existe
  indexOf(idBuscado) {
    for (let i = 0; i < this.listaProductos.length; i++) {
      if (this.listaProductos[i].id === idBuscado) return i;
    }
    return -1;
  }
  // retorna el producto indicado por idBuscado o null si no existe
  getById(idBuscado) {
    let index = this.indexOf(idBuscado);
    if (index >= 0) {
      return this.listaProductos[index];
    }
    return null;
  }
  // devuelve la lista completa de productos
  getAll() {
    return this.listaProductos;
  }
  // elimina el producto del id indicado
  deleteById(idBuscado) {
    let index = this.indexOf(idBuscado);
    if (index >= 0) {
      // borro el elemento del arreglo
      this.listaProductos.splice(index, 1);
      // escribo el archivo (async)
      this.saveToFile();
    } else {
      throw new Error("El elemento no existe");
    }
  }
  deleteAll() {
    this.listaProductos = [];
    // escribo el archivo (async)
    this.saveToFile();
  }
}

// Atajo para stringify
const formateaObj = (obj) => JSON.stringify(obj);

module.exports = { Contenedor, formateaObj };

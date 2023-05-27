// Evento boton agregar al click 
const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
  nav.classList.add("active");
});

cerrar.addEventListener("click", () => {
  nav.classList.remove("active");
});

// ARRAYS DE PRODUCTOS 

const productos = [
  /*    Monitores */
  {
    id: "monitor-1",
    titulo: "Monitor 1",
    imagen: "./assest/monitor/monitor 1.jpg",
    categoria: {
      nombre: "Monitor",
      id: "monitor",
    },
    precio: 1000,
  },

  {
    id: "monitor-2",
    titulo: "Monitor 2",
    imagen: "./assest/monitor/monitor 2.jpg",
    categoria: {
      nombre: "Monitor",
      id: "monitor",
    },
    precio: 1000,
  },
  /*   Mouse */
  {
    id: "mouse-1",
    titulo: "Mouse 1",
    imagen: "./assest/mouse/mouse 1.jpg",
    categoria: {
      nombre: "Mouse",
      id: "mouse",
    },
    precio: 1000,
  },
  {
    id: "mouse-2",
    titulo: "Mouse 2",
    imagen: "./assest/mouse/mouse 2.jpg",
    categoria: {
      nombre: "Mouse",
      id: "mouse",
    },
    precio: 2000,
  },
  /*  Placa de video */
  {
    id: "placa-de-video-1",
    titulo: "Placa de video 1",
    imagen: "./assest/placa-de-video/placa de video 1.jpg",
    categoria: {
      nombre: "Placa de video",
      id: "placa-de-video",
    },
    precio: 1000,
  },
  {
    id: "placa-de-video-2",
    titulo: "Placa de video 2",
    imagen: "./assest/placa-de-video/placa de video 2.jpg",
    categoria: {
      nombre: "Placa de video",
      id: "placa de video",
    },
    precio: 2000,
  },
  /* SILLA GAMER */
  {
    id: "silla-gamer-1",
    titulo: "Silla gamer 1",
    imagen: "./assest/silla-gamer/silla-gamer 1.jpg",
    categoria: {
      nombre: "Silla gamer",
      id: "silla-gamer",
    },
    precio: 1000,
  },
  {
    id: "silla-gamer-2",
    titulo: "Silla gamer 2",
    imagen: "./assest/silla-gamer/silla-gamer 2.jpg",
    categoria: {
      nombre: "Silla gamer",
      id: "silla-gamer",
    },
    precio: "2009",
  },
  {
    id: "silla-gamer-3",
    titulo: "Silla gamer 3",
    imagen: "./assest/silla-gamer/silla-gamer 3.jpg",
    categoria: {
      nombre: "Silla gamer",
      id: "silla-gamer",
    },
    precio: "2009",
  },
 /*  Teclado Gamer */
 {
    id: "teclado-gamer-1",
    titulo: "Teclado gamer 1",
    imagen: "./assest/teclado-gamer/teclado-gamer 1.jpg",
    categoria: {
        nombre: "Teclado gamer",
        id: "teclado-gamer",
    },
    precio: 1000,
},
{
    id: "teclado-gamer-2",
    titulo: "Teclado Gamer 2",
    imagen: "./assest/teclado-gamer/teclado-gamer 2.jpg",
    categoria: {
        nombre: "Teclado gamer",
        id: "teclado-gamer",
        },
        precio: "2009",
        },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria")

// COTENERDOR PRODUCTO EN EL MAIN 

function cargarProductos(productosElegidos) {
  productos.forEach(productos => {
    const producto = document.createElement("div");
    producto.classList.add("product");
    producto.innerHTML = ` 
        <img class="product_img" src="${productos.imagen}" alt="${productos.titulo}">
        <div class="product_details">
            <h3>${productos.titulo}</h3>
            <p>${productos.precio}</p>
            <button class="product_btn" id="${productos.id}" >agregar</button>
        </div>`;
    contenedorProductos.append(producto);
})
}
/* Llamado */
cargarProductos(productos);


// MOSTRAR LA CATEGORIA CORRESPONDIENTE
botonesCategorias.forEach(btn => {
  btn.addEventListener("click", () => {
const productosElegidos = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
   cargarProductos(productos);
  })
})




 
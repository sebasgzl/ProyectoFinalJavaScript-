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
      id: "placa-de-video",
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

//Traer del HTML
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let btnAgregar = document.querySelectorAll(".product_btn");
let numero = document.querySelector("#numero");


// *********COTENERDOR PRODUCTO EN EL MAIN

function cargarProductos(productosElegidos) {
  contenedorProductos.innerHTML = "";

  productosElegidos.forEach((productos) => {
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
  botonAgregar();
}
/* Llamado */
cargarProductos(productos);

//******* MOSTRAR LA CATEGORIA CORRESPONDIENTE

botonesCategorias.forEach(boton => {
  boton.addEventListener("click", (e) => {
    botonesCategorias.forEach(boton => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");

    if (e.currentTarget.id != "todos") {
      // titulo
      const productosCategoria = productos.find( producto => producto.categoria.id === e.currentTarget.id);
      tituloPrincipal.innerText = productosCategoria.categoria.nombre;
      // producto
      const productoBtn = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
      cargarProductos(productoBtn);
    } else {
      // titulo
      tituloPrincipal.innerText = "Todos los productos";
      // producto
      cargarProductos(productos);
    }
  });
});




//*********** AGREGAR AL CARRITO

function botonAgregar() {
  btnAgregar = document.querySelectorAll(".product_btn");
  btnAgregar.forEach(boton => {
  boton.addEventListener("click" , agregarAlCarrito);
});
}


/* QUE SE ACTUALIZE EL lOCALSTORAGE CON EL CARRITO */
 let  productosEnCarrito;
 const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));
if (productosEnCarritoLS){
  productosEnCarrito = productosEnCarritoLS;
  numeroActualizado();
} else {
productosEnCarrito = [];

}





/* ingresar los productos a la Array de carrito (productosEnCarrito)*/
function agregarAlCarrito(e) {
  const idBoton = e.currentTarget.id;
  const productoAgregar = productos.find(producto => producto.id === idBoton);
  if(productosEnCarrito.some(producto => producto.id === idBoton)){
  const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
  productosEnCarrito[index].cantidad++;
 } else {
  productoAgregar.cantidad = 1;
 productosEnCarrito.push(productoAgregar);
 }
 numeroActualizado();
 localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
}

/* Actualiza cantidad de compra */
function numeroActualizado() {
  let nuevoNumero = productosEnCarrito.reduce((acc, producto)=> acc + producto.cantidad, 0);
  numero.innerText = nuevoNumero;
}








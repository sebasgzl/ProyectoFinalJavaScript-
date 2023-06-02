

// ***********CONECTAR CON EL JSON Y LLEVARLO AL HTML
let productos = []
fetch("./js/productos.json")
.then(response => response.json())
.then (data => {
  productos = data;
  cargarProductos(productos)
})



//Traer del HTML
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let btnAgregar = document.querySelectorAll(".product_btn");
let numero = document.querySelector("#numero");
const buscarInput = document.querySelector("#buscador");


// ********BUSCADOR DE PRODUCTOS
buscarInput.addEventListener("keyup", () => {
  const textoBusqueda = buscarInput.value.toLowerCase();
  const productosFiltrados = productos.filter((producto) => {
    return producto.titulo.toLowerCase().includes(textoBusqueda);
  });
  cargarProductos(productosFiltrados);
});


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
 let productosEnCarritoLS = localStorage.getItem("productos-en-carrito")
 /* const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito")); */
if (productosEnCarritoLS){
  productosEnCarrito = JSON.parse(productosEnCarritoLS);
 /*  productosEnCarrito = productosEnCarritoLS; */
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

 Toastify({
  text: "Producto Agregado",
  duration: 3000,
  newWindow: true,
  close: true,
  gravity: "bottom", // `top` or `bottom`
  position: "right", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right,#403A3E ,#BE5869 )",
  },
  onClick: function(){} // Callback after click
}).showToast();

}




/* Actualiza cantidad de compra */
function numeroActualizado() {
  let nuevoNumero = productosEnCarrito.reduce((acc, producto)=> acc + producto.cantidad, 0);
  numero.innerText = nuevoNumero;
}








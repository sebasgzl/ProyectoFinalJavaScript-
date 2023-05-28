

const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

let carritoProductos  = document.querySelector("#carrito-productos")
let carritoComprado = document.querySelector("#carrito-comprado")
let carritoVacio     = document.querySelector("#carrito-vacio")
let carritoAccion = document.querySelector("#carrito-accion")

if(productosEnCarrito){
carritoVacio.classList.add("disable");
carritoComprado.classList.add("disable");
carritoProductos.classList.add("disable");
carritoAccion.classList.add("disable");
}else{

}
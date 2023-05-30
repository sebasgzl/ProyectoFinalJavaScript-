

/* let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));*/
 let productosEnCarrito = (localStorage.getItem("productos-en-carrito"));
productosEnCarrito = JSON.parse(productosEnCarrito);

const carritoProductos  = document.querySelector("#carrito-productos")
const carritoComprado = document.querySelector("#carrito-comprado")
const carritoVacio     = document.querySelector("#carrito-vacio")
const carritoAccion = document.querySelector("#carrito-accion")
let botonEliminar = document.querySelectorAll(".carrito_productos__eliminar")
const botonVaciar = document.querySelector(".carrito_accion_vaciar")
const total = document.querySelector("#total")
const botonComprar = document.querySelector(".carrito_accion_comprar")

//******MOSTRA LOS CARRITOS EN LA PANTALLA, ELIMINAR...

function CargarProductoCarrito (){
    if(productosEnCarrito && productosEnCarrito.length >0){

    carritoVacio.classList.add("disabled");
    carritoProductos.classList.remove("disabled");
    carritoAccion.classList.remove("disabled");
    carritoComprado.classList.add("disabled");
    
    carritoProductos.innerHTML = "";
    
    productosEnCarrito.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("carrito_productos");
        div.innerHTML = ` 
        <div class= "carrito_productos__producto">
            <img class="carrito_productos__imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carrito_productos__titulo">
                <small>Titulo</small>
                <h3>${producto.titulo}</h3>
            </div>
            <div class="carrito_productos__cantidad">
                <small>Cantidad</small>
                <div class="carrito_productos__orden">
                    <button class="carrito_productos__suma"><i class="bi bi-plus"></i> </button> 
                    <p>${producto.cantidad}</p>
                   <button class="carrito_productos__menos"><i class="bi bi-dash"></i></button> 
                </div>
            </div>
            <div class="carrito_producto-precio">
                <small>precio</small>
                <p>${producto.precio}</p>
            </div>
            <div class="carrito_producto-subtotal">
                <small>SubTotal</small>
                <p>${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carrito_productos__eliminar" id=${producto.id}><i class="bi bi-trash3-fill"></i></button>
          </div> ` ;
          
            carritoProductos.append(div);
    })
    
    
    }else{
        carritoVacio.classList.remove("disabled");
        carritoProductos.classList.add("disabled");
        carritoAccion.classList.add("disabled");  
        carritoComprado.classList.add("disabled");
    }
    botonesEliminar();
    actualizarTotal();
}

CargarProductoCarrito()

function botonesEliminar() {
    botonEliminar = document.querySelectorAll(".carrito_productos__eliminar");
    botonEliminar.forEach(boton => {
    boton.addEventListener("click" , eliminarDelCarrito);
  });
  }

  function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id; 
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito.splice(index, 1) ;  
    CargarProductoCarrito();
    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
  }


//************ELIMINAR TODOS LOS PRODUCTOS

botonVaciar.addEventListener("click" , vaciarCarrito)
function vaciarCarrito () {
    
productosEnCarrito.length = 0;
localStorage.setItem("productos-en-carrito" , JSON.stringify(productosEnCarrito));
CargarProductoCarrito();

}

//*********TOTAL Y BTN COMPRAR

function actualizarTotal() {
 const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad),0);
    total.innerText = `$${totalCalculado}`
}


//********* BOTON COMPRAR 

botonComprar.addEventListener("click" , comprarCarrito);
function comprarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    carritoVacio.classList.add("disabled");
    carritoProductos.classList.add("disabled");
    carritoAccion.classList.add("disabled");  
    carritoComprado.classList.remove("disabled");

}
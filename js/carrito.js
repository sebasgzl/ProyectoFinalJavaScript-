
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
                    <button id="mas" class="carrito_productos__suma">+</button> 
                    <span>${producto.cantidad}</span>
                   <button id="menos" class="carrito_productos__menos">-</button> 
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
            
            let restar = div.querySelector("#menos");

            restar.addEventListener("click", () => {
              if (producto.cantidad !== 1) {
                producto.cantidad--;
              }
              CargarProductoCarrito();
            
            });
          
            let sumar = div.querySelector("#mas");
            sumar.addEventListener("click", () => {
              producto.cantidad++;
             CargarProductoCarrito();
            
            });

          })
          
          
        }else{
          carritoVacio.classList.remove("disabled");
          carritoProductos.classList.add("disabled");
          carritoAccion.classList.add("disabled");  
          carritoComprado.classList.add("disabled");
        }
        actualizarTotal(); 
        botonesEliminar();
      }
      
      CargarProductoCarrito()
      

//*************ICONO DE TACHO */
              
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
  
    Toastify({
      text: "Producto Eliminado",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right,#360033 ,#0b8793 )",
      },
      onClick: function(){} // Callback after click
    }).showToast();
  
  
  }


//***********ELIMINAR TODOS LOS PRODUCTOS

botonVaciar.addEventListener("click" , vaciarCarrito)
function vaciarCarrito () {
    
  
  Swal.fire({
    title: 'Estas seguro ?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'si, vaciar carrito!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        ' Eliminado !',
        'tu carrito fue vaciado.',
        'aceptar'
        )
        productosEnCarrito.length = 0;
        localStorage.setItem("productos-en-carrito" , JSON.stringify(productosEnCarrito));
        CargarProductoCarrito();
      }
    })
      

}

//*********TOTAL Y BTN COMPRAR

function actualizarTotal() {
    
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad),0);
       total.innerText = `$${totalCalculado}`
   }

/* function actualizarTotal() {
 const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad),0);
    total.innerText = `$${totalCalculado}`
} */


//********* BOTON COMPRAR 

botonComprar.addEventListener("click" , comprarCarrito);
function comprarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    carritoVacio.classList.add("disabled");
    carritoProductos.classList.add("disabled");
    carritoAccion.classList.add("disabled");  
    carritoComprado.classList.remove("disabled");

    Swal.fire({
      icon: 'success',
      title: 'Comprado',
      text: 'El producto será empaquetado y enviado ',
     
    })
    


}
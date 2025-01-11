let productosEnCarritos = localStorage.getItem("productos-en-carrito");
productosEnCarritos = JSON.parse(productosEnCarritos);

const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoAcciones = document.querySelector("#carrito-acciones");
let botonesEliminar;

const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const total = document.querySelector("#total");

function cargarProductosCarrito() {
    if(productosEnCarritos && productosEnCarritos.length > 0) {

        carritoVacio.classList.add("disable");
        carritoProductos.classList.remove("disable");
        carritoAcciones.classList.remove("disable");
    
        carritoProductos.innerHTML = '';
    
        productosEnCarritos.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML =`
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}">
                    <i class="bi bi-trash-fill"></i>
                </button>
            `
            carritoProductos.append(div);
        });
    } else {
        carritoVacio.classList.remove("disable");
        carritoProductos.classList.add("disable");
        carritoAcciones.classList.add("disable");
    };
    actualizarBotonesEliminar();
    actualizarTotal();
}
cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;

    const index = productosEnCarritos.findIndex(producto => producto.id === idBoton);
    productosEnCarritos.splice(index, 1);

    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarritos));
};

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    productosEnCarritos.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarritos));

    cargarProductosCarrito();
};

function actualizarTotal() {
    const totalCalculado = productosEnCarritos.reduce((acc,producto) =>acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
};
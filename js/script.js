const prductosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

const carritoVacio = document.querySelector('#carrito-vacio');
const carritoProductos = document.querySelector('#carrito-productos');
const carritoAcciones = document.querySelector('#carrito-acciones');



if(prductosEnCarrito){
    carritoVacio.classList.add('disabled');
    carritoProductos.classList.remove('disabled');
    carritoAcciones.classList.remove('disabled');

    const div = document.createElement('div');
}
const productos = [
    {
        id: 1,
        nombre: "Producto 1",
        descripcion: "Costillar entero",
        imagen: "./img/p-costillar.jpg",
        precio: 7999,
        stock: 30,
    },
    {
        id: 2,
        nombre: "Producto 2",
        descripcion: "Cuadril",
        imagen: "./img/p-churrasco-cuadril.jpg",
        precio: 9499,
        stock: 45
    },
    {
        id: 3,
        nombre: "Producto 3",
        descripcion: "Bife de costilla",
        imagen: "./img/p-bife-costilla.jpg",
        precio: 7499,
        stock: 40
    },
    {
        id: 4,
        nombre: "Producto 4",
        descripcion: "Ojo de bife",
        imagen: "./img/p-ojo-de-bife.jpg",
        precio: 8599,
        stock: 37
    },
    {
        id: 5,
        nombre: "Producto 5",
        descripcion: "Picada especial",
        imagen: "./img/p-picada-especial.jpg",
        precio: 7299,
        stock: 35
    },
    {
        id: 6,
        nombre: "Producto 6",
        descripcion: "Osobuco",
        imagen: "./img/p-osobuco.jpg",
        precio: 4299,
        stock: 25
    },
    {
        id: 7,
        nombre: "Producto 7",
        descripcion: "Suprema",
        imagen: "./img/p-suprema.jpg",
        precio: 6799,
        stock: 20
    },
    {
        id: 8,
        nombre: "Producto 8",
        descripcion: "Pata y muslo",
        imagen: "./img/p-pata-y-muslo.jpg",
        precio: 3799,
        stock: 27
    },
    {
        id: 9,
        nombre: "Producto 9",
        descripcion: "Pollo entero",
        imagen: "./img/p-pollo-entero.jpg",
        precio: 3499,
        stock: 10
    }
];
const contenedorArticle = document.querySelector('#contenedor-article');
const botonesCategoria = document.querySelectorAll(".botones-categoria");
let botonesAgregar;
const numerito = document.querySelector("#numero-carrito");

function cargarProductos() {
    productos.forEach( producto => {
        let div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}"  alt="${producto.descripcion}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.descripcion}</h3>
                <p class="producto-precio">$${producto.precio} x KG.</p>
                <button id="${producto.id}" class="agregar-carrito">Agregar al carrito</button>
            </div>
        `
        contenedorArticle.append(div);
    })
    actualizarBotones();
}
cargarProductos();

botonesCategoria.forEach( boton => {
    boton.addEventListener("click", (e) => {

        botonesCategoria.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
    })
});

function actualizarBotones() {
    botonesAgregar = document.querySelectorAll(".agregar-carrito");

    botonesAgregar.forEach( boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
};

const productosEnCarrito = [];

function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton );

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
};
function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
};
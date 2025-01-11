const productos = [
    {
        id: "cerdo-01",
        titulo: "Pechito de cerdo",
        imagen: "./img/cerdo/c-pechito.jpg",
        categoria: {
            id: "cerdo",
            nombre: "Cerdo"
        },
        precio: 7999,
    },
    {
        id: "cerdo-02",
        titulo: "Pechito entero",
        imagen: "./img/cerdo/c-pechito-entero.jpg",
        categoria: {
            id: "cerdo",
            nombre: "Cerdo"
        },
        precio: 6599,
    },
    {
        id: "vaca-01",
        titulo: "Cuadril",
        imagen: "./img/vacuna/v-churrasco-cuadril.jpg",
        categoria: {
            id: "vaca",
            nombre: "Vacuna",
        },
        precio: 9499,
    },
    {
        id: "vaca-02",
        titulo: "Bife de costilla",
        imagen: "./img/vacuna/v-bife-costilla.jpg",
        categoria: {
            id: "vaca",
            nombre: "Vacuna",
        },
        precio: 7499,
    },
    {
        id: "vaca-03",
        titulo: "Ojo de bife",
        imagen: "./img/vacuna/v-ojo-bife.jpg",
        categoria: {
            id: "vaca",
            nombre: "Vacuna",
        },
        precio: 8599,
    },
    {
        id: "vaca-04",
        titulo: "Picada especial",
        imagen: "./img/vacuna/v-picada-especial.jpg",
        categoria: {
            id: "vaca",
            nombre: "Vacuna",
        },
        precio: 6999,
    },
    {
        id: "vaca-05",
        titulo: "Hamburgusas",
        imagen: "./img/vacuna/v-hamburguesa.jpg",
        categoria: {
            id: "vaca",
            nombre: "Vacuna",
        },
        precio: 6299,
    },
    {
        id: "vaca-06",
        titulo: "Osobuco",
        imagen: "./img/vacuna/v-osobuco.jpg",
        categoria: {
            id: "vaca",
            nombre: "Vacuna",
        },
        precio: 4999,
    },
    {
        id: "pollo-01",
        titulo: "Suprema",
        imagen: "./img/pollo/p-suprema.jpg",
        categoria: {
            id: "pollo",
            nombre: "Pollo",
        },
        precio: 6799,
    },
    {
        id: "pollo-02",
        titulo: "Pata de pollo",
        imagen: "./img/pollo/p-pata.jpg",
        categoria: {
            id: "pollo",
            nombre: "Pollo",
        },
        precio: 3999,
    },
    {
        id: "pollo-03",
        titulo: "Pata y muslo",
        imagen: "./img/pollo/p-pata-muslo.jpg",
        categoria: {
            id: "pollo",
            nombre: "Pollo",
        },
        precio: 3799,
    },
    {
        id: "pollo-04",
        titulo: "Cuarto trasero",
        imagen: "./img/pollo/p-cuarto-trasero.jpg",
        categoria: {
            id: "pollo",
            nombre: "Pollo",
        },
        precio: 3199,
    },
    {
        id: "pollo-05",
        titulo: "Pollo entero",
        imagen: "./img/pollo/p-pollo-entero.jpg",
        categoria: {
            id: "pollo",
            nombre: "pollo",
        },
        precio: 3499,
    }
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");

let botonesAgregar;

const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="Imagen producto">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio} x KG.</p>
                <button id="${producto.id}" class="producto-agregar">Agregar</button>
            </div>
        `
        contenedorProductos.append(div);
    })
    actualizarBotonesAgregar();
};
cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos") {
            const productosCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productosCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    });
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    })
};


let productosEnCarrito;

let productosEnCarritosLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritosLS) {
    productosEnCarrito = JSON.parse(productosEnCarritosLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex( producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
};

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
;}
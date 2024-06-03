import { GetCarritoDocs, EliminarProductoDelCarrito, deleteCollection } from '../Controllers/firebase.js';

const imprimir = document.getElementById('contcarrito');
const vaciar = document.getElementById('vaciarCarritoBtn');
const sumar = document.getElementById('sumarTotalBtn');

    

async function cargarcarrito() {
    try {
        const querySnapshot = await GetCarritoDocs();
        let html = "";
        querySnapshot.forEach((doc) => {
            const producto = doc.data();
            html += `
                <div class="card-container" style="width:250px;">
                    <div class="card">
                        <div>
                            <p class="card-text" style="float: right;">${producto.codigo}</p>
                        </div>
                        <img src="${producto.urlproducto}" class="card-img-top" alt="${producto.name}" style="width: 100px; height: auto;">
                        <div class="card-body">
                            <h5 class="card-title">${producto.name}</h5>
                            <p class="card-text">${producto.precio}</p>
                            <button class="btn btn-danger" onclick="eliminarDelCarrito('${producto.codigo}')">Eliminar</button>
                        </div>
                    </div>
                </div>
            `;
        });
        imprimir.innerHTML = html;
    } catch (error) {
        console.error('Error obteniendo productos del carrito:', error);
    }
}


cargarcarrito(); 

window.eliminarDelCarrito = async function(codigo) {
    try {
        alert('Producto eliminado del carrito', codigo);
        await EliminarProductoDelCarrito(codigo)
        cargarcarrito();
    } catch (error) {
        console.error('Error al eliminar producto del carrito:', error);
    }
};

vaciar.addEventListener('click', async () => {
    try {
        await deleteCollection('datoscarrito');
        alert('carrito vaciado exitosamente');
        cargarcarrito();
    } catch (error) {
        console.error('Error al eliminar colección:', error);
    }
});
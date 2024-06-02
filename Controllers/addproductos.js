import { Setregister, archivoimg } from './firebase.js';

async function guardar(event) {
    event.preventDefault();
    const cod = document.getElementById('code').value;
    const nombre = document.getElementById('name').value;
    const descr = document.getElementById('desc').value;
    const precio = document.getElementById('precio').value;
    const imgprod = document.getElementById('fileimg').files[0];

    try {
        let urlarchivo = '';
        if (imgprod) {
            urlarchivo = await archivoimg(imgprod, nombre);
        }
        await Setregister(cod, nombre, descr, precio, urlarchivo);
        alert('Registro exitoso');
        window.location.href = '../Templates/agregar_produc.html';
    } catch (e) {
        console.error('error', e);
        alert('Registro fallido');
    }
}

export function initializeForm() {
    const save = document.getElementById('btnregister');
    if (save) {
        save.addEventListener('click', guardar);
    }
}


function ElegirMetodo(metodo) {
    document.getElementById('metodopago').innerText = metodo;
}

function generarReferenciaAleatoria() {
    // Generar un número aleatorio de 14 dígitos
    const referencia = Math.floor(10000000000000 + Math.random() * 90000000000000);
    document.getElementById('referencia').innerText = referencia;
}

function mostrarTotalGeneral() {
    const totalGeneral = localStorage.getItem('totalGeneral');
    if (totalGeneral) {
        document.getElementById('total').innerText = `Total: $${totalGeneral}`;
    }
}

window.onload = function() {
    mostrarTotalGeneral();
    generarReferenciaAleatoria();  // Asumiendo que esta función ya está definida
};
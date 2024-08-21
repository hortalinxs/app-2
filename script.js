let numeroActual = '';
let llamadaActiva = false;
const sonidoTonoCompleto = new Audio('sonidos/tono-completo.mp3'); // Archivo con todos los tonos
let llamadaEntranteTimeout;

document.querySelectorAll('.btn-num').forEach(boton => {
    boton.addEventListener('click', function() {
        const numero = boton.textContent;
        numeroActual += numero;
        document.getElementById('pantalla').value = numeroActual;
    });
});

document.getElementById('llamar').addEventListener('click', function() {
    if (numeroActual === '') {
        alert('¡Por favor, introduce un número!');
        return;
    }

    llamadaActiva = true;

    // Mostrar la pantalla de llamada saliente
    document.querySelector('.pantalla-marcador').classList.add('oculto');
    document.getElementById('llamada-saliente').classList.remove('oculto');
    document.getElementById('numero-marcado').textContent = numeroActual;

    // Reproducir el tono completo
    sonidoTonoCompleto.play();

    // Si el número marcado es 1234, configurar una llamada entrante después de 10 segundos
    if (numeroActual === '1234') {
        llamadaEntranteTimeout = setTimeout(() => {
            if (llamadaActiva) {
                document.getElementById('nombre-llamante').textContent = 'Lucía';
                document.getElementById('numero-llamante').textContent = '+34 601 01 01';
                document.getElementById('llamada-saliente').classList.add('oculto');
                document.getElementById('llamada-entrante').classList.remove('oculto');
            }
        }, 10000); // 10 segundos
    }
});

document.getElementById('aceptar-llamada').addEventListener('click', function() {
    alert('¡Llamada aceptada!');
    resetearLlamada();
});

document.getElementById('rechazar-llamada').addEventListener('click', function() {
    alert('¡Llamada rechazada!');
    resetearLlamada();
});

document.getElementById('terminar-llamada').addEventListener('click', function() {
    alert('¡Llamada terminada!');
    resetearLlamada();
});

function resetearLlamada() {
    llamadaActiva = false;
    numeroActual = '';
    document.getElementById('pantalla').value = '';
    document.querySelector('.pantalla-marcador').classList.remove('oculto');
    document.getElementById('llamada-entrante').classList.add('oculto');
    document.getElementById('llamada-saliente').classList.add('oculto');
    // Detener sonido si está reproduciendo
    sonidoTonoCompleto.pause();
    sonidoTonoCompleto.currentTime = 0;
    // Limpiar timeout para llamada entrante si existe
    clearTimeout(llamadaEntranteTimeout);
}


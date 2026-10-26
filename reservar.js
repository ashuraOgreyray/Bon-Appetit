document.addEventListener('DOMContentLoaded', () => {

    const reservaForm = document.getElementById('reservaForm');
    const fechaInput = document.getElementById('fecha');
    const btnEnviar = document.querySelector('.btn-enviar');

    if (fechaInput) {
        const hoy = new Date();

        const anio = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        const dia = String(hoy.getDate()).padStart(2, '0');

        fechaInput.min = `${anio}-${mes}-${dia}`;
    }

    if (reservaForm && btnEnviar) {

        reservaForm.addEventListener('submit', (e) => {

            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const email = document.getElementById('email').value.trim();
            const fecha = document.getElementById('fecha').value;
            const hora = document.getElementById('hora').value;
            const personas = document.getElementById('personas').value;
            const ocasion = document.getElementById('ocasion').value;
            const comentarios = document.getElementById('comentarios').value.trim();

            if (!nombre || !telefono || !fecha || !hora || !personas) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }

            if (fechaInput && fecha < fechaInput.min) {
                alert('Selecciona una fecha válida, igual o posterior al día de hoy.');
                return;
            }

            let mensaje = '🍽️ NUEVA RESERVACIÓN - BonAppetit\n\n';

            mensaje += `Nombre: ${nombre}\n`;
            mensaje += `Teléfono: ${telefono}\n`;

            if (email) {
                mensaje += `Correo electrónico: ${email}\n`;
            }

            mensaje += `Fecha: ${fecha}\n`;
            mensaje += `Hora: ${hora}\n`;
            mensaje += `Número de personas: ${personas}\n`;

            if (ocasion) {
                const ocasionFormateada =
                    ocasion.charAt(0).toUpperCase() + ocasion.slice(1);

                mensaje += `Ocasión especial: ${ocasionFormateada}\n`;
            }

            if (comentarios) {
                mensaje += `Comentarios: ${comentarios}\n`;
            }

            mensaje += '\n¡Espero su confirmación! Gracias.';

            const numeroWhatsApp = '525574708613';
            const mensajeCodificado = encodeURIComponent(mensaje);

            const urlWhatsApp =
                `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;

            const textoOriginal = btnEnviar.innerText;

            btnEnviar.innerText = 'Abriendo WhatsApp...';
            btnEnviar.disabled = true;

            const ventana = window.open(urlWhatsApp, '_blank');

            if (!ventana) {
                alert('No se pudo abrir WhatsApp. Permite las ventanas emergentes o abre WhatsApp manualmente.');
            } else {
                alert('Tu solicitud está preparada en WhatsApp. Presiona Enviar en el chat para solicitar tu reservación.');
            }

            btnEnviar.innerText = textoOriginal;
            btnEnviar.disabled = false;

        });

    }

});
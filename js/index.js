import { saveRegistro } from "./firebaseConfig.js";

const registro = document.getElementById("registration-form");

registro.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const empresa = document.getElementById("empresa").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();    
    const ciudad = document.getElementById("ciudad").value.trim();
    const cliente = document.getElementById("cliente").value.trim();

    console.log("Datos recibidos:", { name, empresa, phone, email, ciudad, cliente});

    // Enviar el formulario con EmailJS
    const serviceId = 'service_3vv7tpq';
    const templateId = 'template_oj075tg';

    emailjs.sendForm(serviceId, templateId, registro)
        .then(() => {
            console.log('Correo enviado correctamente!', registro);
            alert('¡Correo enviado correctamente! Ahora guardaremos tus datos.');

            // Guardar los datos en Firebase solo si el correo se envió correctamente
            saveRegistro(name, empresa, phone, email, ciudad, cliente);

            // Limpiar el formulario
            registro.reset();
        })
        .catch((error) => {
            console.error('Error al enviar el correo:', error);
            console.log('No se guardarán los datos en Firebase debido al error en el envío del correo.', registro);
            alert('Hubo un error al enviar el correo. Por favor, inténtalo de nuevo.');
        });
}); 

console.log("El archivo index.js se cargó correctamente como módulo.");

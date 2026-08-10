// main.js
import app from '../firebaseConfig';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

import emailjs from 'https://cdn.emailjs.com/sdk/latest/email.min.js';

// Inicializa EmailJS con tu User ID
emailjs.init('TU_USER_ID'); // Reemplaza con tu User ID de EmailJS

// Obtener instancia de Firestore
const db = getFirestore(app);

// Espera a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registration-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Recolectar datos del formulario
    const datos = {
      nombre: document.getElementById('name').value,
      email: document.getElementById('email').value,
      telefono: document.getElementById('phone').value,
      factura: document.getElementById('invoice').value,
      sucursal: document.getElementById('location').value,
    };

    // Guardar datos en Firebase
    try {
      const docRef = await addDoc(collection(db, 'participaciones'), {
        ...datos,
        fecha: new Date()
      });
      console.log('Documento guardado con ID:', docRef.id);
    } catch (e) {
      console.error('Error guardando en Firebase:', e);
    }

    // Enviar email usando EmailJS
    const templateParams = {
      nombre: datos.nombre,
      email: datos.email,
      telefono: datos.telefono,
      factura: datos.factura,
      sucursal: datos.sucursal,
    };

    emailjs.send('TU_SERVICE_ID', 'TU_TEMPLATE_ID', templateParams)
      .then(() => {
        alert('Participación enviada y guardada');
      })
      .catch((err) => {
        console.error('Error enviando email:', err);
      });
  });
});


function modal() {

  const contactForm = document.querySelector(".contact-form");
  const submit = document.querySelector(".submit-form");
  const modal = document.querySelector(".modal-wrap");
  const close = document.querySelector(".modal-close");

  submit.addEventListener("click", (e) => {
    contactForm.reset();
    modal.classList.toggle("display-none");
  }
  );

  close.addEventListener("click", () => {
    modal.classList.toggle("display-none");
  })
}


//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//mobile nav

const openIcon = document.querySelector(".fa-bars");
const closeIcon = document.querySelector(".fa-times-circle");
const mobileBG = document.querySelector(".mobile-bg");
const mobileNav = document.querySelector(".mobile-nav");

openIcon.addEventListener("click", () => {
  mobileBG.classList.toggle("display-none");
  mobileNav.classList.remove("slide-out");
  mobileNav.classList.toggle("slide-in");
  openIcon.classList.toggle("display-none");
});

closeIcon.addEventListener("click", () => {
  setTimeout(() => {
    mobileBG.classList.toggle("display-none");
    openIcon.classList.toggle("display-none");
  }, 500);
  mobileNav.classList.toggle("slide-in");
  mobileNav.classList.toggle("slide-out");
});

// Aquí agregas el código para el toggle del menú en pantallas pequeñas
// SOLO SI aún no lo tienes.
const menuToggle = document.querySelector('.menu-toggle'); // Asegúrate que tienes ese class
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('show');
  });
}


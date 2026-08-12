// js/index.js

// URL de tu proyecto en Google Apps Script
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxtbQLM2Gj0UJqywv70WcI0cu7OMID6QXD63d5zCwob_ns7Os64HQi8STFkoR9RAFYw/exec";

document.addEventListener("DOMContentLoaded", () => {
    const registroForm = document.getElementById("registration-form");
    const modal = document.getElementById("success-modal");

    if (!registroForm) return;

    registroForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // 1. Obtener valores del formulario
        const formData = {
            name: document.getElementById("name").value.trim(),
            empresa: document.getElementById("empresa").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            email: document.getElementById("email").value.trim(),
            departamento: document.getElementById("departamento").value.trim(),
            ciudad: document.getElementById("ciudad").value.trim(),
            rubro: document.getElementById("rubro").value.trim(),
            cliente: document.getElementById("cliente").value.trim()
        };

        // 2. Feedback visual en el botón
        const submitBtn = registroForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = "Guardando...";
        submitBtn.disabled = true;

        // 3. Enviar a Google Sheets
        fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors", // Requerido para Google Apps Script
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(() => {
            // Éxito: Limpiar formulario y mostrar Modal
            registroForm.reset();
            if (modal) {
                modal.classList.add("active");
            }
        })
        .catch((error) => {
            console.error("Error al guardar en Google Sheets:", error);
            alert("Hubo un detalle al registrar los datos. Por favor intenta de nuevo.");
        })
        .finally(() => {
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        });
    });
});

// js/index.js

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwmEGUMYGvbElDEFYQZnYZ5-zgbjmbebqmqhn96uIEZmwumzs-O_bHprShRe_hDi8S3/exec";

document.addEventListener("DOMContentLoaded", () => {
    const registroForm = document.getElementById("registration-form");
    const modal = document.getElementById("success-modal");

    // Elementos del formulario
    const selectRubro = document.getElementById("rubro");
    const inputOtroRubro = document.getElementById("OtroRubro");
    const selectCliente = document.getElementById("cliente");
    const inputAsesor = document.getElementById("Asesor"); // Asegúrate de tener id="asesor" en tu HTML

    // Evento para mostrar/ocultar "Otro Rubro"
    if (selectRubro && inputOtroRubro) {
        selectRubro.addEventListener("change", function () {
            if (this.value === "Otro") {
                inputOtroRubro.style.display = "block";
                inputOtroRubro.setAttribute("required", "true");
            } else {
                inputOtroRubro.style.display = "none";
                inputOtroRubro.removeAttribute("required");
                inputOtroRubro.value = "";
            }
        });
    }

    // Evento para mostrar/ocultar "Nombre del Asesor" si ya es cliente
    if (selectCliente && inputAsesor) {
        selectCliente.addEventListener("change", function () {
            if (this.value === "Si") {
                inputAsesor.style.display = "block";
                inputAsesor.setAttribute("required", "true");
            } else {
                inputAsesor.style.display = "none";
                inputAsesor.removeAttribute("required");
                inputAsesor.value = "";
            }
        });
    }

    if (!registroForm) return;

    // Evento al enviar el formulario
    registroForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Obtener valores justo al presionar Submit
        const rubroVal = selectRubro ? selectRubro.value : "";
        const otroRubroVal = inputOtroRubro ? inputOtroRubro.value.trim() : "";        
        const clienteVal = selectCliente ? selectCliente.value : "";
        const asesorVal = inputAsesor ? inputAsesor.value.trim() : "";

        // Construir objeto con las respuestas procesadas
        const formData = {
            name: document.getElementById("name").value.trim(),
            empresa: document.getElementById("empresa").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            email: document.getElementById("email").value.trim(),
            departamento: document.getElementById("departamento").value.trim(),
            ciudad: document.getElementById("ciudad").value.trim(),
            rubro: (rubroVal === "Otro") ? otroRubroVal : rubroVal,
            cliente: clienteVal,
            asesor: (clienteVal === "Si") ? asesorVal : "N/A"
        };

        // Feedback visual en el botón
        const submitBtn = registroForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = "Guardando...";
        submitBtn.disabled = true;

        // Enviar a Google Sheets
        fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(() => {
            registroForm.reset();
            // Ocultar inputs condicionales al resetear
            if (inputOtroRubro) inputOtroRubro.style.display = "none";
            if (inputAsesor) inputAsesor.style.display = "none";

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

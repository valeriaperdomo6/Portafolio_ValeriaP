const isEmptyRegex = /^\s*$/;
const isValidEmailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

document.addEventListener("DOMContentLoaded", () => {

    let formulario = document.getElementById("formulario");

    let nombre = document.getElementById("nombre");
    let nombreParent = nombre.parentElement;

    let correo = document.getElementById("correo");
    let correoParent = correo.parentElement;

    let mensaje = document.getElementById("mensaje");
    let mensajeParent = mensaje.parentElement;

    let fieldErrors = {};

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (validateFormulario()) {
            alert("¡Gracias por escribirme, " + nombre.value + "! 💗");
            formulario.reset();
        }
    });

    const validateFormulario = () => {

        let focused = false;
        let hasError = false;

        const nombreValue = nombre.value;

        if (isEmptyRegex.test(nombreValue)) {

            if (!fieldErrors[nombre.id]) {

                nombreParent.classList.add("error");

                const nombreErrorSpan = document.createElement("SPAN");

                nombreErrorSpan.innerHTML = "¡El nombre no puede estar vacío!";

                fieldErrors[nombre.id] = nombreErrorSpan;

                nombreParent.appendChild(nombreErrorSpan);

                const changeHandler = () => {

                    nombreParent.classList.remove("error");

                    nombreErrorSpan.remove();

                    nombre.removeEventListener("change", changeHandler);

                    delete fieldErrors[nombre.id];

                    validateFormulario();
                };

                nombre.addEventListener("change", changeHandler);

                if (!focused) {
                    focused = true;
                    nombre.focus();
                }
            }

            hasError = true;
        }


        const correoValue = correo.value;

        if (!isValidEmailRegex.test(correoValue)) {

            if (!fieldErrors[correo.id]) {

                correoParent.classList.add("error");

                const correoErrorSpan = document.createElement("SPAN");

                correoErrorSpan.innerHTML = "¡Ingrese un correo electrónico válido!";

                fieldErrors[correo.id] = correoErrorSpan;

                correoParent.appendChild(correoErrorSpan);

                const changeCorreoHandler = () => {

                    correoParent.classList.remove("error");

                    correoErrorSpan.remove();

                    correo.removeEventListener("change", changeCorreoHandler);

                    delete fieldErrors[correo.id];

                    validateFormulario();
                };

                correo.addEventListener("change", changeCorreoHandler);

                if (!focused) {
                    focused = true;
                    correo.focus();
                }
            }

            hasError = true;
        }


        const mensajeValue = mensaje.value;

        if (isEmptyRegex.test(mensajeValue)) {

            if (!fieldErrors[mensaje.id]) {

                mensajeParent.classList.add("error");

                const mensajeErrorSpan = document.createElement("SPAN");

                mensajeErrorSpan.innerHTML = "¡El mensaje no puede estar vacío!";

                fieldErrors[mensaje.id] = mensajeErrorSpan;

                mensajeParent.appendChild(mensajeErrorSpan);

                const changeMensajeHandler = () => {

                    mensajeParent.classList.remove("error");

                    mensajeErrorSpan.remove();

                    mensaje.removeEventListener("change", changeMensajeHandler);

                    delete fieldErrors[mensaje.id];

                    validateFormulario();
                };

                mensaje.addEventListener("change", changeMensajeHandler);

                if (!focused) {
                    focused = true;
                    mensaje.focus();
                }
            }

            hasError = true;
        }

        return !hasError;
    };
});
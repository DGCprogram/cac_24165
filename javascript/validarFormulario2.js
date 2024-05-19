
document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    const inputs = document.querySelectorAll('#formulario input');

    const expresiones = {
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
        dni: /^\d{8,15}$/,
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    };

    const campos = {
        nombre: false,
        dni: false,
        email: false,
        turno: false,
        fecha: false
    };

    const validarFormulario = (e) => {
        switch (e.target.name) {
            case "nombre":
                validarCampo(expresiones.nombre, e.target, 'nombre');
                break;
            case "dni":
                validarCampo(expresiones.dni, e.target, 'dni');
                break;
            case "email":
                validarCampo(expresiones.email, e.target, 'email');
                break;
            case "turno":
                validarRadio();
                break;
            case "notificacion":
                validarCheckbox();
                break;
        }
    };

    const validarCampo = (expresion, input, campo) => {
        if (expresion.test(input.value)) {
            document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-incorrecto');
            document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-correcto');
            document.querySelector(`#grupo_${campo} .fa-circle-check`).style.display = 'inline';
            document.querySelector(`#grupo_${campo} .fa-circle-xmark`).style.display = 'none';
            document.querySelector(`#grupo_${campo} .formulario_input-error`).classList.remove('formulario_input-error-activo');
            campos[campo] = true;
        } else {
            document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-incorrecto');
            document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-correcto');
            document.querySelector(`#grupo_${campo} .fa-circle-check`).style.display = 'none';
            document.querySelector(`#grupo_${campo} .fa-circle-xmark`).style.display = 'inline';
            document.querySelector(`#grupo_${campo} .formulario_input-error`).classList.add('formulario_input-error-activo');
            campos[campo] = false;
        }
    };

    const validarRadio = () => {
        const radios = document.querySelectorAll('input[type="radio"][name="turno"]');
        let radioValido = false;

        radios.forEach((radio) => {
            if (radio.checked) {
                radioValido = true;
            }
        });

        if (radioValido) {
            document.getElementById('grupo_turno').classList.remove('formulario_grupo-incorrecto');
            document.getElementById('grupo_turno').classList.add('formulario_grupo-correcto');
            campos.turno = true;
        } else {
            document.getElementById('grupo_turno').classList.add('formulario_grupo-incorrecto');
            document.getElementById('grupo_turno').classList.remove('formulario_grupo-correcto');
            campos.turno = false;
        }
    };

    const validarFecha = (input) => {
        if (input.value) {
            document.getElementById('grupo_fecha').classList.remove('formulario_grupo-incorrecto');
            document.getElementById('grupo_fecha').classList.add('formulario_grupo-correcto');
            campos.fecha = true;
        } else {
            document.getElementById('grupo_fecha').classList.add('formulario_grupo-incorrecto');
            document.getElementById('grupo_fecha').classList.remove('formulario_grupo-correcto');
            campos.fecha = false;
        }
    };

    const validarCheckbox = () => {
        const checkbox = document.getElementById('notificacion');
        campos.notificacion = checkbox.checked;
    };

    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });

    document.querySelectorAll('input[type="radio"][name="turno"]').forEach((input) => {
        input.addEventListener('change', validarFormulario);
    });

    document.querySelector('input[type="date"]').addEventListener('change', (e) => {
        validarFecha(e.target);
    });

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        validarFecha(document.querySelector('input[type="date"]'));
        validarCheckbox();
        if (campos.nombre && campos.dni && campos.email && campos.turno && campos.fecha) {
            formulario.reset();
            document.getElementById('formulario_mensaje-exito').classList.add('formulario_mensaje-exito-activo');
            document.getElementById('formulario_mensaje').classList.remove('formulario_mensaje-activo');
            setTimeout(() => {
                document.getElementById('formulario_mensaje-exito').classList.remove('formulario_mensaje-exito-activo');
            }, 5000);
            document.querySelectorAll('.formulario_grupo-correcto').forEach((icono) => {
                icono.classList.remove('formulario_grupo-correcto');
            });
        } else {
            document.getElementById('formulario_mensaje').classList.add('formulario_mensaje-activo');
        }
    });

    document.querySelector('form').addEventListener('submit', e => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        console.log(JSON.stringify(data));
    });
});
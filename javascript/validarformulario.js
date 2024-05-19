    const formulario = document.getElementById('formulario');
    const inputs = document.querySelectorAll('#formulario input');
    
    const expresiones = {
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
        HC: /^.{1,150}$/, 
        DNI: /^\d{8,15}$/, 
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    };
    
    const campos = {
        nombre: false,
        HC: false,
        DNI: false,
        email: false,
        turno: false
    };
    
    const validarFormulario = (e) => {
        switch (e.target.name) {
            case "nombre":
                validarCampo(expresiones.nombre, e.target, 'nombre');
                break;
            case "HC":
                validarCampo(expresiones.HC, e.target, 'HC');
                break;
            case "DNI":
                validarCampo(expresiones.DNI, e.target, 'DNI');
                    break;
            case "email":
                validarCampo(expresiones.email, e.target, 'email');
                break;
            case "atencion":
                validarRadio();
                break;
            case "turno":
                validarRadio();
            break;
        }
    };
    
    const validarCampo = (expresion, input, campo) => {
        if(expresion.test(input.value)) {
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
        const radios = document.querySelectorAll('input[type="radio"][name="atencion"]');
        let radioValido = false;
    
        radios.forEach((radio) => {
            if (radio.checked) {
                radioValido = true;
            }
        });
    
        if (radioValido) {
            document.getElementById('grupo_atencion').classList.remove('formulario_grupo-incorrecto');
            document.getElementById('grupo_atencion').classList.add('formulario_grupo-correcto');
            campos.atencion = true;
        } else {
            document.getElementById('grupo_atencion').classList.add('formulario_grupo-incorrecto');
            document.getElementById('grupo_atencion').classList.remove('formulario_grupo-correcto');
            campos.atencion = false;
        }
    };
    
    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });
    
    document.querySelectorAll('input[type="radio"][name="atencion"]').forEach((input) => {
        input.addEventListener('change', validarFormulario);
    });
    
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        if (campos.nombre && campos.email && campos.HC) {
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
    
    
document.querySelector('form').addEventListener('submit', function(event) {
    if (!validarFormulario()) {
        event.preventDefault();
    }
});

// Función para validar el formulario
function validarFormulario() {
    var nombre = document.getElementById('nombre').value.trim();
    var HC = document.getElementById('HC').value.trim();
    var email = document.getElementById('email').value.trim();
    var atencionAmbulatoria = document.querySelector('input[name="atención"][value="ambulatoria"]').checked;
    
    // Validar nombre
    var nombreRegex = /^[a-zA-Z\s]+$/;
    if (nombre !== ""){ 
         if(!nombreRegex.test(nombre)) {
            alert("Formato nombre invalido.");
        
    } else{
        alert("Complete campo nombre.");}
    }

    // Validar HC
    var HCRegex = /^\d{5,10}$/;
    if (HC === ""&& !HCRegex.test(HC)) {
        alert("Por favor ingrese su número de Historia Clínica.");
        //return false;
    }

    // Validar email usando una expresión regular
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email !== "" && !emailRegex.test(email)) {
        alert("Por favor ingrese una dirección de correo electrónico válida.");
        //return false;
    }

    // Validar selección de atención
    if (!atencionAmbulatoria && !atencionInternacion) {
        alert("Por favor seleccione el tipo de atención.");
        //return false;
    }

    return true;
}

    
    
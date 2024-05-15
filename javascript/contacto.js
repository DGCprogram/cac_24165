document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const formData = [];

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita que el formulario se envíe

        // Obtiene los valores de los campos del formulario
        const nombre = form.querySelector('input[name="nombre"]').value;
        const hc = form.querySelector('input[name="HC"]').value;
        const email = form.querySelector('input[name="email"]').value;
        const atencion = form.querySelector('input[name="atención"]:checked').value;
        const utilizacion = form.querySelector('select[name="utilizacion"]').value;
        const comentarios = form.querySelector('textarea[name="Comentarios"]').value;
        const recibirInfo = form.querySelector('input[name="recibir_info"]').checked;

        // Crea un objeto con los datos del formulario
        const formDataObj = {
            nombre: nombre,
            hc: hc,
            email: email,
            atencion: atencion,
            utilizacion: utilizacion,
            comentarios: comentarios,
            recibirInfo: recibirInfo
        };

        // Agrega el objeto al array formData
        formData.push(formDataObj);

        // Limpia los campos del formulario
        form.reset();

        // Puedes mostrar en la consola para verificar que se están guardando los datos
        console.log(formData);
    });
});

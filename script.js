
const addUsuarios = async (usuarios) => {
        try {
        const response = await fetch('https://guilledav77.pythonanywhere.com/nuevo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarios)
    
    });
    if (response.ok) {
        // El alta del usuario fue exitoso
        alert('El registro fue realizado con éxito');
    } else {
        // Manejar otros casos (por ejemplo, si hay errores en la respuesta)
        console.error('Error al dar de alta el usuario');
    }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }

};
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const email = document.getElementById("email").value;
    const nombre = document.getElementById("nombre").value;
    const localidad = document.getElementById("localidad").value;
    const pais = document.getElementById("pais").value;
    const password = document.getElementById("password").value;
    const usuarios = { email, nombre, localidad, pais, password };
    addUsuarios(usuarios);
    document.getElementById("loginForm").reset();
});


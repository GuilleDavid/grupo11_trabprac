document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que se envíe el formulario

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Verificar si el usuario es superusuario (ejemplo: usuario "admin")
    if (email === "admin@superusuario" && password === "superusuario") {
        // Redirigir a la página de gestión de usuarios
        window.location.href = "gestion_usuarios.html";
    } else {
        alert("Credenciales incorrectas. Inténtalo de nuevo.");
    }
});
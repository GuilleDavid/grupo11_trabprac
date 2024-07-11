document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('usuariosForm');
    const tableBody = document.getElementById('usuariosTable').querySelector('tbody');
    let isUpdating = false;

    //async permite que la función se comporte de manera asíncrona, 
    //puede ejecutar operaciones sin bloquear el hilo principal de ejecucion
    const fetchUsuarios = async () => {
        //luego cambiaremos la url por https://<hostdepanywhere>/productos
        const response = await fetch('https://guilledav77.pythonanywhere.com/usuarios');// promesa: esperar a que se complete la solicitud HTTP
        const usuarios = await response.json(); //esperar a que se complete la conversión de la respuesta a JSON
        tableBody.innerHTML = '';
        usuarios.forEach(usuarios => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${usuarios.id}</td>
                <td>${usuarios.email}</td>
                <td>${usuarios.nombre}</td>
                <td>${usuarios.localidad}</td>
                <td>${usuarios.pais}</td>
                <td>${usuarios.password}</td>
                <td>
                    <button onclick="editUsuarios(${usuarios.id}, '${usuarios.email}', '${usuarios.nombre}', '${usuarios.localidad}', '${usuarios.pais}', '${usuarios.password}')">Editar</button>
                    <button onclick="deleteUsuarios(${usuarios.id})">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    };

    const addUsuarios = async (usuarios) => {
        await fetch('https://guilledav77.pythonanywhere.com/nuevo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarios)
        });
        fetchUsuarios();
    };

    const updateUsuarios = async (id, usuarios) => {
        await fetch(`https://guilledav77.pythonanywhere.com/modificar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarios)
        });
        fetchUsuarios();
    };

    const deleteUsuarios = async (id) => {
        await fetch(`https://guilledav77.pythonanywhere.com/borrar/${id}`, {
            method: 'DELETE'
        });
        fetchUsuarios();
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('id').value;
        const email = document.getElementById('email').value;
        const nombre = document.getElementById('nombre').value;
        const localidad = document.getElementById('localidad').value;
        const pais = document.getElementById('pais').value;
        const password = document.getElementById('password').value;
        const usuarios = { email, nombre, localidad, pais, password };

        if (isUpdating) {
            updateUsuarios(id, usuarios);
            isUpdating = false;
        } else {
            addUsuarios(usuarios);
        }

        form.reset();
        document.getElementById('id').value = '';
    });

    window.editUsuarios = (id, email, nombre, localidad, pais, password) => {
        document.getElementById('id').value = id;
        document.getElementById('email').value = email;
        document.getElementById('nombre').value = nombre;
        document.getElementById('localidad').value = localidad;
        document.getElementById('pais').value = pais;
        document.getElementById('password').value = password;
        isUpdating = true;
    };

    window.deleteUsuarios = (id) => {
        if (confirm('¿Estás seguro de eliminar el usuario?')) {
            deleteUsuarios(id);
        }
    };

    fetchUsuarios();
});
function cargarUsuarios() {
    const container = document.getElementById("listaUsuarios");
    const users = getUsers().filter(u => u.type === "patient");

    container.innerHTML = "";

    if (users.length === 0) {
        container.innerHTML = "<p>No hay usuarios registrados.</p>";
        return;
    }

    users.forEach(u => {
        const card = document.createElement("div");
        card.className = "user-card";

        // Navegar al perfil al hacer clic en la tarjeta
        card.addEventListener("click", () => {
            window.location.href = `profile.html?id=${u.id}`;
        });

        card.innerHTML = `
            <img src="${u.foto}" class="user-photo">
            <div class="user-info">
                <div class="user-name">${u.nombre}</div>
                <div class="user-phone">📞 ${u.telefono || "Sin teléfono"}</div>
            </div>

            <div class="actions">
                <button class="action-btn edit">✏ Editar</button>
                <button class="action-btn delete">🗑 Eliminar</button>
            </div>
        `;

        // --- Evitar que los botones activen el click de la tarjeta ---
        const editBtn = card.querySelector(".edit");
        const deleteBtn = card.querySelector(".delete");

        editBtn.addEventListener("click", (event) => {
            event.stopPropagation(); // Evita navegación
            window.location.href = `register.html?id=${u.id}`;
        });

        deleteBtn.addEventListener("click", (event) => {
            event.stopPropagation(); // Evita navegación

            if (confirm(`¿Eliminar a ${u.nombre}?`)) {
                eliminarUsuario(u.id);
                cargarUsuarios(); // recargar lista
            }
        });

        container.appendChild(card);
    });
}

function eliminarUsuario(id) {
    let users = getUsers();
    users = users.filter(u => u.id !== id);
    localStorage.setItem("ss_users", JSON.stringify(users));
}

window.onload = cargarUsuarios;

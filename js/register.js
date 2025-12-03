function registrar() {

    const fileInput = document.getElementById("foto");
    let fotoBase64 = "assets/default-avatar.png";

    // Convertir imagen a base64 si el usuario la subió
    if (fileInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            fotoBase64 = e.target.result;
            guardarUsuario(fotoBase64);
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        guardarUsuario(fotoBase64);
    }
}

// Guardar datos del paciente
function guardarUsuario(foto) {

    const userData = {
        id: Date.now(),
        type: "patient",
        role: "user",
        nombre: document.getElementById("nombre").value,
        identificacion: document.getElementById("identificacion").value,
        fecha: document.getElementById("fecha").value,
        telefono: document.getElementById("telefono").value,
        contactoEmerg: document.getElementById("contactoEmerg").value,
        eps: document.getElementById("eps").value,
        sangre: document.getElementById("sangre").value,
        alergias: document.getElementById("alergias").value,
        foto: foto,
        user: document.getElementById("reg_user").value,
        pass: document.getElementById("reg_pass").value
    };

    // Validación básica
    if (!userData.nombre || !userData.identificacion || !userData.user || !userData.pass) {
        alert("Debes completar los campos obligatorios.");
        return;
    }

    // Guardar credenciales en ss_accounts
    let accounts = JSON.parse(localStorage.getItem("ss_accounts") || "[]");

    if (accounts.some(a => a.user === userData.user)) {
        alert("Ese nombre de usuario ya existe.");
        return;
    }

    accounts.push({
        user: userData.user,
        pass: userData.pass,
        role: "user"
    });

    localStorage.setItem("ss_accounts", JSON.stringify(accounts));

    // Guardar datos completos en ss_users
    addUser(userData);

    alert("Usuario registrado con éxito.");
    window.location.href = "index.html"; // Paciente debe iniciar sesión luego
}

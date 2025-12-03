// ======================================================
//  FUNCIONES GENERALES DE ACCOUNTS
//  Guarda TODOS los usuarios en ss_users
// ======================================================

function getUsers() {
    return JSON.parse(localStorage.getItem("ss_users") || "[]");
}

function saveUsers(users) {
    localStorage.setItem("ss_users", JSON.stringify(users));
}

// ======================================================
// REGISTRO DE PACIENTE
// ======================================================

function registrarPaciente() {
    const nombre = document.getElementById("pat_name").value.trim();
    const identificacion = document.getElementById("pat_id").value.trim();
    const telefono = document.getElementById("pat_phone").value.trim();
    const fecha = document.getElementById("pat_birth").value;
    const eps = document.getElementById("pat_eps").value.trim();
    const sangre = document.getElementById("pat_blood").value.trim();
    const alergias = document.getElementById("pat_aler").value.trim();
    const contactoEmerg = document.getElementById("pat_emerg").value.trim();
    const fotoInput = document.getElementById("pat_photo");

    const user = document.getElementById("pat_user").value.trim();
    const pass = document.getElementById("pat_pass").value.trim();

    if (!nombre || !identificacion || !telefono || !fecha || !user || !pass) {
        alert("Por favor completa todos los campos obligatorios");
        return;
    }

    const users = getUsers();
    if (users.some(u => u.user === user)) {
        alert("El usuario ya existe");
        return;
    }

    let fotoBase64 = "";
    if (fotoInput.files.length > 0) {
        const file = fotoInput.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            fotoBase64 = e.target.result;
            savePaciente(nombre, identificacion, telefono, fecha, eps, sangre, alergias, contactoEmerg, fotoBase64, user, pass);
        };
        reader.readAsDataURL(file);
    } else {
        savePaciente(nombre, identificacion, telefono, fecha, eps, sangre, alergias, contactoEmerg, "assets/default-avatar.png", user, pass);
    }
}

function savePaciente(nombre, identificacion, telefono, fecha, eps, sangre, alergias, contactoEmerg, foto, user, pass) {
    const users = getUsers();

    const paciente = {
        id: Date.now(),
        type: "patient",
        role: "user",
        nombre,
        identificacion,
        telefono,
        fecha,
        eps,
        sangre,
        alergias,
        contactoEmerg,
        foto,
        user,
        pass
    };

    users.push(paciente);
    saveUsers(users);

    alert("Paciente registrado con éxito");
    window.location.href = "home.html";
}

// ======================================================
// REGISTRO DE MÉDICO
// ======================================================

function registrarMedico() {
    const name = document.getElementById("med_name").value.trim();
    const specialty = document.getElementById("med_specialty").value.trim();
    const contact = document.getElementById("med_contact").value.trim();
    const photoFile = document.getElementById("med_photo");

    const user = document.getElementById("acc_user").value.trim();
    const pass = document.getElementById("acc_pass").value.trim();

    if (!name || !specialty || !contact || !user || !pass) {
        alert("Por favor completa todos los campos obligatorios");
        return;
    }

    const users = getUsers();
    if (users.some(u => u.user === user)) {
        alert("El usuario ya existe");
        return;
    }

    let photoBase64 = "";
    if (photoFile.files.length > 0) {
        const file = photoFile.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            photoBase64 = e.target.result;
            saveMedico(name, specialty, contact, photoBase64, user, pass);
        };
        reader.readAsDataURL(file);
    } else {
        saveMedico(name, specialty, contact, "assets/default-avatar.png", user, pass);
    }
}

function saveMedico(name, specialty, contact, photo, user, pass) {
    const users = getUsers();

    const medico = {
        id: Date.now(),
        type: "medic",
        role: "medic",
        name,
        specialty,
        contact,
        photo,
        user,
        pass
    };

    users.push(medico);
    saveUsers(users);

    alert("Médico registrado con éxito");
    window.location.href = "home.html";
}


// LOGIN
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("loginUser").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const users = JSON.parse(localStorage.getItem("ss_users") || "[]");

    const found = users.find(u => u.user === username && u.pass === password);

    if (!found) {
        alert("Usuario o contraseña incorrectos");
        return;
    }

    // Guardar sesión
    localStorage.setItem("ss_user", JSON.stringify(found));
    localStorage.setItem("ss_role", found.role);

    // Redirigir
    window.location.href = "home.html";
});

// LOGOUT
function logout() {
    localStorage.removeItem("ss_user");
    localStorage.removeItem("ss_role");
    window.location.href = "index.html";
}

// ABRIR REGISTRO PACIENTE
function openPatientRegister() {
    window.location.href = "register.html";
}

// ABRIR REGISTRO MÉDICO
function openDoctorRegister() {
    window.location.href = "register-account.html";
}

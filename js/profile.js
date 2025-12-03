window.onload = function () {
    const logged = JSON.parse(localStorage.getItem("ss_user"));

    if (!logged) {
        alert("No hay usuario logueado");
        window.location.href = "index.html";
        return;
    }

    // Foto
    document.getElementById("p_photo").src = logged.photo || logged.foto || "assets/default-avatar.png";

    if (logged.role === "user") {
        // PACIENTE
        document.getElementById("title").innerText = logged.nombre;
        document.getElementById("p_role").innerText = "Paciente";

        document.getElementById("p_name").innerText = logged.nombre;
        document.getElementById("p_id").innerText = logged.identificacion;
        document.getElementById("p_phone").innerText = logged.telefono;
        document.getElementById("p_birth").innerText = logged.fecha;
        document.getElementById("p_eps").innerText = logged.eps;
        document.getElementById("p_blood").innerText = logged.sangre;
        document.getElementById("p_alerg").innerText = logged.alergias;
        document.getElementById("p_emerg").innerText = logged.contactoEmerg;

    } else {
        // MÉDICO
        document.getElementById("title").innerText = logged.name;
        document.getElementById("p_role").innerText = "Médico";

        document.getElementById("p_name").innerText = logged.name;
        document.getElementById("p_id").innerText = logged.id;
        document.getElementById("p_phone").innerText = logged.contact;

        document.getElementById("section-medical").style.display = "none";

        const esp = document.createElement("div");
        esp.className = "profile-role";
        esp.innerText = "Especialidad: " + logged.specialty;
        document.querySelector(".profile-header").appendChild(esp);
    }
};

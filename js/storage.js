/*********************************************
 *  STORAGE MANAGER - SMARTSAFE
 *  Manejo de usuarios en LocalStorage
 *********************************************/

// Guarda todos los usuarios
function saveUsers(users) {
    localStorage.setItem("ss_users", JSON.stringify(users));
}

// Obtiene todos los usuarios
function getUsers() {
    return JSON.parse(localStorage.getItem("ss_users") || "[]");
}

// Agrega un usuario nuevo
function addUser(user) {
    const users = getUsers();
    
    // Asignar ID único si no existe
    if (!user.id) user.id = Date.now();
    
    users.push(user);
    saveUsers(users);
}

// Obtiene un usuario por ID
function getUserById(id) {
    return getUsers().find(u => u.id == id);
}

// Edita un usuario existente (por ID)
function updateUser(updatedUser) {
    let users = getUsers();
    users = users.map(u => (u.id == updatedUser.id ? updatedUser : u));
    saveUsers(users);
}

// Elimina un usuario por ID
function deleteUser(id) {
    let users = getUsers().filter(u => u.id != id);
    saveUsers(users);
}

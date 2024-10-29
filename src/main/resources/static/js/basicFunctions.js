function loadUserBar(user) {
    //alert("юзер бар " + user.login)
    const userBar = document.getElementById("userBar")
    userBar.innerHTML = user.login + " ваша роль: " + user.roles.map((role) => `${role.value}`).join(", ")
}


function tableUserUpdate(user) {
    //alert("юзер таблица " + user.login)
    const tableUser = document.getElementById("tableUser")
    tableUser.innerHTML = `<tr>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.login}</td>
            <td>${user.roles.map((role) => `${role.value}`).join(", ")}</td>
            `
}


function tableUsersUpdate(users) {
    //alert("таблица юзеров " + users[0].login)
    const tableUsers = document.getElementById("tableUsers")
    let result = ""
    for (let user of users) {
        result += `<tr>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.login}</td>
            <td>${user.roles.map((role) => `${role.value}`).join(", ")}</td>
            <td><button type="button" class="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#editModal">Изменить</button></td>
            <td><button type="button" class="btn btn-danger text-white" data-bs-toggle="modal" data-bs-target="#deleteModal">Удалить</button></td>                     
        `
    }

    tableUsers.innerHTML = result
}


async function newUser() {
    //alert("отработал")
    const options = document.getElementById('roles').selectedOptions;
    //const roles = Array.from(options).map(({ value }) => value);

    const newUser = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        age: document.getElementById('age').value,
        login: document.getElementById('login').value,
        password: document.getElementById('password').value,
        roles: Array.from(options).map(({ value }) => value)
    }
    await saveUser(newUser)
}

function setRoles(roles){
    const elmRoles = document.getElementById('roles')
    let result = ""
    for (let role of roles) {
        result += `<option value="${role.role}">${role.value}</option>`
    }
    elmRoles.innerHTML = result
}
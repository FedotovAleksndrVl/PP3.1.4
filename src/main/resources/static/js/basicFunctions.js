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
            <td>${user.roles.map((role) => `${role.value}`).join(", ")}</td>            `
}

function tableUsersUpdate(users) {
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
            <td><button type="button" class="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#editModal" onclick="setPlaceholder('edit'); getUserId(${user.id},'edit')">Изменить</button></td>
            <td><button type="button" class="btn btn-danger text-white" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="getUserId(${user.id},'delete')">Удалить</button></td>                     
        `
    }

    tableUsers.innerHTML = result
}

function validation(id, type, oldValidation) {
    let result = true
    switch (type) {
        case "text":
            result = /^[а-яА-Яa-zA-Z]{2,}$/.test(id.value)
            if (!result) {
                id.value = ""
                id.placeholder = "только буквы, длина > 1 "
            }
            break

        case "email":
            result = /^[а-яА-Яa-zA-Z0-9._%+-]+@[а-яА-Яa-zA-Z0-9-]+.+.[а-яА-Яa-zA-Z]{2,4}$/i.test(id.value)
            if (!result) {
                id.value = ""
                id.placeholder = "не соответсвует формату емайл адреса"
            }
            break

        case "number":
            result = /^\d+$/.test(id.value)
            if (!result) {
                id.value = ""
                id.placeholder = "должно быть положительное число"
            } else {
                if (id.value > 125 || id.value < 0) {
                    id.value = ""
                    id.placeholder = "должно быть число в диапазоне 0 .. 125"
                }
            }
            break

        case "password":
            if (id.value.length === 0 && id.id !== "password") {
                break
            }
            if (id.value.length < 3) {
                id.value = ""
                id.placeholder = "минимальная длина 3 символа"
                result = false
            }
            break

        case "select":
            if (id.selectedOptions.length < 1) {
                document.getElementById(id.id + "Label").innerHTML = `<b><font color="red">Выбирете роль</font></b>`
                result = false
            } else {
                document.getElementById(id.id + "Label").innerHTML = `<b><font color="black">Роль</font></b>`
            }
            break
    }
    return !oldValidation ? false : result
}

function setPlaceholder (formId) {
    document.getElementById(formId + 'firstName').placeholder = "Имя"
    document.getElementById(formId + 'lastName').placeholder = "Фамилия"
    document.getElementById(formId + 'age').placeholder = "Возраст"
    document.getElementById(formId + 'login').placeholder = "емайл адрес"
    document.getElementById(formId + 'password').placeholder = "Пароль"
    document.getElementById(formId + 'rolesLabel').innerHTML = `<b><font color="black">Роль</font></b>`
}

async function newUser() {
    let valid = true
    let options = document.getElementById('roles') //.selectedOptions;

    const firstName = document.getElementById('firstName')
    const lastName = document.getElementById('lastName')
    const age = document.getElementById('age')
    const login = document.getElementById('login')
    const password = document.getElementById('password')

    valid = validation(firstName, firstName.type, valid)
    valid = validation(lastName, lastName.type, valid)
    valid = validation(age, age.type, valid)
    valid = validation(login, login.type, valid)
    valid = validation(password, password.type, valid)
    valid = validation(options, "select",valid)

    options = options.selectedOptions

    let answer = await fetch("js/userLogin/" + login.value)
    if (answer.ok) {
        let result = await answer.json()
        if ((result).login !== null) {
            login.value = ""
            login.placeholder = "логин занят"
        } else {
            if (valid) {
                const newUser = {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    age: age.value,
                    login: login.value,
                    password: password.value,
                    roles: Array.from(options).map(({value}) => value)
                }
                await saveUser(newUser)
                document.getElementById("users-tab").click()
                //document.querySelector("#users-tab").click()
                document.getElementById("formNewUser").reset()
            }
        }
    }





}

async function notSaveLogin (){
    document.getElementById('login').value = ""
    document.getElementById('password').value = ""
}

async function showUser(User, type){

    document.getElementById(type + 'id').value = User.id
    document.getElementById(type + 'firstName').value = User.firstName
    document.getElementById(type + 'lastName').value = User.lastName
    document.getElementById(type + 'age').value = User.age
    document.getElementById(type + 'login').value = User.login
    document.getElementById(type + 'password').value = ""

    await getRoles(type+"roles")

    for (let option of  document.getElementById(type + 'roles').getElementsByTagName('option')) {
        for (let role of User.roles) {
            if (option.value === role.role) {
                option.selected = true
            }
        }
    }
}

async function editUser() {
    let valid = true
    let options = document.getElementById('editroles') //.selectedOptions;

    const id = document.getElementById('editid')
    const firstName = document.getElementById('editfirstName')
    const lastName = document.getElementById('editlastName')
    const age = document.getElementById('editage')
    const login = document.getElementById('editlogin')
    const password = document.getElementById('editpassword')

    valid = validation(firstName, firstName.type, valid)
    valid = validation(lastName, lastName.type, valid)
    valid = validation(age, age.type, valid)
    valid = validation(login, login.type, valid)
    valid = validation(password, password.type, valid)
    valid = validation(options, "select",valid)

    options = options.selectedOptions

    if (valid) {
        const newUser = {
            id: id.value,
            firstName: firstName.value,
            lastName: lastName.value,
            age: age.value,
            login: login.value,
            password: password.value,
            roles: Array.from(options).map(({ value }) => value)
        }
        await sendEditUser(newUser)
        await getUsers()
        document.getElementById("editModalButtonClose").click()
    }
}

async function deleteUser() {

    const id = document.getElementById('deleteid')
    const newUser = {
        id: id.value,
    }

    await sendDeleteUser(newUser)
    await getUsers()
    document.getElementById("deleteModalButtonClose").click()
}

function setRoles(roles, type){
    const elmRoles = document.getElementById(type)
    let result = ""
    for (let role of roles) {
        result += `<option value="${role.role}">${role.value}</option>`
    }
    elmRoles.innerHTML = result
}
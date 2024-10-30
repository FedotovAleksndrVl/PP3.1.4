async function getRoles(type){
    let answer = await fetch("/js/roles")

    if (answer.ok) {
        let roles = await answer.json()
        setRoles(roles, type)
    } else {
        alert("что-то пошло не так, статус ошибки: " + answer.status)
    }
}

async function getUserBar() {
    let answer = await fetch("js/user")

    if (answer.ok) {
        let User = await answer.json()
        loadUserBar(User)
    } else {
        alert("что-то пошло не так, статус ошибки: " + answer.status)
    }
}

async function getUser() {
    let answer = await fetch("js/user")

    if (answer.ok) {
        let User = await answer.json()
        tableUserUpdate(User)
    } else {
        alert("что-то пошло не так, статус ошибки: " + answer.status)
    }
}

async function getUserId(id, type) {
    let answer = await fetch("js/user/" + id)
    if (answer.ok) {
        let User = await answer.json()
        await showUser(User, type)
    } else {
        alert("что-то пошло не так, статус ошибки: " + answer.status)
    }
}

async function getUsers() {
    let answer = await fetch("js/users")
    if (answer.ok) {
        let Users = await answer.json()
        tableUsersUpdate(Users)
    } else {
        alert("что-то пошло не так, статус ошибки: " + answer.status)
    }
}

async function saveUser(user) {
    const answer = await fetch("js/saveUser",{
        method: 'Post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    })
    if (!answer.ok) {
        answer.status === 500 ? alert("вероятно логин уже занят, повторите попытку") : alert("что-то пошло не так, статус ошибки: " + answer.status)
    }
}

async function sendEditUser(user) {
    const answer = await fetch("js/editUser",{
        method: 'Put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    })
    if (!answer.ok) {
        answer.status === 500 ? alert("вероятно логин уже занят, попытка блокирована") : alert("что-то пошло не так, статус ошибки: " + answer.status)
    }
}

async function sendDeleteUser(user) {
    const answer = await fetch("js/deleteUser",{
        method: 'Delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    })
    if (!answer.ok) {
        alert("что-то пошло не так, статус ошибки: " + answer.status)
    }
}
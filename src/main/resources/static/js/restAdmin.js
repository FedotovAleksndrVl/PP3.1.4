async function getRoles(){
    let answer = await fetch("/js/roles")

    if (answer.ok) {
        let roles = await answer.json()
        setRoles(roles)
        //alert (roles.map((role) => `${role.value}`).join(", "))
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
    alert("передаю юзера : " + JSON.stringify(user))
    let answer = await fetch("js/saveUser",{
            method: 'Post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
    })
    if (!answer.ok) {
        alert("что-то пошло не так при сохранении юзера: " + JSON.stringify(user) + " статус ошибки: " + answer.status)
    } else {
        alert("все так, статус: " + answer.status)
    }
}

async function editUser(id) {
    const answer = await fetch("js/update")

    if (answer.ok) {
        const User = await answer.json()
        updateUser(User)
    } else {
        alert("что-то пошло не так, статус ошибки: " + answer.status)
    }
}

async function deleteUser(id) {
    const answer = await fetch("js/delete")

    if (answer.ok) {
        const Users = await answer.json()
        delUser(Users)
    } else {
        alert("что-то пошло не так, статус ошибки: " + answer.status)
    }
}


//usersLoad()
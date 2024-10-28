async function getUser() {
    let answer = await fetch("js/user")

    if (answer.ok) {
        let User = await answer.json()
        //alert(User.login)
        tableUserUpdate(User)
    } else {
        alert("${answer.status}")
    }
}

async function getUsers() {
    let answer = await fetch("js/users")

    if (answer.ok) {
        let Users = await answer.json()
        tableUsersUpdate(Users)
    } else {
        alert("${answer.status}")
    }
}

async function editUser(id) {
    const answer = await fetch("js/update")

    if (answer.ok) {
        const User = await answer.json()
        updateUser(User)
    } else {
        alert("${answer.status}")
    }
}

async function newUser() {
    const answer = await fetch("js/save")

    if (answer.ok) {
        const Users = await answer.json()
        saveUser(Users)
    } else {
        alert("${answer.status}")
    }
}

async function deleteUser(id) {
    const answer = await fetch("js/delete")

    if (answer.ok) {
        const Users = await answer.json()
        delUser(Users)
    } else {
        alert("${answer.status}")
    }
}


//usersLoad()
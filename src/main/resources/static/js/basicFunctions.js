function tableUserUpdate(User) {
    alert(User.login)
    const tableUsers = document.getElementById("tableUsers")
    const userBar = document.getElementById("userBar")
    tableUsers.innerHTML = "<tr><td> тут будет таблица юзера </td></tr>"
    userBar.innerHTML = "тут будет инфа юзера"
}

function tableUsersUpdate(Users) {
    //alert(Users[0].login + " " + Users[1].login)
    const tableUsers = document.getElementById("tableUsers")
    tableUsers.innerHTML = "<tr><td> тут будет таблица юзеров </td></tr>"
}
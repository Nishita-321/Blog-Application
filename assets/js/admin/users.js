let users = JSON.parse(localStorage.getItem("allUsers")) || [];

function showAllData(){
    document.getElementById("adminUserTableBody").innerHTML = "";

    if(users.length == 0)
    {
        document.getElementById("adminUserTableBody").innerHTML = "No Users Found!";
    }

    for(let i = 0; i < users.length; i++){
        document.getElementById("adminUserTableBody").innerHTML += `
        <tr>
                    <td>${users[i].name}</td>
                    <td>${users[i].username}</td>
                    <td>${users[i].password}</td>
                    <td>${users[i].isAdmin ? "Admin" : "User"}</td>
                    <td>${users[i].active ? "Active" : "Blocked"}</td>
                    <td>${new Date(users[i].createdAt).toLocaleString()}</td>
                    <td>
                        <button id="btn" onclick="EditUser('${users[i].username}')">Edit</button>
                    </td>
                    <td>
                        <button id="btn" onclick="DeleteUser('${users[i].username}')">Delete</button>
                    </td>
                    <td>
                        <button id="btn" onclick="BlockUser('${users[i].username}')">${users[i].active ? 'Block' : 'Unblock'}</button>
                    </td>
                </tr>
        `
    }

}

function EditUser(username) {
    
    let name =  prompt("Enter new name: ").trim();
    let password = prompt("Enter new password: ").trim();

    for(let i = 0; i<users.length; i++){
        if(username == users[i].username){
            users[i].name = name || users[i].name;
            users[i].password = password || users[i].password;
            break;
        }
    }
    localStorage.setItem("allUsers", JSON.stringify(data));

    showAllData();
}

function DeleteUser(username){
    
    let tempAry = [];

    for(let i = 0; i < users.length; i++){
        if(username != users[i].username){
            tempAry.push(users[i]);
        }
    }

    users = tempAry;

    localStorage.setItem("allUsers", JSON.stringify(tempAry));
    
    showAllData();
}

function BlockUser(username){

    for(let i = 0; i<users.length; i++){
        if(username == users[i].username){
           users[i].active = !users[i].active;
            break;
        }
    }
    localStorage.setItem("allUsers", JSON.stringify(users));

    showAllData();
}
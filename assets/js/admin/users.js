let data = JSON.parse(localStorage.getItem("allUsers")) || [];

function showAllData(){
    document.getElementById("adminUserTableBody").innerHTML = "";

    if(data.length == 0)
    {
        document.getElementById("adminUserTableBody").innerHTML = "No Users Found!";
    }

    for(let i = 0; i < data.length; i++){
        document.getElementById("adminUserTableBody").innerHTML += `
        <tr>
                    <td>${data[i].name}</td>
                    <td>${data[i].username}</td>
                    <td>${data[i].password}</td>
                    <td>${data[i].isAdmin ? "Admin" : "User"}</td>
                    <td>${data[i].active ? "Active" : "Blocked"}</td>
                    <td>
                        <button id="btn" onclick="EditUser('${data[i].username}')">Edit</button>
                    </td>
                    <td>
                        <button id="btn" onclick="DeleteUser('${data[i].username}')">Delete</button>
                    </td>
                    <td>
                        <button id="btn" onclick="BlockUser('${data[i].username}')">${data[i].active ? 'Block' : 'Unblock'}</button>
                    </td>
                </tr>
        `
    }

}

function EditUser(username) {
    
    let name =  prompt("Enter new name: ").trim();
    let password = prompt("Enter new password: ").trim();

    for(let i = 0; i<data.length; i++){
        if(username == data[i].username){
            data[i].name = name || data[i].name;
            data[i].password = password || data[i].password;
            break;
        }
    }
    localStorage.setItem("allUsers", JSON.stringify(data));

    showAllData();
}

function DeleteUser(username){
    
    let tempAry = [];

    for(let i = 0; i < data.length; i++){
        if(username != data[i].username){
            tempAry.push(data[i]);
        }
    }

    data = tempAry;

    localStorage.setItem("allUsers", JSON.stringify(tempAry));
    
    showAllData();
}

function BlockUser(username){

    
    for(let i = 0; i<data.length; i++){
        if(username == data[i].username){
           data[i].active = !data[i].active;
            break;
        }
    }
    localStorage.setItem("allUsers", JSON.stringify(data));

    showAllData();
}
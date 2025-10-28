let contactsAry = JSON.parse(localStorage.getItem("allContacts")) || [];

function showContactInfo() {

  document.getElementById("ContactTableData").innerHTML = "";

  if (contactsAry.length == 0) {
    document.getElementById("ContactTableData").innerHTML = "No Contact Info..";
  }

  for(let i = 0; i < contactsAry.length; i++){
    document.getElementById("ContactTableData").innerHTML = `
    <tr>
                        <td>${contactsAry[i].name}</td>
                        <td>${contactsAry[i].email}</td>
                        <td>${contactsAry[i].phoneno}</td>
                        <td>${contactsAry[i].message}</td>
                    </tr>
    `
  }
}

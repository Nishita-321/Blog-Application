let namee = document.getElementById("name");
let username = document.getElementById("uname");
let password = document.getElementById("pswd");

function Register(admin) {
  let obj = {
    name: namee.value.trim(),
    username: username.value.toLowerCase(),
    password: password.value.trim(),
    isAdmin: admin,
    active: true,
    createdAt: new Date()
  };
  if (!obj.name || !obj.username || !obj.password) {
    alert("Fill all details!");
    return;
  }

  let data = JSON.parse(localStorage.getItem("allUsers")) || [];

  for (let i = 0; i < data.length; i++) {
    if (obj.username == data[i].username) {
      alert("Username already exists!!");
      return;
    }
  }

  data.push(obj);

  localStorage.setItem("allUsers", JSON.stringify(data));

  alert("User Registerd!!");
  window.location.href = "login.html";
}

function Login() {
  let uname = username.value.trim().toLowerCase();
  let pass = password.value.trim();

  let data = JSON.parse(localStorage.getItem("allUsers")) || [];

  for (let i = 0; i < data.length; i++) {
    if (uname == data[i].username && pass == data[i].password) {
      if (data[i].active == false) {
        alert("Please Contact Admin, You Are Blocked!");
        return;
      } else {

        localStorage.setItem("currentUser",JSON.stringify(data[i]));

        alert("Login Success");
        window.location.href = "index.html"
        return;
      }
    }
  }
  alert("Invalid Credentials!!");
}
function ContactUs() {
  let namee = document.getElementById("name");
  let email = document.getElementById("email");
  let phoneno = document.getElementById("phoneno");
  let message = document.getElementById("message");

  let obj = {
    name: namee.value.trim(),
    email: email.value.toLowerCase(),
    phoneno: phoneno.value,
    message: message.value,
  };

  if (
    !obj.name ||
    !obj.email ||
    !obj.phoneno ||
    !obj.message ||
    obj.phoneno.length != 10
  ) {
    alert("Fill all Fields!");
    return;
  }

  let data = JSON.parse(localStorage.getItem("allContacts")) || [];

  data.push(obj);

  localStorage.setItem("allContacts", JSON.stringify(data));

  alert("We will contact you back in a while...");
}

function loadNavOptions(){

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if(currentUser){
    if(currentUser.isAdmin){
          document.getElementById("nav-options").innerHTML = `<a href="admin/AdminDashboard.html">Admin Panel</a> ${currentUser.username}`
    }
    else{
      
      document.getElementById("nav-options").innerHTML = `${currentUser.username}`
    
    }


  }
  else{
    document.getElementById("nav-options").innerHTML = `<a href="login.html">Login/SignUp</a>` 
  }
}
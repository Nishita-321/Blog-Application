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
    createdAt: new Date(),
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
        localStorage.setItem("currentUser", JSON.stringify(data[i]));

        alert("Login Success");
        window.location.href = "index.html";
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

function loadNavOptions() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    if (currentUser.isAdmin) {
      document.getElementById("nav-options").innerHTML = `
          <a href="admin/AdminDashboard.html" class="homepage-options">Admin Panel</a> 
          <p onclick="window.location.href = 'myBlogs.html'">${currentUser.username}</p> 
          <p onclick="localStorage.removeItem('currentUser');loadNavOptions()" class="homepage-options">Logout</p>`;
    } else {
      document.getElementById("nav-options").innerHTML = `
      <p onclick="window.location.href = 'myBlogs.html'">${currentUser.username}</p> 
      <p onclick="localStorage.removeItem('currentUser');loadNavOptions()" class="homepage-options">Logout</p>`;
    }
  } else {
    document.getElementById(
      "nav-options"
    ).innerHTML = `<a href="login.html">Login/SignUp</a>`;
  }
}

function loadAllBlogs() {
  let allBlogs = JSON.parse(localStorage.getItem("allBlogs"));

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  document.getElementById("allBlogs").innerHTML = "";

  for (let i = 0; i < allBlogs.length; i++) {

    document.getElementById("allBlogs").innerHTML += ` <div class="MyBlogscard">

                <img class="MyBlogscardImg" src="${allBlogs[i].pic}">

                <div>
                    <p class="MyBlogscardTitle">${allBlogs[i].title}</p>
                    <p class="MyBlogscardTags">Tags: ${allBlogs[i].tags}</p>
                    <p class="MyBlogscardAuthor">Author: ${allBlogs[i].user}</p> 
                    <p class="MyBlogscardLikes">Likes: ${allBlogs[i].likes.length}</p>
                </div>

                <div>

                <button id="LikeBtn" onclick="Like('${allBlogs[i].id}')">
                  ${allBlogs[i].likes.includes(currentUser?.username || "")? '<i class="fa-solid fa-heart like-heart"></i>': '<i class="fa-regular fa-heart"></i>'}
                </button>

                </div>

                </div>`;
  }
}

function Like(id) {
  
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  let allBlogs = JSON.parse(localStorage.getItem("allBlogs"));

  if (!currentUser) {
    alert("Please Login to Like!");
    window.location.href = "login.html";
    return;
  }

  for (let i = 0; i < allBlogs.length; i++) {
    if (allBlogs[i].id == id) {
      if (allBlogs[i].likes.includes(currentUser.username)) {
        let tempAry = allBlogs[i].likes.filter(
          (L) => L != currentUser.username
        );

        allBlogs[i].likes = tempAry;
      } else {
        allBlogs[i].likes.push(currentUser.username);
      }
    }
  }

  localStorage.setItem("allBlogs", JSON.stringify(allBlogs));

  loadAllBlogs();
}

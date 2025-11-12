let allBlog = JSON.parse(localStorage.getItem("allBlogs")) || [];
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

function saveBlog() {
  let pic = document.getElementById("pic");
  let title = document.getElementById("title");
  let tags = document.getElementById("tags");
  let para = document.getElementById("para");

  if(!currentUser) {
    alert("Please Log in!");
    window.location.href = "login.html";
    return;
  }
     
 
  let obj = {
    id : new Date(),
    pic : pic.value,
    title: title.value,
    tags: tags.value,
    likes: [],
    para: para.value,
    user : currentUser.username
  };

  if(!obj.title || !obj.tags || !obj.likes || !obj.para || !obj.pic){
    alert("Fill all details!!");
    return;
  }

  allBlog.push(obj);

  localStorage.setItem("allBlogs", JSON.stringify(allBlog));

  alert("Your Blog has been saved!!")

}

function loadMyBlogs() {

  if(!currentUser) {
    alert("You are not logged in!!");
    window.location.href = "login.html";
    return;
  }

  document.getElementById("myBlogContainer").innerHTML = "";

  for(let i = 0; i < allBlog.length; i++){
    if(allBlog[i].user == currentUser.username){
      document.getElementById("myBlogContainer").innerHTML += `
      <div class="MyBlogscard">
                <img class="MyBlogscardImg" src="${allBlog[i].pic}" alt="car">
                <div>
                    <p class="MyBlogscardTitle">${allBlog[i].title}</p>
                    <p class="MyBlogscardTags">Tags: ${allBlog[i].tags}</p>
                    <p class="MyBlogscardLikes">Likes: ${allBlog[i].likes.length}</p>
                </div>
                <div class="MyBlogscardBtns">
                    <button onclick="DeleteBlog('${allBlog[i].id}')">Delete</button>
                    <button onclick="EditBlog('${allBlog[i].id}')">Edit</button>
                </div>
            </div>`
    }
  }
}

function DeleteBlog(id) {

  let tempAry = [];

  for(let i = 0; i < allBlog.length; i++){
    if(id != allBlog[i].id) {
      tempAry.push(allBlog[i]);
    }
  }

  allBlog = tempAry;

  localStorage.setItem("allBlogs",JSON.stringify(tempAry));

  loadMyBlogs();

}

function EditBlog(){}
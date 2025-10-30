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
                    <button>Delete</button>
                    <button>Edit</button>
                </div>
            </div>`
    }
  }
}
let allBlog = JSON.parse(localStorage.getItem("allBlogs")) || [];

function saveBlog() {
  let title = document.getElementById("title");
  let tags = document.getElementById("tags");
  let para = document.getElementById("para");

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if(!currentUser) {
    alert("Please Log in!");
    window.location.href = "login.html";
    return;
  }
     
 
  let obj = {
    title: title.value,
    tags: tags.value,
    likes: [],
    para: para.value,
    user : currentUser.username
  };

  if(!obj.title || !obj.tags || !obj.likes || !obj.para){
    alert("Fill all details!!");
    return;
  }

  allBlog.push(obj);

  localStorage.setItem("allBlogs", JSON.stringify(allBlog));

  alert("Your Blog has been saved!!")

}

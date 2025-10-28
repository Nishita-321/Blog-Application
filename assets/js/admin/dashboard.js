let allUsersAry = JSON.parse(localStorage.getItem("allUsers")) || []
let allContactsAry = JSON.parse(localStorage.getItem("allContacts")) || []


function getData()
{

    document.getElementById("totalUsersCnt").innerHTML = allUsersAry.length;
    document.getElementById("totalContactsCnt").innerHTML = allContactsAry.length;


    // let count = 0;
    // for(let i = 0; i < allUsersAry.length; i++){

            // let u = allUsersAry[i]

    //     if(allUsersAry[i].active){
    //         count++;
    //     }
    // }

    // document.getElementById("totalActiveUsersCnt").innerHTML = count;


    document.getElementById("totalActiveUsersCnt").innerHTML = allUsersAry.filter(nishii => nishii.active).length;
}
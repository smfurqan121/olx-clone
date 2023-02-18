console.log("index.js is connected");
import { getAdsToDataBase,logout,checkLoginUserId} from "./firebase/config/firebase.js";


// const preloader = document.getElementById("preloader")

// // window.addEventListener("load",function(){
// //   preloader.style.display = "none"
// // })

//check the user login ha ya nahi //
checkLoginUser()
async function checkLoginUser(){
  const result = await checkLoginUserId((getloginId)=>{
    console.log('function line no 14',getloginId)
    if(getloginId !== "please login"){
      document.getElementsByClassName('login-button')[0].style.display = "none"
      document.getElementsByClassName("userlog")[0].style.display = "flex"
      
      document.getElementById("login-user-pic").src = "./src"

    }else{
      document.getElementsByClassName('login-button')[0].style.display = "block"

    }

  })  
}


document.getElementById("sell").addEventListener("click",loginuserId)

async function loginuserId(){
  const result = await checkLoginUserId((getloginId)=>{
    console.log('get user id',getloginId)
    if(getloginId === "please login"){
      window.location.href='./firebase/login.html'
    }else{
      window.location.href='./addItem/addItem.html'
    }

   

  })  
}
// const jij= await loginuserId()
// console.log("jijjj",jij)

// window.check = async function(){
//   const rebt = await checkLogin()
  
//   console.log("return",rebt)
//   alert("return",rebt)
//   debugger
//   if(rebt){
//     location.href = "./addItem/addItem.html"
//   }else{
//     location.href = "../firebase/login.html"
//     alert("user ha")
//   }
// }

// call the function 
showAds()

window.signout=async function(){

  try{
    await logout()
    alert("logout")
  }catch(e){
    console.log("error",e)
  }
}







async function showAds() {
  const ads = await getAdsToDataBase();
  const adsElement = document.getElementById("dynamic");

  //add loop to show all data in DOM//
  for (let item of ads) {
    adsElement.innerHTML += `
    <li>
             <div class="card" onclick="goToDetailPage('${item.id}')">
                        
                     <img id"thumbnails" src="${item.imageurl}" alt="">
                     <div class="detail">
                            <div class="title">${item.title}</div>
                            <div class="price">RS ${item.price}</div>
                            <div class="extera">
                                <span id="city">${item.location}</span><br/>
                                <span id="timeago">1 min ago</span>
                              </div>
                      </div>
               </div>
      </li>          
    `;
  }
}
window.goToDetailPage = function(id){
location.href = `./detailpage/detailpage.html?id=${id}`
}
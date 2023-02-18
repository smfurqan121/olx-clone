console.log("detailpage connected")
import{detailPage,getUserDetail, checkRoom,createRoom} from "../firebase/config/firebase.js"



getAdsDetail()
async function getAdsDetail(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id')
    console.log('ads id ===>',id)
try{
const data = await detailPage(id)
const user = await getUserDetail(data.userID)
// console.log('return',data)
// console.log('return',user)
document.getElementById("show-detail").innerHTML +=`

<div class="left">
        <div class="image">
            <img src="${data.imageurl}" />
        </div>
        <div class="detail">
            <h3>Details</h3> <br />
            <div class="detail-div">
                <div class="detail-price">
                    <span>Price</span>
                    <span><b>${data.price}</b></span>
                </div>
                <div class="detail-price">
                    <span>Condition</span>
                    <span>New</span>
                </div>
            </div>
            <hr>
            <h3>Description</h3><br />
            <span>${data.description}</span>
        </div>     
</div>
 <div class="right">
        <div class="price">
            <div class="show-price">
                <div class="Rs">RS ${data.price}</div>
                <div class="icon">
                    <img src="../src/images/share.png"/>
                    <img src="../src/images/heart.png"/>
                </div>
            </div>
            <h1>${data.title}</h1>
            <div class="loacation">
                <span>${data.location}</span>
                <span>10 minute ago</span>
            </div>
        </div>
        <div class="seller-information">
            <div class="seller">
                <span>Seller Description</span>
            </div>
           <a onclick = "showuserDetail('${data.userID}')">
                <div class="user-flex">
                    <div class="user-img">
                        <img src="${user.imageurl}" />
                    </div>
                    <div class="username">
                        <span>${user.userName}</span>
                        <span>Member since 2022</span>
                    </div>
                    <img src="../src/images/right-arrow.png"/>
                </div>
           </a>
           <button onclick = "goToChatWithSeller('${data.userID}')">Chat with seller</button>

        </div>
        <div class="location-div">
                <div class="posted-in">
                    <h1>posted in</h1>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, odio!</span>
                </div>
                <div class="posted-img-div">
                    <div class="posted-image">
                        <img src="../src/images/location.svg" alt="">
                    </div>
                 <div class="seeloation">
                     <span>See location</span>
                     <img src="../src/images/right-arrow.png" alt="">
                 </div>

                </div>
                       
              </div>  
    </div>`

}catch(e){
console.log(e.message)
}
}

window.showuserDetail=function(id){
    location.href = `../userdetail/userdetail.html?id=${id}`
}



//char with seller realtime chat
window.goToChatWithSeller = async function (id){
        let roomInfo = await checkRoom(id)
    // let roomInfo = await checkRoom(id)
        // console.log('roominformation',roomInfo)
    if(!roomInfo){
        // alert("if condtion success line 91")
        roomInfo = await createRoom(id)
        // alert("if ===>",roomInfo)
        // console.log("infor===?",roomInfo)
    }
    const chatroomId = roomInfo.id
    console.log("id===>",chatroomId)
 location.href = `../chatsroom/chatsroom.html?room-id=${chatroomId}`
}
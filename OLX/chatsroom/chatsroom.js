console.log("chatsroom . js is connected")
 import { getChatroomData,messages, getRealtimeMessages,auth} from "../firebase/config/firebase.js"

 realTime()
 getChatroomToDb()


//  //////function to get the real time chat Data
 function realTime(){
     const roomId =  chatroomId()
      getRealtimeMessages(roomId,(messages) => {
         //4
         console.log("room data",messages)
         const adsElem = document.getElementById('ads')
     console.log("real id",messages[0].id)
         adsElem.innerHTML = ''
         for (let item of messages) {

            let color;
            
             if(item.userId == auth.currentUser.uid ){
                 color = "orange"
                 console.log("auth.currentUser.uid",auth.currentUser.uid)
                 }else{
                 color = "blue"
                 console.log(auth.currentUser.uid)
             }
             adsElem.innerHTML += ` 
             <div class="message-${color}" >
                 <span>${item.text}</span>
                 <span id="time">  ${new Date(item.createdAt).toLocaleTimeString()}</span>
             </div>`
         }
         
     })
 
 }

//chatroom Id function to get the URL room Id
function chatroomId(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('room-id')
    console.log("id===>",id)
    return id
}


async function getChatroomToDb(){
    const id = chatroomId()
    console.log('chatroom Id ===>',id)
     const data = await getChatroomData(id)
     console.log('data = ====>>>',data)
}


// Execute a function when the user presses a key on the keyboard
document.getElementsByTagName("input")[1].addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("send-button").click();
    }
  });


window.sendMessages = function(){
    const text = document.getElementsByTagName("input")[1]
    if(text.value == ''){
        alert('emty is not accept')
        return
    }else{
        const roomId = chatroomId()
        messages(text.value,roomId)
        text.value = ""
    }
}


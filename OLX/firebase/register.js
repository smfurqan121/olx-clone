
import{signUpFirebase,userImage}from "./config/firebase.js"


document.getElementsByTagName("input")[2].addEventListener("keypress", function(event) {

     document.getElementsByClassName("fa-eye-slash")[0].style.display="inline"
    
})


window.showPassword = function (){
    const password = document.getElementsByTagName("input")[2];
    const show = document.getElementsByClassName("fa-eye")[0]
    const hide = document.getElementsByClassName("fa-eye-slash")[0]
   
    if(password.type  === "password"){
        password.type = "text"
        hide.style.display="none"
        show.style.display="inline"
    }else{
        password.type = "password"
        hide.style.display="inline"
        show.style.display="none"
    }
}

console.log("connected to the register.js file")

const img = document.getElementById("userImage").name
console.log(img)


window.register = async function(){
    //1)get the value in regsiter webpage
    const allInputs = document.getElementsByTagName('input')
    const userName = allInputs[0].value
    const email = allInputs[1].value
    const password = allInputs[2].value
    const age = allInputs[3].value
    console.log('information',userName,email,password,age)
    const image = document.getElementById("userImage").files[0]
    ///2)firebase ka function to call karaga jo ka firebas  e.js ka andr bana hu wa ha





if( userName !== "" && email !== "" && password !== "" && age !== "" && image !== undefined  ){
    try{

        document.getElementsByClassName("submit")[0].style.display = "none";
        document.getElementsByClassName("loading")[0].style.display = "block";

        const imageurl = await userImage(image)
        await signUpFirebase({userName, email, password, age},imageurl)
        await Swal.fire({
            icon: 'success',
           title: 'REGISTER SUCCESS FULLY',
           showConfirmButton: false,
           timer: 1500 })
           document.getElementsByClassName("submit")[0].style.display = "block";
        document.getElementsByClassName("loading")[0].style.display = "none";
           window.location.href - "./login.html"
        alert("REGISTER SUCCESS FULLY")
        // userName=""
        // email=""
        // password=""
        // age=""
    }catch(e){

        switch (e.message) {
            case "Firebase: Password should be at least 6 characters (auth/weak-password).":
            document.getElementsByClassName("loading")[0].style.display = "none";
            document.getElementsByClassName("submit")[0].style.display = "block";

            Swal.fire({
                icon: "error",
                title: "Weak Password",
                showConfirmButton: false,
                timer: 1500,
            });

            break;
            case "Firebase: Error (auth/invalid-email).":
            document.getElementsByClassName("loading")[0].style.display = "none";
            document.getElementsByClassName("submit")[0].style.display = "block";

            Swal.fire({
                icon: "error",
                title: "Invalid Email",
                showConfirmButton: false,
                timer: 1500,
            });
            break;
            case "Firebase: Error (auth/email-already-in-use).":
                document.getElementsByClassName("loading")[0].style.display = "none";
                document.getElementsByClassName("submit")[0].style.display = "block";
    
                Swal.fire({
                    icon: "error",
                    title: "Email Already Exist",
                    showConfirmButton: false,
                    timer: 1500,
                });
                break;

            default:
            document.getElementsByClassName("loading")[0].style.display = "none";
            document.getElementsByClassName("submit")[0].style.display = "block";
            Swal.fire({
                icon: "error",
                title: "Unknown Error Occured",
                showConfirmButton: false,
                timer: 1500,
            });
        }
        
        const showError = document.getElementById("error")
        showError.innerHTML = e.message
    }

}else{
Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Fill The Form',
    })
}


}


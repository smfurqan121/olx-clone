console.log("login.js connected");
import { signInFirebase } from "./config/firebase.js";



document.getElementsByTagName("input")[1].addEventListener("keypress", function(event) {

    document.getElementsByClassName("fa-eye-slash")[0].style.display="inline"
   
})

window.showPassword = function (){
    const password = document.getElementsByTagName("input")[1];
    const show = document.getElementsByClassName("fa-eye")[0]
    const hide = document.getElementsByClassName("fa-eye-slash")[0]
    debugger
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
//function to login
window.login = async function () {
  //1)get the value in regsiter webpage
  const allInputs = document.getElementsByTagName("input");

  const email = allInputs[0].value;
  const password = allInputs[1].value;
  console.log("information", email, password);

  ///2)firebase ka function to call karaga jo ka firebase.js ka andr bana hu wa ha

  if (email !== "" && password !== "") {
        try {
        document.getElementsByClassName("submit")[0].style.display = "none";
        document.getElementsByClassName("loading")[0].style.display = "block";
        await signInFirebase(email, password);
        await Swal.fire({
            icon: "success",
            title: "Successfully LoggIn",
            showConfirmButton: false,
            timer: 1500,
        });
        // alert("logIn Successfully");

        location.href = "../../index.html";
        } catch (e) {
        switch (e.message) {
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
            case "Firebase: Error (auth/wrong-password).":
            document.getElementsByClassName("loading")[0].style.display = "none";
            document.getElementsByClassName("submit")[0].style.display = "block";

            Swal.fire({
                icon: "error",
                title: "Invalid password",
                showConfirmButton: false,
                timer: 1500,
            });
            break;
            case "Firebase: Error (auth/user-not-found).":
            document.getElementsByClassName("loading")[0].style.display = "none";
            document.getElementsByClassName("submit")[0].style.display = "block";
            Swal.fire({
                icon: "error",
                title: "User Not Found",
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
        }
    } else {
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Fill The Form",
        });
    }
};

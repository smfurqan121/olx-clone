console.log("add item .js connected");

import {
  addProductToFirebase,
  uploadImage,
} from "../firebase/config/firebase.js";
// checkLogin()
// location.href = "../firebase/login.html"

//function to 1)get the value in HTML. 2)call the
window.addProduct = async function () {
  //1)get the value in regsiter webpage
  const allInputs = document.getElementsByTagName("input");
  const title = allInputs[0].value;
  const description = allInputs[1].value;
  const price = allInputs[2].value;
  const location = allInputs[3].value;
  const image = document.getElementById("uploadImage").files[0];
  console.log('images',image)
  console.log("additem.js", { title, description, price, location, image });

  if (
    title !== "" &&
    description !== "" &&
    price !== "" &&
    location !== "" &&
    image !== undefined

  ) {
    try {
      document.getElementsByClassName("submit")[0].style.display = "none";
      document.getElementsByClassName("loading")[0].style.display = "block";

      const imageurl = await uploadImage(image);
      await addProductToFirebase(
        { title, description, price, location },
        imageurl
      );
      document.getElementsByClassName("submit")[0].style.display = "block";
      document.getElementsByClassName("loading")[0].style.display = "none";
       Swal.fire({
         icon: 'success',
        title: 'Successfully Add Product',
        showConfirmButton: false,
        timer: 2200 })   
    } catch (e) {
      console.log("error", e.message);
      const showError = document.getElementById("error");
      showError.innerHTML = e.message;
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Fill The Form',
    })
  }
};

// let image = [];

// document.getElementById("upload-photo").addEventListener("change",function(){

//   const reader = new FileReader();

//   reader.readAsDataURL(this.files[0])

//   reader.addEventListener("load",()=>{

//     let result = reader.result
//     image.push(result);
//   if (localStorage.getItem("images")) {
//     alert('if conditon work')
//     // image = JSON.parse(localStorage.getItem('images'))
//     image.push(result);
//     // localStorage.setItem('images',JSON.stringify(image))

//     // alert("if")
//   } else {
//     alert('befor push else')
//   image.push(result)

//   // localStorage.setItem("images",JSON.stringify(image))
//    alert('else condition work')
//    console.log(image)
//     // }
//   })
// });

// ==============showCard========

// function showCard(){
//   const title = document.getElementById("title").value
//   const price = document.getElementById("price").value
//   const location = document.getElementById("location").value
//   const Description = document.getElementById("description").value
//   const userId = Math.random().toFixed(8).slice(2)
//   let entries = []
//     if(title !== "" && price !=="" && location !== ""){
//       if (localStorage.getItem('cardInformation')) {
//         entries = JSON.parse(localStorage.getItem('cardInformation'))
//         entries.push({ title,price,location,image,userId,Description })
//         localStorage.setItem('cardInformation', JSON.stringify(entries))
//         // alert("fill the if condition")
//       } else {
//         entries.push({ title,price,location,image,userId,Description})
//         localStorage.setItem('cardInformation', JSON.stringify([{ title,price,location,image,userId,Description}]))
//         // alert("fil the else conditon")
//       }
//     }else{
//       alert("please fil the form")
//     }
// }

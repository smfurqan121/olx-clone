// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  onSnapshot,
  orderBy,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxR6qB6UIYHTewneqxAke33T296xsHrWE",
  authDomain: "smit-batch-8-olx-clone.firebaseapp.com",
  projectId: "smit-batch-8-olx-clone",
  storageBucket: "smit-batch-8-olx-clone.appspot.com",
  messagingSenderId: "826148627405",
  appId: "1:826148627405:web:a7b9500cc68f7c79245a84",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("app----->", app);
//authentication to getAuth() import line No #4
const auth = getAuth(app);
console.log("Authentication ----->", auth);
//firestore in firebase import in line No #5
const db = getFirestore(app);
console.log("database--->", db);
const storage = getStorage(app);
console.log("storage===>", storage);
// console.log("auth.currentUser.uid",auth.currentUser.uid)
const user = auth.currentUser;
console.log("userid ifrebase",user)

// ========================//apply new method async await
///================== function to register to add the user data to firebase authentication
async function signUpFirebase(userInfo, imageurl) {
  const { email, password } = userInfo;
  //=================call the firebase built in function to import line No #4
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  console.log("userID ===", userCredential.user.uid);
  //=================call the function to make the blew
  await addUserToDb(userInfo, userCredential.user.uid, imageurl);
}

//=================function to login the user with the help of firebase authentication
function signInFirebase(email, password) {
  // console.log("before",auth.currentUser.uid)
  return signInWithEmailAndPassword(auth, email, password);
  // console.log("after",auth.currentUser.uid)
}

//==================add User Information to database call the function line No#39
function addUserToDb(userInfo, uid, imageurl) {
  const { userName, email, age } = userInfo;
  //call the firebase built in function to import the line No #4
  return setDoc(doc(db, "users", uid), { userName, email, age, imageurl });
}
//add product to firebase in firestore database
function addProductToFirebase(cardInformatin, imageurl) {
  const { title, description, price, location } = cardInformatin;
  const userID = auth.currentUser.uid;
  //===========call the function to import line No #4
  return addDoc(collection(db, "ads"), {
    title,
    description,
    price,
    location,
    userID,
    imageurl,
  });
}

//get data to firestore DataBase in firebase
async function getAdsToDataBase() {
  const querySnapshot = await getDocs(collection(db, "ads"));
  let ads = [];
  querySnapshot.forEach((doc) => {
    ads.push({ id: doc.id, ...doc.data() });
  });
  return ads;
}
//Storage function save IMAGES and VIDEO
async function uploadImage(image) {
  //call the function to import the line No #5
  const storageRef = ref(storage, `adsImages/${image.name}${Date.now()}`);

  // 'file' comes from the Blob or File API
  //call the function to import the line No #5
  const snapshot = await uploadBytes(storageRef, image);
  console.log("success the uploadImages function run");
  const url = await getDownloadURL(snapshot.ref);
  return url;
}

async function userImage(image) {
  //call the function to import the line No #5
  const storageRef = ref(storage, `userImages/${image.name}`);

  // 'file' comes from the Blob or File API
  //call the function to import the line No #5
  const snapshot = await uploadBytes(storageRef, image);
  console.log("success the uploadImages function run");
  const url = await getDownloadURL(snapshot.ref);
  return url;
}

async function detailPage(id) {
  const docRef = await doc(db, "ads", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}
async function getUserinfo() {
  
  const docRef = await doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}
async function getUserDetail(id) {
  const docRef = await doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

//signOut  Function to existing user logout
function logout() {
  return signOut(auth);
}
//create check Room  in dataBase firestore in firebase
async function checkRoom(sellerId) {
  const currentUserId = auth.currentUser.uid;

  //get the data to chatrooms colection
  const q = query(
    collection(db, "chatrooms"),
    where(`users.${sellerId}`, "==", true),
    where(`users.${currentUserId}`, "==", true)
  );
  // console.log("querry ===>",q)
  const snapshot = await getDocs(q);
  // console.log("snapshot==>",snapshot)
  let room;
  //loop to collect the data
  snapshot.forEach((doc) => {
    // console.log("data user===>",doc.id,"==",doc.data())
    room = { id: doc.id, ...doc.data() };
  });
  return room;
}
//create chatRoom in dataBase firestore in firebase
function createRoom(sellerId) {
  const currentUserId = auth.currentUser.uid;
  const newRoomCreateInfo = {
    users: {
      [sellerId]: true,
      [currentUserId]: true,
    },
    createdAt: Date.now(),
    lastMessage: {},
  };
  return addDoc(collection(db, "chatrooms"), newRoomCreateInfo);
}

//get data to chatRooms in chatroom.js firestore
async function getChatroomData(chatroomId) {
  // alert("call the firebase function")
  const docRef = await doc(db, "chatrooms", `${chatroomId}`);
  const docSnap = await getDoc(docRef);
  console.log("firebase id===>", chatroomId);
  return docSnap.data();
}

function messages(text, roomId) {
  const obj = { text, createdAt: Date.now(), userId: auth.currentUser.uid };
  console.log("obj===>", obj);
  // ,essageRef = doc(db, "rooms", "roomA", "messages", "message1");
  console.log("roomId", roomId);
  const messageRef = addDoc(
    collection(db, "chatrooms", `${roomId}`, "messages"),
    obj
  );
  console.log("messges REf=======", messageRef);

  console.log(text);
  // alert(`messages ----${text}`)
}

function getRealtimeMessages(roomId, callback) {
  //2

  const q = query(
    collection(db, "chatrooms", `${roomId}`, "messages"),
    orderBy("createdAt")
  );
  onSnapshot(q, (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    console.log(messages);
    callback(messages);
  });

  // onSnapshot(collection(db, "chatrooms",`${roomId}`,"messages"),orderBy("createdAt"), (querySnapshot) => {
  //     const messages = []

  //     querySnapshot.forEach((doc) => {
  //       console.log("line 191===>",doc.data())
  //       console.log('doc.id.....',doc.id)
  //         messages.push({ id: doc.id, ...doc.data() })
  //     });
  //     //3
  //     callback(messages)
  // })
}

 function checkLoginUserId(callback) {
  var value;
   onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      value = uid;
      // ...
    } else {
      value="please login"
      // ...
    }
    callback(value)
  });
}

//  const docSnap = await getDoc(chatroom)
// Create a query against the collection.

//  console.log('result==>',chatroom)
//  console.log('result2==>',data.data())
//  console.log('user =======>',users)
// addDoc(collection(db, "chatrooms"), {users,createdAt:Date.now(),lastMessage:{}})

export {
  signUpFirebase,
  signInFirebase,
  addProductToFirebase,
  getAdsToDataBase,
  uploadImage,
  userImage,
  detailPage,
  getUserDetail,
  logout,
  checkRoom,
  createRoom,
  getChatroomData,
  messages,
  getRealtimeMessages,
  auth,
  checkLoginUserId,
};

//   function checkLogin(){
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/firebase.User
//         const uid = user.uid;
//         // ...
//       } else {
//         // User is signed out
//         // ...
//         alert("user nahi ha")
//       }
//     })
//     return auth.user.uid
// }
// console.log(auth.currentUser.uid)

//             .then(() => {
//   // Sign-out successful.
// }).catch((error) => {
//   // An error happened.
// });

// console.log(auth.currentUser.uid)

//export the function to import the other js file

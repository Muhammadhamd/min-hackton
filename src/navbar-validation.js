
const firebaseConfig = {
  
    apiKey: "AIzaSyBEDzzo5U16CzvjwjZAF52JFJVHtYcqxlw",
     authDomain: "blogging-hamd.firebaseapp.com",
     projectId: "blogging-hamd",
     storageBucket: "blogging-hamd.appspot.com",
     messagingSenderId: "1082381242714",
     appId: "1:1082381242714:web:8e0fc3375d1fd2a66fe363"
   };
  
   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);  
   
    let db = firebase.firestore();
    let provider = new firebase.auth.GoogleAuthProvider();
   let auth = firebase.auth();
  
    
  firebase.auth().onAuthStateChanged(async function(user){
  
      if(user){
          document.getElementById("after-logindiv").style.display = 'flex'
          document.getElementById("loginbtn").style.display = 'none'

          const pfimages = db.collection("users");

          const q = pfimages.where("userid", "==", user.uid);

          q.get()
.then((querySnapshot) => {
querySnapshot.forEach((doc) => {
let data = doc.data();

document.querySelectorAll("#displayUserName").forEach((username)=>{

  username.innerHTML = `${data.lastname} ${data.firstname}`
})

});
})
.catch((error) => {
console.log("Error getting documents:", error);
});

      }else{
          document.getElementById("after-logindiv").style.display = 'none'
          document.getElementById("loginbtn").style.display = 'block'
  
      }
  })
  

  document.querySelectorAll("#logoutbtn").forEach((signOutBtn) =>{

    console.log("logout")
    signOutBtn.addEventListener('click',(e)=>{
       e.preventDefault()
       alert("see you soon")
       firebase.auth().signOut().then(() => {
          window.location.href ="./signup.html"
          }).catch((error) => {
          // An error happened.
          console.log(error);
          });
    })
  })
  
  
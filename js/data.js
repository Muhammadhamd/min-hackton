
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
 
    
 // ......................to sign out....................................
  
 document.querySelectorAll("#signout").forEach((signOutBtn) =>{
 
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
  
    //   ...................login with google account........................
 
   
 
 //   ................name of user......................... 
   
 
 
 
 
 
 
 
 
 
 
 
 
 //.....................to check if user is loged in or not.................
    firebase.auth().onAuthStateChanged(async function(user) {
 
       // show user name in navbar
       
       if (user) {
 
 
          if(user.displayName == null || user.displayName ==''){
             document.getElementById("username").innerHTML = user.email
 
            
          }else{
             console.log(user.displayName)
             document.getElementById("username").innerHTML = user.displayName
          
            
                const res = await fetch("/user",{
            
                    method: "POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({
                        user:user.email
                    })
                })
            
          
          
          }
          
       }else{
          window.location.href = "/login";
       }
      
    });
 
 
 
    console.log('yesss')
 
    //..................to upload image into storage.......................
 
   document.querySelector("#addnewblog").addEventListener("submit" ,
    (event) =>{
       
      event.preventDefault()
    //   .....uploading process messege........
      let ulodadedMSG = document.createElement("div")
      ulodadedMSG.classList = "px-[12px] py-[10px] bg-black text-white font-bold h-[30px] rounded-[30px] shadow-[0px_0px_4px_#00000070] flex justify-between items-center text-[12px] tracking-wide fixed right-50 left-50 top-10"
      ulodadedMSG.innerHTML = 'uploading......'
      document.querySelector(".formdiv").appendChild(ulodadedMSG)
 
      let blogHeading = document.querySelector("#heading").value;
      let blogParagraph = document.querySelector("#paragraph").value;
      let blogHashtags = document.querySelector("#hashtags").value;
      let timestamp = firebase.firestore.FieldValue.serverTimestamp()
      let uploadF =  document.getElementById("upload-file");
      let uploadFileToDb = uploadF.files[0]
      let auth = firebase.auth();
      let user = auth.currentUser;
      console.log(user);
      if(uploadF.files.length === 0){
       db.collection("blogs")
          .add({
                  blogHeading: blogHeading,
                  blogParagraph: blogParagraph,
                   BlogImg: "no image is selected",
                   Username: user.email, 
                   name: user.displayName, 
                  createdAt: timestamp,
                  hashtags: blogHashtags
          })
          .then((docRef) =>{
             console.log("Document written with ID: ", docRef.id)
             
            
             ulodadedMSG.innerHTML = "Uploaded sucessfully"
           //   console.log(docRef.data().BlogImg)
          })
          .catch((e) => {
       
             console.log("eroorrr agaya", e)
          })
       
        
      }
         
    
      const ref = firebase.storage().ref();
      const name = +new Date() + "-" + uploadFileToDb.name;
      const metadata = {
       contentType: uploadFileToDb.type
    };
    const task = ref.child(name).put(uploadFileToDb, metadata);
 
    task
       .then(snapshot => snapshot.ref.getDownloadURL())
       .then(url => {
       imageDataURL( url);
       
 
        
      
    })
    .catch((error)=>{console.log(error)});
 
    // document.querySelector("form").reset()
    
 
     function imageDataURL(url){
       db.collection("blogs")
       .add({
               blogHeading: blogHeading,
               blogParagraph: blogParagraph,
                BlogImg: url,
                Username: user.email, 
                   name: user.displayName, 
               createdAt: timestamp,
               hashtags: blogHashtags
 
       })
       .then((docRef) =>{
          console.log("Document written with ID: ", docRef.id)
          ulodadedMSG.classList = "px-[12px] py-[10px] bg-black text-white font-bold h-[30px] rounded-[30px] shadow-[0px_0px_4px_#00000070] flex justify-between items-center text-[12px] tracking-wide fixed right-50 left-50 top-10"
          ulodadedMSG.innerHTML = `Uploaded sucessfully <a href="/#post${docRef.id}">go direct</a>`
          
 
          
 
          console.log(docRef.data().BlogImg)
       })
       .catch((e) => {
    
          console.log("eroorrr agaya", e)
       })
    
   } 
  })
  
    
 //  ...................to filter the post by tags...................
 
 
 // function filterposts() {
  
 // }
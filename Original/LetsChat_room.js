 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  
  // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBPZUiEMRgPvGLIUTS4uj5Xo-KevkPKEyY",
    authDomain: "letschat-5ee16.firebaseapp.com",
    databaseURL: "https://letschat-5ee16-default-rtdb.firebaseio.com",
    projectId: "letschat-5ee16",
    storageBucket: "letschat-5ee16.appspot.com",
    messagingSenderId: "387107900863",
    appId: "1:387107900863:web:db1abd76d239117913a50a"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
   //firebase.getAnalytics(app); //Analytics will be disabled for the forseable future.
  //const analytics = getAnalytics(app);
//ADD YOUR FIREBASE LINKS HERE
user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome "+user_name+"!";
function addRoom(){
    room_name = document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
          purpose: "adding_room_name"
    });
    localStorage.setItem("room_name", room_name);
    window.location = "LetsChat_page.html";


}
function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
     Room_names = childKey;
    //Start code
console.log("Room name - "+Room_names);
row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)'>#"+Room_names+"</div><hr>";
document.getElementById("output").innerHTML+=row;

    //End code
    });});}
getData();

function redirectToRoomName(name){
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "LetsChat_page.html";
    
}

function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
    
}

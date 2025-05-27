/*Copyright (C) 2023-2025 Bhargav Ekbote <bhargavsdeal@gmail.com>
This file is part of LetsChat.

LetsChat is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

LetsChat is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with LetsChat. If not, see <https://www.gnu.org/licenses/>.*/

// Firebase configuration
firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
}

firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

// Function to send message
function send() {
  msg = document.getElementById("msg").value;
  // Sanitize message before sending
  msg = sanitizeHTML(msg);

  firebase.database().ref(room_name).push({
    name: user_name,
    message: msg,
    like: 0
  });

  document.getElementById("msg").value = "";
}

// Function to sanitize user inputs
function sanitizeHTML(str) {
  var temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
}

// Function to get data and display messages
function getData() {
  firebase.database().ref("/" + room_name).on('value', function(snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function(childSnapshot) {
      childKey = childSnapshot.key;
      childData = childSnapshot.val();
      if (childKey != "purpose") {
        firebase_message_id = sanitizeHTML(childKey);
        message_data = childData;

        console.log(firebase_message_id);
        // Sanitize message data before logging
        var sanitized_message_data = {
          name: sanitizeHTML(message_data['name']),
          message: sanitizeHTML(message_data['message']),
          like: sanitizeHTML(String(message_data['like']))
        };
        console.log(sanitized_message_data);

        // Construct HTML tags with sanitized inputs
        var name_with_tag = "<h4>" + sanitized_message_data.name + "<img class='user_tick' src='tick.png'></h4>";
        var message_with_tag = "<h4 class='message_h4'>" + sanitized_message_data.message + "</h4>";
        var like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + sanitized_message_data.like + " onclick='updateLike(this.id)'>";
        var span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + sanitized_message_data.like + "</span></button><hr>";

        // Combine the constructed tags into a row
        var row = name_with_tag + message_with_tag + like_button + span_with_tag;
        
        // Append the row to the output
        document.getElementById("output").innerHTML += row;
      }
    });
  });
}

// Call getData to fetch and display messages
getData();

// Function to update likes
function updateLike(message_id) {
  console.log("clicked on like button - " + message_id);
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  updated_likes = Number(likes) + 1;
  console.log(updated_likes);

  firebase.database().ref(room_name).child(message_id).update({
    like: updated_likes
  });
}

// Function to log out
function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location.replace("index.html");
}

/* LetsChat - A social media platform framework
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const appwrite = new Appwrite();
appwrite
  .setEndpoint('https://[YOUR_APPWRITE_SERVER]') // Your AppWrite Endpoint
  .setProject('[PROJECT_ID]'); // Your Project ID

const databaseId = '[DATABASE_ID]';
const roomsCollectionId = '[COLLECTION_ID]';

const user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = `Welcome ${sanitizeHTML(user_name)}!`;

// Function to safely sanitize HTML
function sanitizeHTML(html) {
  const element = document.createElement('div');
  if (html) {
    element.innerText = html;
    return element.innerHTML;
  }
  return '';
}

async function addRoom() {
  const room_name = document.getElementById("room_name").value;

  try {
    await appwrite.database.createDocument(roomsCollectionId, 'unique()', {
      name: room_name,
      purpose: "adding room name",
    });

    localStorage.setItem("room_name", room_name);
    window.location = "kwitter_page.html";
  } catch (error) {
    console.error("Error adding room:", error);
  }
}

async function getData() {
  try {
    const response = await appwrite.database.listDocuments(roomsCollectionId);

    document.getElementById("output").innerHTML = "";
    response.documents.forEach((doc) => {
      const room_name = sanitizeHTML(doc.name);
      const row = `<div class='room_name' id=${room_name} onclick='redirectToRoomName("${room_name}")'>#${room_name}</div><hr>`;
      document.getElementById("output").innerHTML += row;
    });
  } catch (error) {
    console.error("Error fetching rooms:", error);
  }
}

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}

// Fetch rooms initially
getData();

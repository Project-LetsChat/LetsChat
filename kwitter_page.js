const appwrite = new Appwrite();
appwrite
  .setEndpoint('https://[HOSTNAME]/v1') // Replace with your endpoint
  .setProject('[PROJECT_ID]'); // Replace with your project ID

const databaseId = '[DATABASE_ID]';
const messagesCollectionId = '[MESSAGES_COLLECTION_ID]';

let unsubscribe;

// Function to send message using AppWrite
async function send() {
  const msg = document.getElementById("msg").value;
  const sanitizedMsg = sanitizeHTML(msg);
  const user_name = localStorage.getItem("user_name");
  const room_name = localStorage.getItem("room_name");

  try {
    await appwrite.database.createDocument(messagesCollectionId, 'unique()', {
      user_name: user_name,
      message: sanitizedMsg,
      like: 0,
      room_name: room_name
    });
    document.getElementById("msg").value = "";
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

// Function to display messages
function displayMessages(messages) {
  messages.forEach((message) => {
    const sanitizedData = {
      name: sanitizeHTML(message.user_name),
      message: sanitizeHTML(message.message),
      like: sanitizeHTML(String(message.like)),
      id: message.$id
    };

    const existingMessage = document.getElementById(sanitizedData.id);
    if (!existingMessage) {
      const nameWithTag = `<h4>${sanitizedData.name}<img class='user_tick' src='tick.png'></h4>`;
      const messageWithTag = `<h4 class='message_h4'>${sanitizedData.message}</h4>`;
      const likeButton = `<button class='btn btn-warning' id="${sanitizedData.id}" value="${sanitizedData.like}" onclick='updateLike("${sanitizedData.id}")'>`;
      const spanTag = `<span class='glyphicon glyphicon-thumbs-up'>Like: ${sanitizedData.like}</span></button><hr>`;

      const row = nameWithTag + messageWithTag + likeButton + spanTag;
      document.getElementById("output").innerHTML += row;
    }
  });
}

// Function to update like in UI
function updateLikeInUI(message) {
  const element = document.getElementById(message.$id);
  if (element) {
    element.value = message.like;
    element.querySelector('span').textContent = `Like: ${message.like}`;
  }
}

// Function to get data and subscribe to real-time updates
async function getData() {
  const room_name = localStorage.getItem("room_name");
  
  try {
    // Clear existing messages
    document.getElementById("output").innerHTML = "";

    // Fetch initial messages
    const response = await appwrite.database.listDocuments(messagesCollectionId, [
      Appwrite.Query.equal('room_name', room_name),
      Appwrite.Query.orderAsc('$createdAt')
    ]);
    displayMessages(response.documents);

    // Subscribe to real-time updates
    unsubscribe = appwrite.subscribe(`databases.${databaseId}.collections.${messagesCollectionId}.documents`, (response) => {
      if (response.events.includes('databases.*.collections.*.documents.*.create')) {
        const message = response.payload;
        if (message.room_name === room_name) {
          displayMessages([message]);
        }
      } else if (response.events.includes('databases.*.collections.*.documents.*.update')) {
        const updatedMessage = response.payload;
        updateLikeInUI(updatedMessage);
      }
    });

  } catch (error) {
    console.error("Error fetching messages:", error);
  }
}

// Function to update likes
async function updateLike(message_id) {
  try {
    const currentDoc = await appwrite.database.getDocument(messagesCollectionId, message_id);
    const updatedLikes = currentDoc.like + 1;
    
    await appwrite.database.updateDocument(messagesCollectionId, message_id, {
      like: updatedLikes
    });
  } catch (error) {
    console.error("Error updating like:", error);
  }
}

// Sanitize HTML function
function sanitizeHTML(str) {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
}

// Initial call to get data and start subscription
getData();

// Cleanup subscription on logout or page unload
window.addEventListener('beforeunload', () => {
  if (unsubscribe) {
    unsubscribe();
  }
});

// Logout function remains the same
function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location.replace("index.html");
}

// Array of updates
const updates = [
    { title: 'Page Refresh: Tutorials', description: 'The tutorials page has been redone.' },
    { title: 'Page Replacement: Whats New', description: 'The Whats New page has been replaced with the upcoming page.' },
    { title: 'Minor Improvements', description: 'Check Full List of minor improvements.' }
  ];
  
  // Get the updates container
  const updatesContainer = document.getElementById('changelog-container');
  
  // Create a card for each update
  for (let update of updates) {
    let updateCard = document.createElement('div');
    updateCard.className = 'update-card';
  
    let updateTitle = document.createElement('h2');
    updateTitle.innerText = update.title;
  
    let updateDescription = document.createElement('p');
    updateDescription.innerText = update.description;
  
    updateCard.appendChild(updateTitle);
    updateCard.appendChild(updateDescription);
    updatesContainer.appendChild(updateCard);
  }
  
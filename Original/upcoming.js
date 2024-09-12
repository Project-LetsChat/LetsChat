
// Array of upcoming features
const upcomingFeatures = [
    { title: 'Tutorials', description: 'A Tutorials page has been added to the Navigation bar, it currently only contains 1 video explaining the Basics on how to use LetsChat but it is getting extended with more content.' },
    { title: 'More Apps and Games', description: 'More Apps and Games in the External Services tab.' },
    { title: 'Image Recognition System', description: 'A camera pops up and you show a object on the camera, it will recognise the object.' },
    { title: 'Desktop Client', description: 'A desktop client for LetsChat.'}
  ];
  
  // Get the features container
  const featuresContainer = document.getElementById('features-container');
  
  // Create a card for each feature
  for (let feature of upcomingFeatures) {
    let featureCard = document.createElement('div');
    featureCard.className = 'feature-card';
  
    let featureTitle = document.createElement('h2');
    featureTitle.innerText = feature.title;
  
    let featureDescription = document.createElement('p');
    featureDescription.innerText = feature.description;
  
    featureCard.appendChild(featureTitle);
    featureCard.appendChild(featureDescription);
    featuresContainer.appendChild(featureCard);
  }
  
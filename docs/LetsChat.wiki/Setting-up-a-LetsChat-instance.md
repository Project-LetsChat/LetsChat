# Getting Started with LetsChat: Basic Setup Guide
This guide will walk you through the basic steps to set up a LetsChat instance. It covers the essentials, but you may need additional configurations based on your requirements.

## 2. Download LetsChat
Download the latest release of LetsChat from the <a href="https://github.com/Project-LetsChat/LetsChat/releases/">official releases page</a>.

## 2. Open in a Text Editor
Extract the files and open the project in your preferred text editor.

## 3. Add a Backend Configuration
To connect your LetsChat instance to a backend, you need to configure <code>kwitter_page.js</code> and <code>kwitter_room.js</code>.

#### How to Add a Backend
In both <code>kwitter_page.js</code> and <code>kwitter_room.js</code>, you'll find a section for the Firebase configuration. Fill in the required details from your Firebase project:

```JavaScript
firebaseConfig = {
  apiKey: "<YOUR_API_KEY>",
  authDomain: "<YOUR_AUTH_DOMAIN>",
  databaseURL: "<YOUR_DATABASE_URL>",
  projectId: "<YOUR_PROJECT_ID>",
  storageBucket: "<YOUR_STORAGE_BUCKET>",
  messagingSenderId: "<YOUR_MESSAGING_SENDER_ID>",
  appId: "<YOUR_APP_ID>"
}
```
You can find these values in your Firebase Console under Project Settings > General.

## 4. Replace LetsChat Branding and Links
To customize the branding and links on your LetsChat instance, follow these steps:

#### Replace Branding
Locate the following code in your HTML file and replace "LetsChat" with your desired name:

```HTML
<a class="navbar-brand" href="kwitter_room.html">YourBrandName</a>
```

#### Update Navigation Links

In the <code>navbar</code> section of your HTML, replace the default LetsChat links with your custom links:

```HTML
<div class="collapse navbar-collapse" id="myNavbar">
  <ul class=" nav navbar-nav">
    <li><a href="filter.html">Realtime Filters</a></li>
    <li><a href="https://your-custom-link.com">Your Plugin Store</a></li>
    <li><a href="https://your-website-link.com">Your Website</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</div>
```

###### You can grab the <code>navbar</code> template from the <code>Components</code> directory, which also includes the <code>navbar.css</code> styling file that is used to theme the navbar, make sure grab and link that file to your respective HTML files too. You can use it to style the navigation bar according to your theme.

### Optional Customisations

#### Optional: Customize Login Page
If you'd like, replace the default login page with one of the login pages in the NeoLogins directory, you can check out the full guide <a href="https://github.com/Project-LetsChat/LetsChat/wiki/Login-Page-(s)/">here</a>.

#### Optional: Add Plugins

You can enhance your LetsChat instance by patching plugins from the [Official Plugin Store](https://project-letschat.github.io/plugin-store/).

### Reference implementation(s): NovaChat
If you'd like to see an example of a website built on top of LetsChat, check out [NovaChat](https://project-letschat.github.io/NovaChat/index.html). It serves as a proof-of-concept for what can be achieved using LetsChat.

#### LetsChat Social is an abandoned LetsChat implementation that was an official LetsChat Project, and was released the same day as LetsChat and stopped development on Jul 1, 2023. You can check its source code under the <code>PREVIOUS</code> branch.

###### Note: Hosting your LetsChat instance is your responsibility. You can choose from various methods such as using a VPS provider, self-hosting on your server, or exploring other options that best fit your needs.
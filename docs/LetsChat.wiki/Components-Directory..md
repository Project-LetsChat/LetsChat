The <code>Components directory</code> is located under the <code>src directory</code>, it is a <code>directory</code> that holds individual components that are used across LetsChat in conjunction with other components.

##### Currently, there are 2 components in the <code>Components directory</code>:

- <code>Login_page</code>: This contains 2 files, <code>index.html</code> and <code>login.css</code>. The login page uses the <code>addUser()</code> function to carry out the login process, the <code>addUser()</code> function is stored in the <code>kwitter.js</code> file. So the <code>kwitter.js</code> file is a dependency for the login page.

- <code>navbar</code>: This contains 2 files, <code>navbar.html</code> and <code>navbar.css</code>. The navbar is the global navigation menu in LetsChat, you can extract the <code>navbar HTML</code> from the <code>navbar.html</code> file and use it on multiple pages.

###### The Components directory also holds the Minimal directory, this directory contains minimal versions of files found in LetsChat.
The login page is usually located in the index.html file, the default one can be swapped out with some of the ones in the NeoLogins folder or you can build a custom one yourself.

### How to swap out login pages (NeoLogins)

1. Choose one of the TXT files from the NeoLogins folder and rename it to <code>index.html</code> (which should convert the file from TXT to HTML).

2. Replace the default <code>index.html</code> file with the new one you renamed.

3. You're all set!

### How to build a custom login page:

1. Create a file and name it <code>index.html</code>.

2. The file must link to LetsChat.js, the easiest way to do so is by adding this code snippet to the <code>body</code> or the <code>head</code> tags:

```HTML
<script src="LetsChat.js"></script>
```

3. In the <code>body</code> section, there needs to be a textbox to enter the username and that textbox must have the id <code>user_name</code>:
```HTML
<input type="text" id="user_name" placeholder="Enter your username">
```

4. Now, create a <code>button</code>. The <code>button</code> should have <code>onclick="addUser()"</code> in the HTML tag so that it can trigger the <code>addUser()</code> function:
```HTML
<button onclick="addUser()">Login</button>
```

5. Replace the default <code>index.html</code> with your custom created <code>index.html</code>.

6. You're all set!

#### Customise the custom login page (Optional):

1. Link your custom <code>index.html</code> to the universal <code><a href="https://github.com/BhargavEkbote/LetsChat/wiki/style.css/">style.css</a></code> file:
```HTML
<link rel="stylesheet" href="style.css">
```
This will make the page aligned with all the rest of the pages.

2. Create and attach a custom <code>.css</code> file to your custom login page, if you have linked the universal <code><a href="https://github.com/BhargavEkbote/LetsChat/wiki/style.css/">style.css</a></code> file to your custom login page then make sure that your custom <code>.css</code> file is compatible with the universal <code><a href="https://github.com/BhargavEkbote/LetsChat/wiki/style.css/">style.css</a></code> file or else it might break the styling.

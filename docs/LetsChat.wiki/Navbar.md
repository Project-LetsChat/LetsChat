The navigation bar (<code>navbar</code> for short) is a menu in LetsChat that can be used to navigate through and between different pages, it is straightforward to customise and add extra sections to.

In LetsChat 6.0.2 and onwards, there is now a <code>navbar</code> template located in the <code>Components</code> sub-directory under <code>src</code> directory.

#### This is where the <code>links</code> are located and can be customised/extended:

```HTML
<div class="collapse navbar-collapse" id="myNavbar">
		<ul class=" nav navbar-nav">
			<li><a href="extra.html">Experiments</a></li>
			<li><a href="filter.html">Realtime Filters</a></li>
			<li><a href="#whatsnew">  </a></li>
			<li><a href="#contact"> </a></li>
		</ul>
	</div>
```

#### Over here you can customise the name:

```HTML
<a class="navbar-brand" href="LetsChat_room.html">
			LetsChat
		</a>
```

###### NOTE: As of LetsChat version 6.0 the <code>navbar</code> now has a new file for theming it, making it independent from the universal <code><a href="https://github.com/BhargavEkbote/LetsChat/wiki/style.css/">style.css</a></code>.
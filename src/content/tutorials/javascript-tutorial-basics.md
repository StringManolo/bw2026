## JavaScript Tutorial

### Table of Contents

0. A Quick Overview
1. First Steps
2. Introduction to the DOM

---

## Chapter 0: A Quick Overview

### What is JavaScript?

JavaScript is a general-purpose programming language.

This means it can be used in mobile applications, Windows programs, drones, aerospace systems, parking meters, accounting systems, and more.

But where it gains the most importance is on the web. Originally for web pages, but also on the server side.

### What is it used for?

To create any type of program.

Above all, making web pages work, where HTML is used to define content, CSS modifies and styles the appearance, and JavaScript takes care of "what the page does."

From showing something when a button is clicked, to downloading an entire website, extracting something of interest, storing it, displaying it, sending it...

### What knowledge do I need?

None.

Minimal HTML will be used to create a document and indicate where the code is with JavaScript.

### General Programming

JavaScript and most languages in current use utilize several elements that are usually common among them:

- Expressions or statements
- Variables
- Operators
- Conditionals
- Loops
- Methods and Functions
- Arrays
- Objects

**Note:** Below is a summary of what each thing is. Don't worry if you don't understand everything right now or if it's too much new or abstract information. You're going to see detailed examples of their use that will make it easier to assimilate the concepts.

#### Expressions or Statements

These are lines of code that serve to express an action or content.

For example `1 + 3;` is an expression that adds two numbers. The semicolon is used to indicate the end of an expression.

#### Variables

These are containers to save something we're going to want to use later.

For example `var result = 1 + 3;` will store 4 inside a variable we named result. There are different types of data and containers.

#### Operators

They are used to perform all types of operations.

We have basic mathematical operators but we also have some other useful ones like less than or equal to `<=`, the assignment operator `=`, or the comparison operator `==` among many others.

#### Conditionals

They are used to perform an action when the condition we indicate is met.

Example: `if (result == 4)` will be fulfilled if the result variable equals 4. We'll see this in more detail.

#### Loops

They are used to perform an action in a loop, that is, repeatedly until the desired result is reached.

Example: `while (result == 4)` will repeat the expression we indicate in brackets while the result variable equals 4.

#### Methods and Functions

Methods and functions are used to group code designated for a task.

For example, we can group an entire program that does a tax return and another that displays data from various companies.

This way we can call all the code to do the tax return in a simple way without having to rewrite it from scratch every time we want to do the return for a different person.

In the end we'll have a function we can use like: `doTaxReturn("Paco"); doTaxReturn("Antonio");` ... Methods are practically the same.

#### Arrays

Arrays are containers just like variables, but they allow us to store multiple data and also variables.

Example: `var colors = ["red", "green", "blue"];`

To access them we'll use indices that start counting from 0. For example if I want to show the word red: `alert(colors[0]);`

#### Objects

Objects are groupings of data or functions that are related in some way.

For example, we can make a person object that will have variables like name, height, age... And methods like talk, walk, eat...

---

## Chapter 1: First Steps

### Creating the Document

Before you start programming in JavaScript you need an HTML document to tell the browser we're going to use JavaScript:

```html
<html>
<body>
<script>

</script>
</body>
</html>
```

These are just 3 HTML tags.

Inside the script tags you're going to write whatever JavaScript code you want.

If you want to use accents and special characters you should add the head and meta charset tags. Generally you can use the previous example, or if you prefer add more data:

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Tab Title</title>
</head>
<body>
You will see this text in the document.
<script>

</script>
</body>
</html>
```

You should write this HTML code and save it in a file with any text editor.

For example, Windows Notepad. Save it as `MyDocumentName.html`

We're going to work in this file which we'll open in the browser to see the results.

For now it does nothing. If we put `1 + 3;` it will do the addition, but we won't see the result because we didn't indicate it. There are many ways to see the results, we'll see the most basic of all, the alert function.

### Getting to Know alert

`alert` is a function (that's already defined in the browser) that displays a small window on screen with the value we indicate.

We're going to use alert to show the sum result:

```html
<html>
<body>
<script>
alert(1 + 3);
</script>
</body>
</html>
```

Make sure to save the changes and open the file with extension `yourFile.html` in the browser.

To do this you can right-click and select open with... There you should choose Chrome, Mozilla, Edge, Internet Explorer, Safari, Opera... Whatever browser you have.

You should see a window displaying the number 4. If not, repeat the process and make sure everything is correct.

Besides performing operations you can also display text if you enclose it in quotes. Example:

```html
<html>
<body>
<script>
alert("Welcome to my first JavaScript program");
</script>
</body>
</html>
```

### Working with Variables

You can also save the operation result or text in a variable and display it from alert.

```html
<html>
<body>
<script>
var result = 4;
var greeting = "welcome to my first program";
var name = "John";
alert("Hello");
alert(name);
alert(greeting);
alert(result);
</script>
</body>
</html>
```

It's a bit uncomfortable to show 4 different alerts and have the user need to click 4 times on accept to read all our messages.

There are character sequences that have special functionality, like `\n` which allows us to make a new line. And the `+` operator also serves to join text, not just to add numbers, so we can show everything in a single alert.

```html
<html>
<body>
<script>
var result = 4;
var greeting = "welcome to my first program";
var name = "John";
alert("Hello " + name + " " + greeting + ".\n" + "I no longer need to use " + result + " alerts to show you this text");
</script>
</body>
</html>
```

Try it, you'll see the following text:

```
Hello John welcome to my first program.
I no longer need to use 4 alerts to show you this text.
```

Our user probably isn't named John.

There's another function very similar to alert called `prompt` that gives the user the ability to write something in the window, and gives us the ability to obtain it.

We're going to make a program that asks for the name, age, and dedicates a personalized greeting.

```html
<html>
<body>
<script>
var greeting = "Hello ";
var name = prompt("What is your name?");
var age = prompt("How old are you?");
alert(greeting + name + " you are " + age + " years old.");
</script>
</body>
</html>
```

### Conditionals

This is great! But we greet everyone the same way.

We're going to use conditionals to personalize the greeting more. From now on it's assumed you know that code should be put in the document between the tags and it's omitted for brevity.

```javascript
var name = prompt("What is your name?");
var age = prompt("How old are you?");

if(age < 18) {
  var greeting = "What's up ";
  var postGreeting = " how are your studies going?";
}

if(age >= 18 && age < 65) {
  var greeting = "Hello ";
  var postGreeting = " how's the family?";
}

if(age >= 65) {
  var greeting = "Good day ";
  var postGreeting = " how are you doing?";
}

alert(greeting + name + postGreeting);
```

The `if` conditional has a condition that goes in parentheses and what we want to happen if the condition is met goes in brackets.

We also use the `&&` and operator which is used to add more than one condition that must be met.

Now we're going to make a program that asks for a password, if the condition is met, that is if the correct password was entered we'll show a text indicating it, and otherwise we'll show a different one.

```javascript
var password = "abc123";
var entered = prompt("Guess the password");

if (password == entered) {
  alert("Congratulations, you entered the correct password.");
} else {
  alert("Ohh, you failed!");
}
```

The keyword `else` is used to put code that executes when the if condition isn't met.

This program has a problem, and that is if we want the user to have 10 attempts, they'll have to open the page 10 times or we'll have to paste the code 10 times.

It doesn't seem so bad, but what if we wanted to give them 1000 attempts? It would be crazy to copy and paste so much and the file would take up a lot of space. To avoid this we have loops.

### Loops

The `while` loop looks a lot like the `if` conditional, but instead of executing once, it does so until the condition is met:

```javascript
var password = "abc123"
var entered = "not asked yet";

while (password != entered) {
  entered = prompt("Guess the password");
}
```

Here we use the not equal to operator in the condition.

That is, while the password is not equal to the entered one, execute the code in brackets. As you can see, `var` is only necessary to use to create the variable, afterwards it can be omitted.

Another widely used loop is `for`, which can be seen in various ways.

We're only going to see the classic form that instead of using a conditional uses 3 expressions. Its use is common to count or perform actions a certain number of times:

```javascript
for (var counter = 0; counter < 10; counter += 1) {
  alert(counter);
}
```

As you can see in parentheses there are 3 expressions.

The first is to indicate the variable that will be used as a counter. The second to indicate what condition must be met. The third to indicate how much the counter should increase or decrease.

### Functions and Methods

Functions and methods are among the most useful tools.

Until now we used alert and prompt, 2 functions that help us interact with the user in a simple way.

We'll make a function that allows us to obtain multiple data from a person and we'll use it in a loop based on the number of people the user indicates.

That is, if the user wants to give us data for 2 people, 8 people, etc., we'll take data from all of them. First we're going to ask the user:

```javascript
var householdMembers = prompt("How many people do you live with at your home?");
```

The next step would be to ask for the data we want to know about each member:

```javascript
var name = prompt("Enter the name of a member of your household");
var age = prompt("Tell me " + name + "'s age");
var sex = prompt("Is " + name + " male or female?");
var maritalStatus = prompt("Is " + name + " married, single, widowed or divorced");
```

Now we can put all these questions into a single function. And at the same time make the function return everything organized:

```javascript
function getData() {
  var name = prompt("Enter the name of a member of your household");
  var age = prompt("Tell me " + name + "'s age");
  var sex = prompt("Is " + name + " male or female?");
  var maritalStatus = prompt("Is " + name + " married, single, widowed or divorced");

  return "Name:" + name + "\nAge:" + age + "\nSex:" + sex + "\nMarital Status:" + maritalStatus;
}
```

We already have defined what it does. Now we can use it whenever we want in the same way as a prompt.

We just need the loop to finish the program, leaving it like this:

```javascript
var householdMembers = prompt("How many people do you live with at your home?");

for (var counter = 0; counter < householdMembers; ++counter) {
  var familyData = getData();
  alert(familyData);
}

function getData() {
  var name = prompt("Enter the name of a member of your household");
  var age = prompt("Tell me " + name + "'s age");
  var sex = prompt("Is " + name + " male or female?");
  var maritalStatus = prompt("Is " + name + " married, single, widowed or divorced");

  return "Name:" + name + "\nAge:" + age + "\nSex:" + sex + "\nMarital Status:" + maritalStatus;
}
```

Over time we could make functions and store them in a file to be able to use them without having to create them again in the same way as prompt and alert.

### Arrays

Instead of returning the text string, we may be interested in separating the data to access them individually:

```javascript
var familyData = [name, age, sex, maritalStatus];
```

This way we can have all the data in one place and at the same time be able to access them individually:

```javascript
alert(familyData);
alert("Hello " + familyData[0] + " you are " + familyData[3] + " you are " + familyData[2] + " and you are " + familyData[1] + " years old.");
```

### Methods

What if we want to show only the initial of the name?

For this, JavaScript, just like with alert and prompt, gives us a method called `substr` whose purpose is to form another text from a text.

For example, from the name Paco we can obtain the P. Methods have a difference with functions, and that is that they are specific to an object.

This means we can't create a subtext from a number, because obviously a number is not a text. As we already saw in previous examples, text goes in quotes, while numbers don't.

Let's see an example of the substr method:

```javascript
var name = "paco";
var initial = name.substr(0, 1);
alert(initial);
```

In this case substr accepts 2 numbers separated by commas.

The first allows us to select the position from which to start obtaining characters. The second number allows us to indicate how many characters we're going to obtain from the position we indicated.

In the example from position letter 0, we'll obtain 1 letter. That is, from paco we'll obtain p.

If we wanted to obtain ac we would do `var centralLetters = name.substr(1, 2);` that is, from the character a we obtain 2 letters.

There are many predefined methods in JavaScript and they can be chained.

For example, if we want to show the initial of a name in uppercase we can use `substr(0, 1)` and `toUpperCase()` example:

```javascript
var name = prompt("What's your name?");
var initial = name.substr(0, 1);
var initialInUppercase = initial.toUpperCase();
alert(initialInUppercase);
```

We can also chain methods in a single line:

```javascript
var name = prompt("What's your name?");
var initialInUppercase = name.substr(0, 1).toUpperCase();
alert(initialInUppercase);
```

This is possible because JavaScript evaluates expressions from left to right replacing them with their result.

What does this mean? It means we can greatly simplify the code by grouping functionality into a single line, so the previous example can also be done like this:

```javascript
alert(prompt("What's your name?").substr(0, 1).toUpperCase());
```

The browser will do the following: Are there parentheses? Then I evaluate what's inside:

I find `prompt("What's your name?")` I execute the function and replace it with the result leaving the code like: `alert("paco".substr(0, 1).toUpperCase());`

Are there parentheses? Then I evaluate what's inside:

I find `"paco".substr(0, 1)` I execute the method and replace it with the result leaving the code like: `alert("p".toUpperCase());`

Are there parentheses? Then I evaluate what's inside:

I find `"p".toUpperCase()` I execute the method and replace it with the result leaving the code like: `alert("P");`

As you can see there are no more expressions to evaluate, so the browser will proceed to alert "P".

### Objects

Everything we've used so far are objects.

An object is nothing more than a container in which we can save variables and functions. When a variable or a function belongs to an object, we'll refer to them as properties and methods.

For now we'll see objects as a simple way to group variables and functions that are related to each other. To create an object we'll use:

```javascript
var vehicle = {};
```

To add a variable (property) we'll use the `.` operator that we already saw:

```javascript
vehicle.currentSpeed = 0;
```

To add a function (method) we'll also use the same operator, but we'll assign a function without a name:

```javascript
vehicle.accelerate = function() {
  vehicle.currentSpeed += 1;
};
```

---

## Chapter 2: Introduction to the DOM

The Document Object Model is a JavaScript object included in browsers.

This `document` object allows us to create elements like text, images, buttons, hyperlinks, add them to the current document, obtain them, delete them, listen to events...

There are mainly 2 ways to get an element. Defining it with HTML code and obtaining it using a selector. Or creating it directly from JavaScript code.

First an example of a link defined in HTML:

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Hyperlink Example</title>
</head>
<body>
<a href="https://google.com/search?q=HTML+Tutorials">HTML Tutorials on Google</a>
<script>

</script>
</body>
</html>
```

The result is a link like HTML Tutorials on Google.

It's a simple element that allows us to go to the desired page or page element.

Inside the href attribute we'll put the destination. Between the tags we'll put the text that will be displayed.

As you can see, the `<a>` element is between the body tags. Everything you put between these tags excluding the script tags and their content will be visible to the user.

We can obtain these elements in JavaScript to modify them and more.

To facilitate their obtainment, we're going to add the id attribute to be able to identify it from JavaScript:

```html
<body>
<a id="googleLink1" href="https://google.com/search?q=HTML+Tutorials">HTML Tutorials on Google</a>
<script>

</script>
</body>
</html>
```

Now we can obtain it using the id in 2 ways. With the get element by id method:

```javascript
var link = document.getElementById("googleLink1");
```

Or through a query selection:

```javascript
var link = document.querySelector("#googleLink1");
```

I recommend the second way because it allows selecting also by tag name (omitting the #), by class (using a .), and by more attributes and selectors simply by changing the text in parentheses.

To simplify, it's not a priority to know them all now.

The other way to create an element is to do it from JavaScript and add it between the body tags:

```html
<script>
var link = document.createElement("a");
link.href = "https://google.com/search?q=HTML+Tutorials";
link.innerText = "HTML Tutorials on Google"

var body = document.querySelector("body");
body.appendChild(link);
</script>
</body>
</html>
```

The usual thing is to create elements we know beforehand with HTML and those that may vary or will only exist in remote cases with JavaScript.

Elements have multiple attributes we can edit or read from JavaScript.

One of the most interesting when inspecting elements is `outerHTML`.

For example, we can see how the body looks after adding the element created from JavaScript:

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>outerHTML Example</title>
</head>
<body>
<script>
var link = document.createElement("a");
link.href = "https://google.com/search?q=HTML+Tutorials";
link.innerText = "HTML Tutorials on Google";

var body = document.querySelector("body");
body.appendChild(link);

alert(body.outerHTML);
</script>
</body>
</html>
```

There are also events like click, load, error, etc.

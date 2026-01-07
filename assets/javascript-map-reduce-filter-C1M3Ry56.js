const n=`## JavaScript Map, Reduce, Filter

Many programmers struggle to understand or find use for the \`.map()\` method.

In this article we're going to program the method ourselves, so you can understand exactly what it is.

---

### map

To avoid polluting the JavaScript array, we're going to create a new version of the array by extending the class.

\`\`\`javascript
class CustomArray extends Array {
  map() {
    return "custom method";
  }
}
\`\`\`

Now we have 2 equal array classes. The JavaScript one and ours.

Ours is almost the same as JavaScript's, only the map method changes.

You can check it works with the following code:

\`\`\`javascript
class CustomArray extends Array {
  map() {
    return "custom method";
  }
}

let numbers = new CustomArray(1, 2, 3); // Creates a custom array
let numbers2 = [1, 2, 3]; // Creates a normal array

numbers.map( num => num + 1); // "custom method"
numbers2.map( num => num + 1); // 2, 3, 4
\`\`\`

In the first call to map (our custom method) nothing special happens because our method doesn't have defined that it accepts any parameter, so the method is executed without more ignoring the parameters.

On the other hand, in the second call to map (the original JavaScript \`.map()\`), the function is taken as an argument and 1 is added to each array element.

A function that is passed as a parameter to another function/method (with the intention of being executed inside the called function) is known as a **callback**.

Let's make our method accept a function and call it:

\`\`\`javascript
class CustomArray extends Array {
  map(callback) { // accepts any parameter
    return callback("custom method"); // call it passing the text as argument
  }
}

let numbers = new CustomArray(1, 2, 3); // Creates a custom array
let numbers2 = new Array(1, 2, 3); // Creates a normal array

numbers.map( num => num + 1 ); // "custom method1"
numbers2.map( num => num + 1 ); // 2, 3, 4
\`\`\`

This is how we add the callback.

We accept that a function is passed as a map argument, we call the function that is passed using \`argumentName();\` and we pass the argument an argument in the call such that \`argumentName("custom method");\`

Currently our map only adds 1 to our text, but the goal is for it to add 1 to all array elements.

For this we'll use \`this\` to access the CustomArray and its elements:

\`\`\`javascript
class CustomArray extends Array {
  map(callback) {
    return callback(this);
  }
}

let numbers = new CustomArray(1, 2, 3);
let numbers2 = new Array(1, 2, 3);

numbers.map( num => num + 1 ); // "1, 2, 31"
numbers2.map( num => num + 1 ); // 2, 3, 4
\`\`\`

By using \`this\` as the callback parameter we access the array and since arrays and numbers can't be added, JavaScript opts for an intermediate type between both that can be added, adding the strings \`"1, 2, 3" + "1"\`.

What map does is call the function we pass it on each element and returns an array with the results.

So we finish map with:

\`\`\`javascript
class CustomArray extends Array {
  map(callback) {
    for (let i = 0; i < this.length; ++i) {
      this[i] = callback(this[i])
    }
    return this;
  }
}

let numbers = new CustomArray(1, 2, 3);
let numbers2 = new Array(1, 2, 3);

numbers.map( num => num + 1 ); // 2, 3, 4
numbers2.map( num => num + 1); // 2, 3, 4
\`\`\`

We've successfully created our version of the map method.

Map is an array method, so you can't use it with other classes like String. You can modify the code to extend the String class and add the map method to it:

\`\`\`javascript
class CustomString extends String {
  map(callback) {
    let aux = "";
    for (let i = 0; i < this.length; ++i) {
      aux += callback(this[i])
    }
    return aux;
  }
}

const text = new CustomString("hello");

text.map(letter => letter + 1) // "h1e1l1l1o1"
\`\`\`

I think it's clear what map does exactly.

It applies the function we pass it to each element and returns the result.

It's the same effect as if we did:

\`\`\`javascript
let arr = [1, 2, 3];
let auxiliary = [];
const add1 = argument => argument + 1;

auxiliary.push( add1(arr[0]) );
auxiliary.push( add1(arr[1]) );
auxiliary.push( add1(arr[2]) );

console.log(auxiliary) // 2, 3, 4
\`\`\`

---

### reduce

The reduce method is practically the same as map, but instead of returning all elements it only returns the result of operating with them.

\`\`\`javascript
let numbers = [1, 2, 3];
numbers.reduce( (res, num) => res + num); // 6
\`\`\`

The code is also very similar to map's.

Try making your own implementation and playing by passing it different parameters.

Remember that these examples are basic. The map, reduce and similar methods are more complete than these implementations.

You can consult some polyfills to get an idea closer to everything each method does.

---

### filter

With filter instead of returning the result, the array element is returned or not depending on whether the condition you indicate is met or not.

For example, you can filter the elements of an array to obtain only even numbers:

\`\`\`javascript
let numbers = [1, 2, 3];
numbers.filter( num => num % 2 == 0 ); // 2
\`\`\`

Remember that a new array is returned, the original is not modified.

---

### Practical Examples

#### Using map to transform data

\`\`\`javascript
let prices = [10, 20, 30];
let pricesWithTax = prices.map(price => price * 1.21);
// [12.1, 24.2, 36.3]
\`\`\`

#### Using reduce to accumulate values

\`\`\`javascript
let numbers = [1, 2, 3, 4, 5];
let sum = numbers.reduce((accumulator, current) => accumulator + current, 0);
// 15
\`\`\`

#### Using filter to select specific items

\`\`\`javascript
let ages = [12, 18, 25, 30, 16];
let adults = ages.filter(age => age >= 18);
// [18, 25, 30]
\`\`\`

#### Chaining methods

You can chain these methods together to create powerful data transformations:

\`\`\`javascript
let numbers = [1, 2, 3, 4, 5, 6];

let result = numbers
  .filter(num => num % 2 === 0)  // Keep only even numbers: [2, 4, 6]
  .map(num => num * 2)            // Double each number: [4, 8, 12]
  .reduce((acc, num) => acc + num, 0); // Sum them all: 24
\`\`\`

---

### Understanding the Differences

**map:** Transforms each element and returns a new array of the same length.

**reduce:** Combines all elements into a single value (could be a number, string, object, etc.).

**filter:** Selects elements based on a condition and returns a new array (possibly shorter).

`;export{n as default};

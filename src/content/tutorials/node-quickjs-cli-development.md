## Node & Quickjs for CLI Development

Node and Quickjs are 2 of the most popular runtime environments to run our JavaScript code.

In this article I explain how to program portable code between both environments and which one benefits you to use according to the type of program you develop while still keeping the possibilities of running it in the other environment.

---

### Overview

#### Node

Node.js is an open source project that allows you to run JavaScript outside the browser.

It is widely used to produce and serve web pages. It uses the V8 JavaScript engine (an engine that Chrome uses, among other browsers) to execute JavaScript.

As it is an engine used in both environments, improvements are focused and costs are reduced by joining community efforts in the same project.

These premises have made Node the most powerful JavaScript environment by far in the entire development spectrum.

#### Quickjs

Quickjs is an engine/environment/library that allows you to execute JavaScript code outside the browser.

It has little adoption but its simplicity, small size and features make it the perfect utility for scripting, shell scripting, embeddable software and low-performance hardware.

One of its most outstanding qualities is the possibility of compiling your program into C code using the qjsc utility, or directly generating an executable from your JavaScript code.

#### CLI Software

The CLI software is designed to be used as commands from a console or terminal.

These programs are executed by writing their name followed by a series of predefined parameters (arguments) in order to carry out a task or obtain a result.

CLI tools are the text version of their homonyms, the graphics/windowed programs.

---

### Program Installation

Both Node and Quickjs are cross-platform programs. You can install them on a wide variety of operating systems.

#### Node

1. Go to the [download section of the official Node page](https://nodejs.org/en/download/)
2. Select the binary/installer corresponding to your operating system
3. Follow the steps of the installer (Windows) or run the binary from the terminal (Unix)

In case you use a Unix system, you can also use the package manager of your distribution.

#### Quickjs

If you already have installed g++ and make or are used to compiling programs using source code, it is recommended to compile it. [Latest version of the code](https://bellard.org/quickjs/).

Otherwise you can choose to download the binary already compiled.

The downside is that it does not include qjsc (the JavaScript-to-binary compiler). Anyway you can run your JavaScript code with just the binary.

[Here the list of available binaries](https://bellard.org/quickjs/). Make sure to download the latest version compatible with your system.

Move the binary(s) extracted from the .tar.gz/.zip to one of the binary paths available on your system so that you can use qjs as a command.

In the case of Windows, the path `C:\Windows\System32` or `C:\Windows\SysWOW64` is included by default in the PATH environment variable.

If you move the executable qjs to that folder, you can use it from the cmd as if it were another command of the system.

In the case of Unix, the equivalent directories are usually `/bin` and `~/../usr/bin`.

If you compiled from source code move also qjsc to the path.

#### Installation Testing

Create a test file to check that both environments work by running the command:

```bash
echo 'console.log("The current date is: " + new Date())' > test.js
```

Test Node by running:

```bash
node test.js
```

You should see the date in the console as a response.

Do the same with Quickjs using:

```bash
qjs test.js
```

---

### Creating Your First CLI Utility

The first utility will be something simple with little practical utility, but that will help us understand how to work with the parameters.

It will also teach us about other utilities in each environment (using a simple method without dependencies or external modules) and how to write portable code that works between both environments.

We are going to write a program that accepts text (from a file) and tells us how many letters, numbers and characters it has.

We will use 3 different parameters to tell the program what result we want it to show us and another parameter to indicate the file in which the text is located.

#### Writing Compatible Code

Quickjs uses special imports with hardcoded strings.

Specifically, it has 2 modules of this type: the std module, and the os module.

These must be imported at the beginning of the file and their syntax is:

```javascript
import * as std from "std";
```

Trying to run a script with this type of import without a path or extension would cause an exception in Node.

To get around this problem, you can bypass imports by using the `--std` argument.

To avoid having to write this argument you can create an alias.

In case of bash and Linux, you can do it with the following command:

```bash
echo alias qjs="'qjs --std'" >> ~/.bashrc
```

In Windows to create the alias you can rename the Quickjs binary that you already moved to `C:\Windows\Sys` and create there your batch file as qjs in which you call the original qjs with the argument `--std`.

We will also use code to simplify the detection of whether the script runs in Node or Quickjs:

```javascript
let isQjs = false;
try {
  isQjs = std ? true : false;
} catch(e) {}
```

#### Parsing the Arguments

In Node to read the arguments you use `process.argv`, which returns an array with all the arguments with which the program was called.

The Quickjs equivalent is `scriptArgs`.

To unify both we add the code:

```javascript
const cli = {
  args: isQjs ? scriptArgs : process.argv.splice(1)
};
```

As we are going to load the text into the program by reading it from a file, we must also unify the way to open files.

Node uses the fs module, while Quickjs uses the std module.

```javascript
let loadFile;
if (isQjs) {
  loadFile = std.loadFile;
} else {
  const fs = require("fs");
  loadFile = filename => {
    try {
      filename = fs.readFileSync(filename, { encoding: "utf-8" })
    } catch(e) {
      filename = null;
    }
    return filename;
  };
}
```

We will also use the cli object to save our arguments with a switch:

```javascript
for (let i in cli.args) {
  switch(cli.args[i]) {
    case "-f":
    case "--file":
      cli.file = "" + loadFile(cli.args[+i + 1]);
    break;

    case "-h":
    case "--help":
      cli.help = true;
    break;

    case "-l":
    case "--letter":
    case "--letters":
      cli.letter = true;
    break;

    case "-n":
    case "--number":
    case "--numbers":
      cli.number = true;
    break;

    case "-s":
    case "--simbol":
    case "--simbols":
      cli.simbol = true;
    break;

    case "-t":
    case "--total":
      cli.total = true;
  }
}
```

#### CLI Program Functionality

Finally we add what to do in case each argument is found:

```javascript
(() => {
  if (cli.help) {
    console.log(`usage [engine] charcounter.js [arguments]

engine:
+ qjs --std
+ node

arguments:
+ -f, --file      File name (path) of the file you want to load
+ -h, --help      This message
+ -l, --letters   Output how many letters the file has
+ -n, --numbers   Output how many numbers the file has
+ -s, --simbols   Output how many simbols the file has
+ -t, --total     Shows how many characters the file has

Letters: a to Z
Numbers: 0 to 9
Simbols: Anything else.
Characters: Total.
`);
    return;
  } else if (!!!cli.file) {
    console.log("Error: MISSING ARGUMENT -f\nArgument is mandatory.");
    return;
  } else {
    if (cli.letter)
      console.log(cli.file.match(/[a-zA-Z]/g).length);

    if (cli.number)
      console.log(cli.file.match(/[0-9]/g).length);

    if (cli.simbol)
      console.log(cli.file.match(/[^A-Za-z0-9]/g).length);

    if (cli.total)
      console.log(cli.file.length);
  }
})();
```

---

### Conclusions

I named the file as `charcounter.js`, and it works in both Node and qjs.

If we look at the time the script takes with each engine, we can see a very significant difference:

```bash
$ time qjs charcounter.js -f charcounter.js -l -n -s -t
1064
9
1004
2077
real    0m0.028s
user    0m0.012s
sys     0m0.012s

$ time node charcounter.js -f charcounter.js -l -n -s -t
1064
9
1004
2077
real    0m0.250s
user    0m0.216s
sys     0m0.029s
```

**Quickjs was 10 times faster than Node.**

For that reason alone, it is already an option worth considering, especially for small scripts and utilities.

How is this possible? Everything is based on the significant difference in boot time.

Node is much larger and more complete in many ways and therefore takes longer to boot.

But once started it is much faster than Quickjs mainly due to its JIT implementation.

You would have the option to run the Node command as a service, so you would always have it available (avoiding having to start it every time you run the program).

That option may or may not be a significant waste of resources, depending on your situation.

For example, if you replaced bash with your own REPL, it would make sense to run it as a 24/7 service.

On the other hand, with simple utilities like the character counter, Quickjs is the perfect solution.

If you compiled the Quickjs from source, you can use qjsc to compile the program and add it to the binary PATH to run it without needing to precede it from qjs or qjs --std.

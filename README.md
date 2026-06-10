<div align="center">
  <img width="160" height="160" src="https://cdn.worldvectorlogo.com/logos/coffeescript.svg">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" hspace="20" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![discussion][discussion]][discussion-url]
[![size][size]][size-url]

# coffee-loader

Compile [CoffeeScript](https://coffeescript.org/) to JavaScript.

## Getting Started

To begin, you'll need to install `coffeescript` and `coffee-loader`:

```console displayName="npm"
npm install --save-dev coffeescript coffee-loader
```

```bash displayName="yarn"
yarn add -D coffeescript coffee-loader
```

```bash displayName="pnpm"
pnpm add -D coffeescript coffee-loader
```

Then add the loader to your `webpack.config.js`. For example:

```coffee displayName="file.coffee"
# Assignment:
number   = 42
opposite = true

# Conditions:
number = -42 if opposite

# Functions:
square = (x) -> x * x

# Arrays:
list = [1, 2, 3, 4, 5]

# Objects:
math =
  root:   Math.sqrt
  square: square
  cube:   (x) -> x * square x

# Splats:
race = (winner, runners...) ->
  print winner, runners

# Existence:
alert "I knew it!" if elvis?

# Array comprehensions:
cubes = (math.cube num for num in list)
```

```js displayName="webpack.config.js"
module.exports = {
  module: {
    rules: [
      {
        test: /\.coffee$/,
        loader: "coffee-loader",
      },
    ],
  },
};
```

Alternative usage:

```js
import coffee from "coffee-loader!./file.coffee";
```

Finally, run `webpack` using the method you normally use (e.g., via CLI or an
npm script).

## Options

You can find all available CoffeeScript options [here](https://coffeescript.org/#nodejs-usage).

The `sourceMap` option takes a value from the `compiler.devtool` value by
default.

The `filename` option takes a value from webpack loader API, but its value
will be ignored.

```js displayName="webpack.config.js"
module.exports = {
  module: {
    rules: [
      {
        test: /\.coffee$/,
        loader: "coffee-loader",
        options: {
          bare: false,
          transpile: {
            presets: ["@babel/env"],
          },
        },
      },
    ],
  },
};
```

## Examples

### CoffeeScript and Babel

From CoffeeScript 2 documentation:

CoffeeScript 2 generates JavaScript using the latest, modern syntax. The
runtime or browsers where you want your code to run might not support all of
that syntax. In that case, modern JavaScript needs to be converted into an
older JavaScript that will run in older versions of Node or older browsers;
for example: `{ a } = obj` into `a = obj.a`. This conversion is done using
transpilers like Babel, Bublé or Traceur Compiler.

You'll need to install `@babel/core` and `@babel/preset-env` and then create a
configuration file:

```console
npm install --save-dev @babel/core @babel/preset-env
echo '{ "presets": ["@babel/env"] }' > .babelrc
```

```js displayName="webpack.config.js"
module.exports = {
  module: {
    rules: [
      {
        test: /\.coffee$/,
        loader: "coffee-loader",
        options: {
          transpile: {
            presets: ["@babel/env"],
          },
        },
      },
    ],
  },
};
```

### Literate CoffeeScript

To use Literate CoffeeScript you should set up:

```js displayName="webpack.config.js"
module.exports = {
  module: {
    rules: [
      {
        test: /\.coffee$/,
        loader: "coffee-loader",
        options: {
          literate: true,
        },
      },
    ],
  },
};
```

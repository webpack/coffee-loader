<div align="center">
  <img width="160" height="160" src="https://cdn.worldvectorlogo.com/logos/coffeescript.svg">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" hspace="20" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

[![npm](https://img.shields.io/npm/v/coffee-loader.svg)](https://npmjs.com/package/coffee-loader)
[![node](https://img.shields.io/node/v/coffee-loader.svg)](https://nodejs.org)
[![tests](https://github.com/webpack/coffee-loader/workflows/coffee-loader/badge.svg)](https://github.com/webpack/coffee-loader/actions)
[![coverage](https://codecov.io/gh/webpack/coffee-loader/branch/main/graph/badge.svg)](https://codecov.io/gh/webpack/coffee-loader)
[![discussion](https://img.shields.io/github/discussions/webpack/webpack)](https://github.com/webpack/webpack/discussions)
[![size](https://packagephobia.now.sh/badge?p=coffee-loader)](https://packagephobia.now.sh/result?p=coffee-loader)

# coffee-loader

Compile [CoffeeScript](https://coffeescript.org/) to JavaScript.

## Getting Started

To begin, you'll need to install `coffeescript` and `coffee-loader`:

```console
npm install --save-dev coffeescript coffee-loader
```

or

```console
yarn add -D coffeescript coffee-loader
```

or

```console
pnpm add -D coffeescript coffee-loader
```

Then add the loader to your `webpack.config.js`. For example:

**file.coffee**

```coffee
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

**webpack.config.js**

```js
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

Finally, run `webpack` using the method you normally use (e.g., via CLI or an npm script).

## Options

Type: `Object`
Default: `{ bare: true }`

You can find all available CoffeeScript options [here](https://coffeescript.org/#nodejs-usage).

For documentation on the `transpile` option, see [this section](https://coffeescript.org/#transpilation).

> [!NOTE]
>
> The `sourceMap` option takes a value from the `compiler.devtool` value by default.

> [!NOTE]
>
> The `filename` option takes a value from webpack loader API, but it's value will be ignored.

**webpack.config.js**

```js
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

> [!NOTE]
>
> CoffeeScript 2 generates JavaScript using the latest, modern syntax.
> The runtime or browsers where you want your code to run might not support all of that syntax.
> In that case, modern JavaScript needs to be converted into an older JavaScript that will run in older versions of Node or older browsers; for example: `{ a } = obj` into `a = obj.a`.
> This conversion is done using transpilers like Babel, Bublé or Traceur Compiler.

You'll need to install `@babel/core` and `@babel/preset-env` and then create a configuration file:

```console
npm install --save-dev @babel/core @babel/preset-env
echo '{ "presets": ["@babel/env"] }' > .babelrc
```

**webpack.config.js**

```js
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

To use Literate CoffeeScript you should setup:

**webpack.config.js**

```js
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

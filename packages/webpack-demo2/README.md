# webpack-demo2

* `yarn build` to build.
* Load `.styl` files using [stylus-loader](https://github.com/shama/stylus-loader).
* Extract `dist/main.css` using [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin).
* `dist/main.css` should looks like following:
    ```
    body {
      color: #00f;
    }
    body {
      color: #f00;
    }
    ```

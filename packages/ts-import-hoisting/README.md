# ts-import-hoisting

This repo demonstrates [import hoisting](https://exploringjs.com/es6/ch_modules.html#_imports-are-hoisted) of TypeScript. Hoisting is a feature of ES2015 and TypeScript use it via setting [`module` compile option](https://www.typescriptlang.org/docs/handbook/compiler-options.html) to `es2015` or later.

```javascript
// src/main.ts
import './foo'       // console.log('foo')
console.log('main')
import './bar'       // console.log('bar')
```

## Do hoisting with "module": "es2015"

- `tsconfig.es2015.js` uses `"module": "es2015"`.
- `webpack.es2015.js` emits `dist/main.es2015.js` from `src/main.ts` and `tsconfig.es2015.js`.

```
$ node dist/main.es2015.js 
foo
bar
main
```

## Do not hoisting with "module": "commonjs"

- `tsconfig.commonjs.js` uses `"module": "commonjs"`.
- `webpack.commonjs.js` emits `dist/main.commonjs.js` from `src/main.ts` and `tsconfig.commonjs.js`.

```
$ node dist/main.commonjs.js 
foo
main
bar
```

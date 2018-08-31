# fis3-parser-less-latest

A parser for fis3 to compile less(v3.x) file.

## INSTALL

```bash
npm i -D fis3-parser-less-latest
// or
yarn add -D fis3-parser-less-latest
```

## USEAGE

```js
fis.match('*.less', {
  parser: fis.plugin('less-latest', {
    // sourceMap: true,
    // syncImport: true,
    // relativeUrls: true,
    // javascriptEnabled: true,
    // paths: []
  }),
  rExt: '.css'
});
```

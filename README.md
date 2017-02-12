# cc-image-lightbox

> Single Purpose Tool with predefined look and behaviour.

 * Uses **CSS3** features like [vh](http://caniuse.com/#feat=viewport-units) and [calc](http://caniuse.com/#feat=calc)
 * Uses **ECMAScript 2016** features like [const](http://caniuse.com/#feat=const), [let](http://caniuse.com/#feat=let) and [Arrow functions](http://caniuse.com/#feat=arrow-functions) 


## Install

```
$ npm install --save cc-image-lightbox
```

## Usage

**Browserify/Webpack**

```js
const ccImageLightbox = require('cc-image-lightbox');
ccImageLightbox.init();
```

**Browser**
```html
<script src="cc-image-lightbox.min.js"></script>
<script>
  var ccImageLightbox = new CCImageLightbox();
  ccImageLightbox.init();
</script>
```

## License

MIT © [codeclou.io](./LICENSE.md)

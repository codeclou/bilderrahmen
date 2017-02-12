# cc-image-lightbox

> Single Purpose Tool with predefined look and behaviour.

 * Uses **CSS3** features like [vh](http://caniuse.com/#feat=viewport-units) and [calc](http://caniuse.com/#feat=calc)
 * Uses **ECMAScript 2016** features like [const](http://caniuse.com/#feat=const), [let](http://caniuse.com/#feat=let) and [Arrow functions](http://caniuse.com/#feat=arrow-functions) 


## Install

```
$ npm install --save cc-image-lightbox
```

## Usage

**Webpack es6**

JS
```js
import CCImageLightbox from 'cc-image-lightbox';
const ccImageLightbox = new CCImageLightbox();
ccImageLightbox.init();
```

SCSS
```scss
@import "../node_modules/cc-image-lightbox/dist/cc-image-lightbox";
```


## License

MIT © [codeclou.io](./LICENSE.md)

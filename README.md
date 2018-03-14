[![](https://codeclou.github.io/bilderrahmen/img/bilderrahmen-logo.svg)](https://github.com/codeclou/bilderrahmen)

> Lightweight vanilla-JS image lightbox crafted with CSS3 and inline SVG icons for modern browsers

&nbsp;

**:sparkles: [DEMO](https://codeclou.github.io/bilderrahmen/)**

<p align="center">
<a href="https://codeclou.github.io/bilderrahmen/"><img src="https://codeclou.github.io/bilderrahmen/img/demo.gif" width="80%"></a>
</p>

-----

&nbsp;

### Features

 * pure JavaScript, no dependencies
 * multiple galleries per page supported
 * minimal look
 * image title support
 * responsive
 * inline SVG buttons
 * MP4 video support (HTML 5 video)
 * minified: js 4.7 KB css 4.2 KB total 8.9 KB
 * gzipped: js 1.5 KB css 2.0 KB total 3.5 KB


-----

&nbsp;

### Usage

**Browser**: Use directly from CDN with [RequireJS](http://requirejs.org/).

```html
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bilderrahmen@1.0.0/bilderrahmen.css" rel="stylesheet" />
  <script src="https://cdn.jsdelivr.net/gh/requirejs/requirejs@2.3.5/require.js"></script>
</head>
<body>


  <a href="https://codeclou.github.io/bilderrahmen/demo/demo-gallery-02/images/DSC05104.JPG" target="_blank"><img
        src="https://codeclou.github.io/bilderrahmen/demo/demo-gallery-02/thumbs/DSC05104.JPG"
        data-bilderrahmen="gallery-02"
        data-bilderrahmen-title="Image Four"
  /></a>

  <!-- Video only supports MP4 and one video source! -->
  <a href="https://codeclou.github.io/bilderrahmen/demo/demo-videos/demo-720p.mp4" target="_blank"><img
          src="https://codeclou.github.io/bilderrahmen/demo/demo-videos/demo-720p-poster.jpg"
          style="width:200px;border:1px solid #ccc"
          data-bilderrahmen-video="https://codeclou.github.io/bilderrahmen/demo/demo-videos/demo-720p.mp4"
          data-bilderrahmen="gallery-02"
          data-bilderrahmen-title="Video One"
  /></a>

  <script>
    require(['https://cdn.jsdelivr.net/npm/bilderrahmen@1.0.0/bilderrahmen.umd.es5.js'], function(module) {
        new module.Bilderrahmen({ closeOnOutsideClick: true });
    });
  </script>
</body>
</html>
```

----

**UMD**: Use `bilderrahmen.umd.es5.js` as AMD or CommonJS module.

```
npm install bilderrahmen --save
```

```js
var Bilderrahmen = require('bilderrahmen').Bilderrahmen;

new Bilderrahmen({
   closeOnOutsideClick: true
});
```

Load css from `node_modules/bilderrahmen/dist/bilderrahmen.min.css`

-----


**ES5/ES2015**: Use `bilderrahmen.es2015.es5.js` or `bilderrahmen.es2015.es2015.js` as ES-Module.

```
npm install bilderrahmen --save
```

```js
import { Bilderrahmen } from 'bilderrahmen';

new Bilderrahmen({
   closeOnOutsideClick: true
});
```

Note that depending on your buildchain language target files are automatically loaded by [`package.json` convention](./build-package-json-template.json).

Load css from `node_modules/bilderrahmen/dist/bilderrahmen.min.css`

-----

&nbsp;


### Browser Support

Works in all modern browsers and was tested in the following versions

![](https://codeclou.github.io/bilderrahmen/img/browser-support.svg?v2)


Note: SVG loading animation will not work in IE11 or Edge due to poor SVG animation support.

-----


&nbsp;

### Development and Release

See [DEVELOPMENT.md](./DEVELOPMENT.md)

-----


&nbsp;

## License

[MIT](./LICENSE) © [Bernhard Grünewaldt](https://github.com/clouless)


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

**Browser**: Use directly from CDN

```html
<html>
<body>
  <link href="https://unpkg.com/bilderrahmen@0.3.0/dist/bilderrahmen.min.css" rel="stylesheet" />

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

  <script src="https://unpkg.com/bilderrahmen@0.3.0/dist/bilderrahmen.min.js"></script>
  <script>
      new bilderrahmen({
          closeOnOutsideClick: true
      });
  </script>
</body>
</html>
```

----

**UMD**: Use `bilderrahmen.js` as AMD or CommonJS module.

```
npm install bilderrahmen --save
```

```js
var Bilderrahmen = require('bilderrahmen');

new Bilderrahmen({
   closeOnOutsideClick: true
});
```

Load css from `node_modules/bilderrahmen/dist/bilderrahmen.min.css`

----


**ESM and SystemJS** use `bilderrahmen.esm.js` as ES6-module and transpile it yourself with babel

```html
<html>
<body>
<link href="https://unpkg.com/bilderrahmen@0.3.0/dist/bilderrahmen.min.css" rel="stylesheet" />
<script src="https://cdn.rawgit.com/systemjs/systemjs/0.20.9/dist/system.js"></script>
<script>
    SystemJS.config({
        map: {
            'plugin-babel': 'https://cdn.rawgit.com/systemjs/plugin-babel/0.0.21/plugin-babel.js',
            'systemjs-babel-build': 'https://cdn.rawgit.com/systemjs/plugin-babel/0.0.21/systemjs-babel-browser.js',
            'bilderrahmen': 'https://unpkg.com/bilderrahmen@0.3.0/dist/bilderrahmen.esm.js'
        },
        transpiler: 'plugin-babel'
    });
    SystemJS.import('./main.js');
</script>
</body>
</html>
```

`main.js`
```js
import Bilderrahmen from 'bilderrahmen';

new Bilderrahmen({
   closeOnOutsideClick: true
});
```
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
  

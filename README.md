[![](https://codeclou.github.io/cc-image-lightbox/img/cc-image-lightbox-logo.svg)](https://github.com/codeclou/cc-image-lightbox)

> Lightweight vanilla-JS image lightbox crafted with CSS3 and inline SVG icons for modern browsers

<p>&nbsp;</p>

**:black_circle: DEMO:** [codeclou.github.io/cc-image-lightbox/](https://codeclou.github.io/cc-image-lightbox/)

<p>&nbsp;</p>

## Usage

**Browser**

```html
<html>
<body>
  <link href="https://cdn.rawgit.com/codeclou/cc-image-lightbox/0.0.10/build/cc-image-lightbox.min.css" rel="stylesheet" />

  <a href="https://codeclou.github.io/cc-image-lightbox/demo/demo-gallery-02/images/DSC05104.JPG" target="_blank"><img
        src="https://codeclou.github.io/cc-image-lightbox/demo/demo-gallery-02/thumbs/DSC05104.JPG"
        data-cc-lightbox="gallery-02"
        data-cc-title="Image Four"
  /></a>

  <script src="https://cdn.rawgit.com/codeclou/cc-image-lightbox/0.0.10/build/cc-image-lightbox.min.js"></script>
</body>
</html>
```

**ESM and SystemJS** with ES6 babel transpilation

```html
<html>
<body>
<link href="https://cdn.rawgit.com/codeclou/cc-image-lightbox/0.0.10/build/cc-image-lightbox.min.css" rel="stylesheet" />
<script src="https://cdn.rawgit.com/systemjs/systemjs/0.20.9/dist/system.js"></script>
<script>
    SystemJS.config({
        map: {
            'plugin-babel': 'https://cdn.rawgit.com/systemjs/plugin-babel/0.0.21/plugin-babel.js',
            'systemjs-babel-build': 'https://cdn.rawgit.com/systemjs/plugin-babel/0.0.21/systemjs-babel-browser.js',
            'cc-image-lightbox': 'https://cdn.rawgit.com/codeclou/cc-image-lightbox/0.0.10/build/cc-image-lightbox.esm.js'
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
import CCImageLightbox from 'cc-image-lightbox';

new CCImageLightbox();
```

<p>&nbsp;</p>

## License

MIT © [codeclou.io](./LICENSE.md)

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CCImageLightbox = function () {
    function CCImageLightbox() {
        _classCallCheck(this, CCImageLightbox);
    }

    _createClass(CCImageLightbox, [{
        key: 'ccCloseImageLightbox',
        value: function ccCloseImageLightbox() {
            var lightboxWrapper = document.getElementsByClassName('cc-lightbox-wrapper');
            if (lightboxWrapper[0] !== undefined && lightboxWrapper[0] !== null) {
                lightboxWrapper[0].remove();
            }
        }
    }, {
        key: 'ccOpenImageLightbox',
        value: function ccOpenImageLightbox(galleryId, index) {
            this.ccCloseImageLightbox();
            this.ccCreateImageLightbox(galleryId, index);
        }
    }, {
        key: 'ccCreateImageLightbox',
        value: function ccCreateImageLightbox(galleryId, index) {
            var self = this;
            console.log('ccCreateImageLightbox() with ' + galleryId + ' ' + index);

            var lightboxStore = window.ccImageLightboxStore;
            var imgSrc = lightboxStore[galleryId][index].src;
            var title = lightboxStore[galleryId][index].title;
            var lightboxDiv = document.createElement('div');
            lightboxDiv.setAttribute('class', 'cc-lightbox-wrapper');
            lightboxDiv.setAttribute('data-cc-lightbox-gallery-id', galleryId);
            lightboxDiv.onclick = function () {
                console.log('clicked');
                //this.remove();
            };
            var renderPreviousButton = function renderPreviousButton(galleryId, index) {
                var previousIndex = parseInt(index, 10) - 1;
                var button = document.createElement('div');
                button.setAttribute('class', 'cc-lightbox--left');
                if (lightboxStore[galleryId][previousIndex] !== undefined) {
                    button.setAttribute('class', 'cc-lightbox--left cc-lightbox--left--has-previous');
                    button.onclick = function () {
                        console.log('clicked previous');
                        self.ccOpenImageLightbox(galleryId, previousIndex);
                    };
                }
                return button;
            };
            var renderNextButton = function renderNextButton(galleryId, index) {
                var nextIndex = parseInt(index, 10) + 1;
                var button = document.createElement('div');
                button.setAttribute('class', 'cc-lightbox--right');
                if (lightboxStore[galleryId][nextIndex] !== undefined) {
                    button.setAttribute('class', 'cc-lightbox--right cc-lightbox--right--has-next');
                    button.onclick = function () {
                        console.log('clicked next');
                        self.ccOpenImageLightbox(galleryId, nextIndex);
                    };
                }
                return button;
            };

            var topBar = document.createElement('div');
            topBar.setAttribute('class', 'cc-lightbox--top');
            topBar.innerHTML = '  <div class="cc-lightbox--top-title">' + title + '  </div>' + '  <div class="cc-lightbox--top-close" onclick="this.parentNode.parentNode.remove()">' + '  </div>';
            lightboxDiv.appendChild(topBar);
            lightboxDiv.appendChild(renderPreviousButton(galleryId, index));
            var image = document.createElement('div');
            image.setAttribute('class', 'cc-lightbox--image');
            image.innerHTML = '  <div class="cc-lightbox--image-inner">' + '    <img src="' + imgSrc + '" class="cc-lightbox--image-img" />' + '  </div>';
            lightboxDiv.appendChild(image);
            lightboxDiv.appendChild(renderNextButton(galleryId, index));
            document.body.appendChild(lightboxDiv);
            return false;
        }
    }, {
        key: 'init',
        value: function init() {
            var self = this;
            var lightboxElements = document.querySelectorAll('[data-cc-lightbox]');
            window.ccImageLightboxStore = [];

            var _loop = function _loop(i) {
                var lightboxElement = lightboxElements[i];
                var galleryId = lightboxElement.getAttribute('data-cc-lightbox');
                var lightboxDataTitle = lightboxElement.getAttribute('data-cc-title');
                var lightboxImgSrc = lightboxElement.parentNode.getAttribute('href');

                //
                // FILL STORE
                //
                if (window.ccImageLightboxStore[galleryId] === undefined || window.ccImageLightboxStore[galleryId] === null) {
                    window.ccImageLightboxStore[galleryId] = [];
                }
                var nextIndex = window.ccImageLightboxStore[galleryId].length;
                window.ccImageLightboxStore[galleryId][nextIndex] = {
                    title: lightboxDataTitle,
                    src: lightboxImgSrc
                };
                //
                // THUMBNAIL CLICK OPENS LIGHTBOX
                //
                lightboxElement.parentNode.onclick = function () {
                    self.ccOpenImageLightbox(galleryId, nextIndex);
                    return false;
                };
            };

            for (var i = 0; i < lightboxElements.length; i++) {
                _loop(i);
            }

            //
            // CLOSE ON ESCAPE KEY PRESS
            //
            document.addEventListener('keydown', function (event) {
                if (event.keyCode === 27) {
                    self.ccCloseImageLightbox();
                }
            }, false);
        }
    }]);

    return CCImageLightbox;
}();

;

exports.default = CCImageLightbox;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ccImageLightbox = __webpack_require__(0);

var _ccImageLightbox2 = _interopRequireDefault(_ccImageLightbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ccImageLightbox = new _ccImageLightbox2.default(); /**
                                                        * USED TO GENERATE A BROWSER VERSION WITH WEBPACK.
                                                        */

ccImageLightbox.init();

/***/ })
/******/ ]);
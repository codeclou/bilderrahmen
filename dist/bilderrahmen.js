/*!
 * @license MIT
 * Copyright (c) 2017 Bernhard Grünewaldt
 * https://github.com/codeclou/bilderrahmen
 */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports);
        global.bilderrahmen = mod.exports;
    }
})(this, function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var Bilderrahmen = function () {
        function Bilderrahmen(options) {
            _classCallCheck(this, Bilderrahmen);

            this.store = {
                current: {
                    galleryId: null,
                    index: null
                },
                galleries: [],
                closeOnOutsideClick: false
            };
            if (options !== undefined && options !== null) {
                if (options.closeOnOutsideClick !== undefined && options.closeOnOutsideClick !== null && options.closeOnOutsideClick === true) {
                    this.store.closeOnOutsideClick = true;
                }
            }
            this.init();
        }

        _createClass(Bilderrahmen, [{
            key: '_setCurrentOpenImage',
            value: function _setCurrentOpenImage(galleryId, index) {
                this.store.current.galleryId = galleryId;
                this.store.current.index = index;
            }
        }, {
            key: '_getCurrentOpenImage',
            value: function _getCurrentOpenImage() {
                return this.store.current;
            }
        }, {
            key: '_clearCurrentOpenImage',
            value: function _clearCurrentOpenImage() {
                this.store.current.galleryId = null;
                this.store.current.index = null;
            }
        }, {
            key: '_isCurrentOpenImage',
            value: function _isCurrentOpenImage() {
                return this.store.current.galleryId !== null;
            }
        }, {
            key: '_getGallery',
            value: function _getGallery(galleryId) {
                if (this.store[galleryId] === undefined || this.store[galleryId] === null) {
                    this.store[galleryId] = [];
                }
                return this.store[galleryId];
            }
        }, {
            key: '_getImage',
            value: function _getImage(galleryId, index) {
                var gallery = this._getGallery(galleryId);
                if (gallery[index] === undefined || gallery[index] === null) {
                    gallery[index] = {};
                }
                return gallery[index];
            }
        }, {
            key: '_isImage',
            value: function _isImage(galleryId, index) {
                var image = this._getImage(galleryId, index);
                return !(image.src === undefined || image.src === null);
            }
        }, {
            key: '_renderNextOrPreviousButton',
            value: function _renderNextOrPreviousButton(galleryId, index, direction) {
                var self = this;
                var button = document.createElement('div');
                button.setAttribute('class', 'bilderrahmen--' + direction);
                if (self._isImage(galleryId, index)) {
                    button.setAttribute('class', direction === 'left' ? 'bilderrahmen--left bilderrahmen--left--has-previous' : 'bilderrahmen--right bilderrahmen--right--has-next');
                    button.onclick = function () {
                        return self.open(galleryId, index);
                    };
                }
                return button;
            }
        }, {
            key: '_generateId',
            value: function _generateId(galleryId, index) {
                return 'bilderrahmen--' + galleryId + '--' + index;
            }
        }, {
            key: 'closeIfOpen',
            value: function closeIfOpen() {
                var self = this;
                var lightboxWrapper = document.getElementsByClassName('bilderrahmen-wrapper');
                if (lightboxWrapper[0] !== undefined && lightboxWrapper[0] !== null) {
                    // IE11 does not support child.remove() but does child.parentNode.removeChild(child)
                    lightboxWrapper[0].parentNode.removeChild(lightboxWrapper[0]);
                }
                self._clearCurrentOpenImage();
            }
        }, {
            key: 'open',
            value: function open(galleryId, index) {
                this.closeIfOpen();
                this._setCurrentOpenImage(galleryId, index);
                this.create(galleryId, index);
            }
        }, {
            key: 'create',
            value: function create(galleryId, index) {
                var self = this;
                var indexInt = parseInt(index, 10);

                // WRAPPER
                var wrapper = document.createElement('div');
                wrapper.setAttribute('class', 'bilderrahmen-wrapper');
                wrapper.setAttribute('data-bilderrahmen-gallery-id', galleryId);
                document.body.appendChild(wrapper);

                // TOPBAR
                var topBar = document.createElement('div');
                topBar.setAttribute('class', 'bilderrahmen--top');
                wrapper.appendChild(topBar);

                // TITLEBAR
                var titleBar = document.createElement('div');
                titleBar.setAttribute('class', 'bilderrahmen--top-title');
                titleBar.innerHTML = self._getImage(galleryId, index).title;
                topBar.appendChild(titleBar);

                // CLOSEBUTTON
                var closeButton = document.createElement('div');
                closeButton.setAttribute('class', 'bilderrahmen--top-close');
                closeButton.onclick = function () {
                    return self.closeIfOpen();
                };
                topBar.appendChild(closeButton);

                // PREVIOUS BUTTON
                wrapper.appendChild(self._renderNextOrPreviousButton(galleryId, indexInt - 1, 'left'));

                var currentImageOrVideo = self._getImage(galleryId, index);
                // IMAGE
                if (currentImageOrVideo.isVideo === false) {
                    var image = document.createElement('div');
                    image.setAttribute('class', 'bilderrahmen--image');
                    wrapper.appendChild(image);
                    var imageInner = document.createElement('div');
                    imageInner.setAttribute('class', 'bilderrahmen--image-inner');
                    image.appendChild(imageInner);
                    var imageInnerWrap = document.createElement('div');
                    imageInnerWrap.setAttribute('class', 'bilderrahmen--image-inner-wrap');
                    imageInner.appendChild(imageInnerWrap);
                    var img = document.createElement('img');
                    img.onload = function () {
                        image.setAttribute('class', 'bilderrahmen--image bilderrahmen--image-loaded');
                    };
                    img.setAttribute('src', self._getImage(galleryId, index).src);
                    img.setAttribute('class', 'bilderrahmen--image-img');
                    img.setAttribute('id', self._generateId(galleryId, index));
                    imageInnerWrap.appendChild(img);
                    //
                    // CLOSE ON OUTSIDE CLICK
                    //
                    if (self.store.closeOnOutsideClick === true) {
                        imageInnerWrap.onclick = function () {
                            return self.closeIfOpen();
                        };
                        img.addEventListener('click', function (e) {
                            e.stopPropagation();
                        });
                    }
                }

                // VIDEO
                if (currentImageOrVideo.isVideo === true) {
                    var _image = document.createElement('div');
                    _image.setAttribute('class', 'bilderrahmen--image');
                    wrapper.appendChild(_image);
                    var _imageInner = document.createElement('div');
                    _imageInner.setAttribute('class', 'bilderrahmen--image-inner');
                    _image.appendChild(_imageInner);
                    var _imageInnerWrap = document.createElement('div');
                    _imageInnerWrap.setAttribute('class', 'bilderrahmen--image-inner-wrap');
                    _imageInner.appendChild(_imageInnerWrap);
                    var video = document.createElement('video');
                    video.onload = function () {
                        _image.setAttribute('class', 'bilderrahmen--image bilderrahmen--image-loaded');
                    };
                    video.setAttribute('poster', currentImageOrVideo.poster);
                    video.setAttribute('autoplay', '');
                    video.setAttribute('controls', '');
                    var source = document.createElement('source');
                    source.setAttribute('src', currentImageOrVideo.src);
                    source.setAttribute('type', 'video/mp4');
                    video.appendChild(source);
                    video.setAttribute('class', 'bilderrahmen--image-img');
                    video.setAttribute('id', self._generateId(galleryId, index));
                    _imageInnerWrap.appendChild(video);
                    //
                    // CLOSE ON OUTSIDE CLICK
                    //
                    if (self.store.closeOnOutsideClick === true) {
                        _imageInnerWrap.onclick = function () {
                            return self.closeIfOpen();
                        };
                        video.addEventListener('click', function (e) {
                            e.stopPropagation();
                        });
                    }
                }

                // NEXT BUTTON
                wrapper.appendChild(self._renderNextOrPreviousButton(galleryId, indexInt + 1, 'right'));

                return false;
            }
        }, {
            key: 'init',
            value: function init() {
                var self = this;
                var lightboxElements = document.querySelectorAll('[data-bilderrahmen]');

                var _loop = function _loop(i) {
                    var lightboxElement = lightboxElements[i];
                    var galleryId = lightboxElement.getAttribute('data-bilderrahmen');
                    var nextIndex = self._getGallery(galleryId).length;
                    var nextImage = self._getImage(galleryId, nextIndex);
                    nextImage.title = lightboxElement.getAttribute('data-bilderrahmen-title');
                    if (lightboxElement.getAttribute('data-bilderrahmen-video')) {
                        nextImage.src = lightboxElement.getAttribute('data-bilderrahmen-video');
                        nextImage.poster = lightboxElement.getAttribute('src');
                        nextImage.isVideo = true;
                    } else {
                        nextImage.src = lightboxElement.parentNode.getAttribute('href');
                        nextImage.poster = null;
                        nextImage.isVideo = false;
                    }

                    //
                    // THUMBNAIL CLICK OPENS LIGHTBOX
                    //
                    lightboxElement.parentNode.onclick = function () {
                        self.open(galleryId, nextIndex);
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
                        self.closeIfOpen();
                    }
                    if (event.keyCode === 37) {
                        // left
                        if (self._isCurrentOpenImage()) {
                            var current = self._getCurrentOpenImage();
                            if (self._isImage(current.galleryId, current.index - 1)) {
                                self.open(current.galleryId, current.index - 1);
                            }
                        }
                    }
                    if (event.keyCode === 39) {
                        // right
                        if (self._isCurrentOpenImage()) {
                            var _current = self._getCurrentOpenImage();
                            if (self._isImage(_current.galleryId, _current.index + 1)) {
                                self.open(_current.galleryId, _current.index + 1);
                            }
                        }
                    }
                }, false);
            }
        }]);

        return Bilderrahmen;
    }();

    ;

    exports.default = Bilderrahmen;
    module.exports = exports['default'];
});

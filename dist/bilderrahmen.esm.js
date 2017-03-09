/*!
 * @license MIT
 * Copyright (c) 2017 Bernhard Grünewaldt
 * https://github.com/codeclou/bilderrahmen
 */
class Bilderrahmen {
    constructor(options) {
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

    _setCurrentOpenImage(galleryId, index) {
        this.store.current.galleryId = galleryId;
        this.store.current.index = index;
    }
    _getCurrentOpenImage() {
        return this.store.current;
    }
    _clearCurrentOpenImage() {
        this.store.current.galleryId = null;
        this.store.current.index = null;
    }
    _isCurrentOpenImage() {
        return this.store.current.galleryId !== null;
    }

    _getGallery(galleryId) {
        if (this.store[galleryId] === undefined || this.store[galleryId] === null) {
            this.store[galleryId] = [];
        }
        return this.store[galleryId];
    }

    _getImage(galleryId, index) {
        const gallery = this._getGallery(galleryId);
        if (gallery[index] === undefined || gallery[index] === null) {
            gallery[index] = {};
        }
        return gallery[index];
    }

    _isImage(galleryId, index) {
        const image = this._getImage(galleryId, index);
        return !(image.src === undefined || image.src === null);
    }

    _renderNextOrPreviousButton(galleryId, index, direction) {
        var self = this;
        const button  = document.createElement('div');
        button.setAttribute('class', 'bilderrahmen--' + direction);
        if (self._isImage(galleryId, index)) {
            button.setAttribute('class', direction === 'left' ? 'bilderrahmen--left bilderrahmen--left--has-previous' : 'bilderrahmen--right bilderrahmen--right--has-next');
            button.onclick = () => self.open(galleryId, index);
        }
        return button;
    };

    _generateId(galleryId, index) {
        return 'bilderrahmen--' + galleryId + '--' + index;
    }


    closeIfOpen() {
        const self = this;
        const lightboxWrapper = document.getElementsByClassName('bilderrahmen-wrapper');
        if (lightboxWrapper[0] !== undefined && lightboxWrapper[0] !== null) {
            // IE11 does not support child.remove() but does child.parentNode.removeChild(child)
            lightboxWrapper[0].parentNode.removeChild(lightboxWrapper[0]);
        }
        self._clearCurrentOpenImage();
    }

    open(galleryId, index) {
        this.closeIfOpen();
        this._setCurrentOpenImage(galleryId, index);
        this.create(galleryId, index);
    }

    create(galleryId, index) {
        const self = this;
        const indexInt = parseInt(index, 10);

        // WRAPPER
        const wrapper  = document.createElement('div');
        wrapper.setAttribute('class', 'bilderrahmen-wrapper');
        wrapper.setAttribute('data-bilderrahmen-gallery-id', galleryId);
        document.body.appendChild(wrapper);

        // TOPBAR
        const topBar  = document.createElement('div');
        topBar.setAttribute('class', 'bilderrahmen--top');
        wrapper.appendChild(topBar);

        // TITLEBAR
        const titleBar = document.createElement('div');
        titleBar.setAttribute('class', 'bilderrahmen--top-title');
        titleBar.innerHTML = self._getImage(galleryId, index).title;
        topBar.appendChild(titleBar);

        // CLOSEBUTTON
        const closeButton = document.createElement('div');
        closeButton.setAttribute('class', 'bilderrahmen--top-close');
        closeButton.onclick = () => self.closeIfOpen();
        topBar.appendChild(closeButton);

        // PREVIOUS BUTTON
        wrapper.appendChild(self._renderNextOrPreviousButton(galleryId, (indexInt - 1), 'left'));

        // IMAGE
        const image  = document.createElement('div');
        image.setAttribute('class', 'bilderrahmen--image');
        wrapper.appendChild(image);
        const imageInner = document.createElement('div');
        imageInner.setAttribute('class', 'bilderrahmen--image-inner');
        image.appendChild(imageInner);
        const imageInnerWrap = document.createElement('div');
        imageInnerWrap.setAttribute('class', 'bilderrahmen--image-inner-wrap');
        imageInner.appendChild(imageInnerWrap);
        const img = document.createElement('img');
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
            imageInnerWrap.onclick = () => self.closeIfOpen();
            img.addEventListener('click', function (e) {
                e.stopPropagation( );
            });
        }

        // NEXT BUTTON
        wrapper.appendChild(self._renderNextOrPreviousButton(galleryId, (indexInt + 1), 'right'));

        return false;
    }

    init() {
        const self = this;
        const lightboxElements = document.querySelectorAll('[data-bilderrahmen]');

        for (let i = 0; i < lightboxElements.length; i++) {
            const lightboxElement = lightboxElements[i];
            const galleryId = lightboxElement.getAttribute('data-bilderrahmen');
            const nextIndex = self._getGallery(galleryId).length;
            const nextImage = self._getImage(galleryId, nextIndex);
            nextImage.title = lightboxElement.getAttribute('data-bilderrahmen-title');
            nextImage.src = lightboxElement.parentNode.getAttribute('href');

            //
            // THUMBNAIL CLICK OPENS LIGHTBOX
            //
            lightboxElement.parentNode.onclick = () => {
                self.open(galleryId, nextIndex);
                return false;
            };
        }

        //
        // CLOSE ON ESCAPE KEY PRESS
        //
        document.addEventListener('keydown', function (event) {
            if (event.keyCode === 27) {
                self.closeIfOpen();
            }
            if (event.keyCode === 37) { // left
                if (self._isCurrentOpenImage()) {
                    const current = self._getCurrentOpenImage();
                    if (self._isImage(current.galleryId, current.index - 1)) {
                        self.open(current.galleryId, current.index - 1);
                    }
                }
            }
            if (event.keyCode === 39) { // right
                if (self._isCurrentOpenImage()) {
                    const current = self._getCurrentOpenImage();
                    if (self._isImage(current.galleryId, current.index + 1)) {
                        self.open(current.galleryId, current.index + 1);
                    }
                }
            }
        }, false);

    };
};

export default Bilderrahmen;
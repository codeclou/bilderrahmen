import './ccImageLightbox.css';

class CCImageLightbox {
    constructor() {
        this.store = [];
        this.init();
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
        button.setAttribute('class', 'cc-lightbox--' + direction);
        if (self._isImage(galleryId, index)) {
            button.setAttribute('class', direction === 'left' ? 'cc-lightbox--left cc-lightbox--left--has-previous' : 'cc-lightbox--right cc-lightbox--right--has-next');
            button.onclick = () => self.open(galleryId, index);
        }
        return button;
    };


    closeIfOpen() {
        const lightboxWrapper = document.getElementsByClassName('cc-lightbox-wrapper');
        if (lightboxWrapper[0] !== undefined && lightboxWrapper[0] !== null) {
            lightboxWrapper[0].remove();
        }
    }

    open(galleryId, index) {
        this.closeIfOpen();
        this.create(galleryId, index);
    }

    create(galleryId, index) {
        const self = this;
        const indexInt = parseInt(index, 10);
        const wrapper  = document.createElement('div');
        wrapper.setAttribute('class', 'cc-lightbox-wrapper');
        wrapper.setAttribute('data-cc-lightbox-gallery-id', galleryId);
        const topBar  = document.createElement('div');
              topBar.setAttribute('class', 'cc-lightbox--top');
              topBar.innerHTML = '  <div class="cc-lightbox--top-title">' + self._getImage(galleryId, index).title; + '  </div>' +
                        '  <div class="cc-lightbox--top-closeIfOpen" onclick="this.parentNode.parentNode.remove()">' +
                        '  </div>';
        wrapper.appendChild(topBar);
        wrapper.appendChild(self._renderNextOrPreviousButton(galleryId, (indexInt - 1), 'left'));
        const image  = document.createElement('div');
              image.setAttribute('class', 'cc-lightbox--image');
              image.innerHTML = '  <div class="cc-lightbox--image-inner">' +
                '    <img src="' + self._getImage(galleryId, index).src + '" ' +
                '         class="cc-lightbox--image-img" />' +
                '  </div>';
        wrapper.appendChild(image);
        wrapper.appendChild(self._renderNextOrPreviousButton(galleryId, (indexInt + 1), 'right'));
        document.body.appendChild(wrapper);
        return false;
    }

    init() {
        const self = this;
        const lightboxElements = document.querySelectorAll('[data-cc-lightbox]');

        for (let i = 0; i < lightboxElements.length; i++) {
            const lightboxElement = lightboxElements[i];
            const galleryId = lightboxElement.getAttribute('data-cc-lightbox');
            const nextIndex = self._getGallery(galleryId).length;
            const nextImage = self._getImage(galleryId, nextIndex);
            nextImage.title = lightboxElement.getAttribute('data-cc-title');
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
        }, false);

    };
};

export default CCImageLightbox;
import './ccImageLightbox.css';

class CCImageLightbox {
    constructor() {}

    ccCloseImageLightbox() {
        const lightboxWrapper = document.getElementsByClassName('cc-lightbox-wrapper');
        if (lightboxWrapper[0] !== undefined && lightboxWrapper[0] !== null) {
            lightboxWrapper[0].remove();
        }
    }

    ccOpenImageLightbox(galleryId, index) {
        this.ccCloseImageLightbox();
        this.ccCreateImageLightbox(galleryId, index);
    }

    ccCreateImageLightbox(galleryId, index) {
        const self = this;
        console.log('ccCreateImageLightbox() with ' + galleryId + ' ' + index);

        const lightboxStore = window.ccImageLightboxStore;
        var imgSrc = lightboxStore[galleryId][index].src;
        var title = lightboxStore[galleryId][index].title;
        var lightboxDiv  = document.createElement('div');
        lightboxDiv.setAttribute('class', 'cc-lightbox-wrapper');
        lightboxDiv.setAttribute('data-cc-lightbox-gallery-id', galleryId);
        lightboxDiv.onclick = function() {
            console.log('clicked');
            //this.remove();
        };
        const renderPreviousButton = function(galleryId, index) {
            const previousIndex = parseInt(index, 10) - 1;
            const button  = document.createElement('div');
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
        const renderNextButton = function(galleryId, index) {
            const nextIndex = parseInt(index, 10) + 1;
            const button  = document.createElement('div');
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

        const topBar  = document.createElement('div');
              topBar.setAttribute('class', 'cc-lightbox--top');
              topBar.innerHTML = '  <div class="cc-lightbox--top-title">' + title + '  </div>' +
                        '  <div class="cc-lightbox--top-close" onclick="this.parentNode.parentNode.remove()">' +
                        '  </div>';
        lightboxDiv.appendChild(topBar);
        lightboxDiv.appendChild(renderPreviousButton(galleryId, index));
        const image  = document.createElement('div');
              image.setAttribute('class', 'cc-lightbox--image');
              image.innerHTML = '  <div class="cc-lightbox--image-inner">' +
                '    <img src="' + imgSrc + '" class="cc-lightbox--image-img" />' +
                '  </div>';
        lightboxDiv.appendChild(image);
        lightboxDiv.appendChild(renderNextButton(galleryId, index));
        document.body.appendChild(lightboxDiv);
        return false;
    }

    init() {
        const self = this;
        const lightboxElements = document.querySelectorAll('[data-cc-lightbox]');
        window.ccImageLightboxStore = [];

        for (let i = 0; i < lightboxElements.length; i++) {
            const lightboxElement = lightboxElements[i];
            const galleryId = lightboxElement.getAttribute('data-cc-lightbox');
            const lightboxDataTitle = lightboxElement.getAttribute('data-cc-title');
            const lightboxImgSrc = lightboxElement.parentNode.getAttribute('href');

            //
            // FILL STORE
            //
            if (window.ccImageLightboxStore[galleryId] === undefined || window.ccImageLightboxStore[galleryId] === null) {
                window.ccImageLightboxStore[galleryId] = [];
            }
            const nextIndex = window.ccImageLightboxStore[galleryId].length;
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
        }

        //
        // CLOSE ON ESCAPE KEY PRESS
        //
        document.addEventListener('keydown', function (event) {
            if (event.keyCode === 27) {
                self.ccCloseImageLightbox();
            }
        }, false);

    };
};

export default CCImageLightbox;
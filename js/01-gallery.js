import { galleryItems } from './gallery-items.js';

/**
  |============================
  | Rendering Markup
  |============================
*/
const gallery = document.querySelector('ul.gallery');
gallery.insertAdjacentHTML(
  'afterbegin',
  galleryItems
    .map(
      ({ preview: smallImageLink, original: largeImageLink, description }) =>
        `<li class="gallery__item"><a class="gallery__link" href="${largeImageLink}"><img class="gallery__image" src="${smallImageLink}" data-source="${largeImageLink}" alt="${description}"/></a></li>`,
    )
    .join(''),
);

/**
  |============================
  | BasicLightbox initialization
  |============================
*/
const instance = basicLightbox.create(`<div class="modal"><img src=""></div>`, {
  onShow: instance => {
    window.addEventListener('keydown', escapeKeyPress);
  },
  onClose: instance => {
    window.removeEventListener('keydown', escapeKeyPress);
  },
});
// Close modal window when we click on image
instance.element().onclick = instance.close;

// Close modal window when we press Esc key: callback function
function escapeKeyPress(event) {
  if (event.code === 'Escape' && instance.visible()) {
    instance.close();
    return;
  }
}

/**
  |============================
  | Click event delegation
  |============================
*/
gallery.addEventListener('click', onImageClick);

// Show an Image in modal window when we click on the image: callback function
function onImageClick(event) {
  // Prevent default activity
  event.preventDefault();

  if (event.target.nodeName === 'IMG' && !instance.visible()) {
    instance.element().querySelector('img').src = event.target.dataset.source;
    instance.show();
    return;
  }
}

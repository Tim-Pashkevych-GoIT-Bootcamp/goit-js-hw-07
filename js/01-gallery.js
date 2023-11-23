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
  | Click event delegation
  |============================
*/
gallery.addEventListener('click', event => {
  const { target: targetElement } = event;

  // Prevent default activity
  event.preventDefault();

  if (targetElement.nodeName === 'IMG') {
    // Create a new instance of a modal window with an image
    basicLightbox
      .create(
        `<div class="modal"><img src="${targetElement.parentNode.href}"></div>`,
        {
          className: 'gallery-modal-window',
          onShow: instance => {
            instance.element().onclick = instance.close;
          },
        },
      )
      .show();
  }
});

/**
  |============================
  | Close modal window on pressing Escape button
  |============================
*/
document.addEventListener('keydown', event => {
  if (event.code === 'Escape' && basicLightbox.visible()) {
    const modalWindow = document.querySelector('.gallery-modal-window');
    basicLightbox
      .create(modalWindow, {
        onClose: instance => {
          // Чомусь не прибирається бекдроп, тому видаляю примусово
          modalWindow.remove();
        },
      })
      .close();
  }
});

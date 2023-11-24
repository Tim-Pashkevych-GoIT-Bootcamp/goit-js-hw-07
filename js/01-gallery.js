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
          onShow: instance => {
            // Якщо я це видаляю, то модальне вікно не закривається при кліку на картинку =(
            instance.element().onclick = instance.close;

            // можна не стрілочну використовувати а звичайну функцію?
            // я просто хочу щоб callback функція була "чистою" тобто передавати їй переміну instance
            document.addEventListener('keydown', function (event) {
              escapeKeyPress(event, instance);
            });
          },
          onClose: instance => {
            // Remove Event Listener
            document.removeEventListener('keydown', function (event) {
              escapeKeyPress(event, instance);
            });
          },
        },
      )
      .show();
  }
});

function escapeKeyPress(event, instance) {
  if (event.code === 'Escape' && instance.visible()) {
    instance.close();
  }
}

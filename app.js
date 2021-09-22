const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const refs = {
  gallery: document.querySelector('.js-gallery'),
  galleryImages: document.querySelectorAll('.gallery__image'),
  closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
  lightbox: document.querySelector('.lightbox'),
  backdrop: document.querySelector('.lightbox__overlay'),
  originalImage: document.querySelector('.lightbox__image'),
}

const galleryEl = createGalleryImages(galleryItems);
refs.gallery.insertAdjacentHTML('beforeend', galleryEl);

function createGalleryImages(galleryItems) {
  return galleryItems
    .map((galleryItem) => {
      return `<li class="gallery__item">
      <a class="gallery__link" href="${galleryItem.original}">
      <img class="gallery__image" src="${galleryItem.preview}" data-source="${galleryItem.original}" alt="${galleryItem.description}" data-index="${galleryItems.indexOf(galleryItem)}" />
      </a>
      </li>`;
    })
    .join('');
}

refs.gallery.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackDropClick);

function onOpenModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return
  }
  window.addEventListener('keydown', onKeyPress);
  refs.lightbox.classList.add('is-open');
  refs.originalImage.src = event.target.getAttribute('data-source');
  refs.originalImage.alt = event.target.alt;
}


function onCloseModal(event) {
  window.removeEventListener('keydown', onKeyPress);
  refs.lightbox.classList.remove('is-open');
  refs.originalImage.removeAttribute('src');
  refs.originalImage.removeAttribute('alt');
}

function onBackDropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onKeyPress(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
  if (event.code === 'ArrowRight') {
    let position = 0;
    for (let i = 0; i <= galleryItems.length - 1; i++) {
      if (galleryItems[i].original === refs.originalImage.src) {
        position = i;
        if (position >= galleryItems.length - 1) {
          position = 0;
          refs.originalImage.src = galleryItems[position].original;
          refs.originalImage.alt = galleryItems[position].description;
          return;
        }
        refs.originalImage.src = galleryItems[position + 1].original;
        refs.originalImage.alt = galleryItems[position + 1].description;
        return;
      }
    }
  }
  if (event.code === 'ArrowLeft') {
    let position = 0;
    for (let i = 0; i <= galleryItems.length - 1; i++) {
      if (galleryItems[i].original === refs.originalImage.src) {
        position = i;
        if (position < 1) {
          position = galleryItems.length - 1;
          refs.originalImage.src = galleryItems[position].original;
          refs.originalImage.alt = galleryItems[position].description;
          return;
        } 
        refs.originalImage.src = galleryItems[position - 1].original;
        refs.originalImage.alt = galleryItems[position - 1].description;
        return;
      }
    }
  }
}
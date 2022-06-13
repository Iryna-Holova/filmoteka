// функционал отправки карточки в хранилище по клику на кнопки

const modalGalleryRefs = {
  addToWatchedBtn: document.querySelector('.modal-button'),
  addToQueueBtn: document.querySelector('.modal-button__queue'),
};

addToWatchedBtn.addEventListener('click', onAddWatched);
addToQueueBtn.addEventListener('click', onAddQueue);

// function onAddWatched(e) {}

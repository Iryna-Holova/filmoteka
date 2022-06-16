// функционал отправки карточки в хранилище по клику на кнопки
const modalRefs = {
  modalBtnListener: document.querySelector('.modal-gallery'),
};

const obj = {};
modalRefs.modalBtnListener.addEventListener('click', onModalBtnClick);

function onModalBtnClick(e) {
  if (e.target.className === 'button modal-gallery-button') {
    localStorage.setItem('watched', JSON.stringify(obj));
  } else if (e.target.className === 'modal-gallery-button__queue') {
    localStorage.setItem('queue', JSON.stringify(obj));
  }
}

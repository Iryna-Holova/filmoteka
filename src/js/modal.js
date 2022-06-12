// функционал открытия-закрытия модального окна, используется дя карточки фильма и в футере

const refs = {
  closeBtn: document.querySelector('.modal__close'),
  modal: document.querySelector('.modal'),
};
console.log(refs.closeBtn);

refs.closeBtn.addEventListener('click', onCloseBtnCLick);

function onCloseBtnCLick(e) {
  return refs.modal.classList.toggle('modal__shown');
}

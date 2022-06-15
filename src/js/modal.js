// функционал открытия-закрытия модального окна, используется дя карточки фильма и в футере
import MicroModal from 'micromodal';
import '../sass/base/_modal.scss';

export const openModal = id => {
  MicroModal.show(id, { disableScroll: true, disableFocus: true });
};

// ***** in js file example

// import { openModal } from './modal';

// const element = document.querySelector('SELECTOR');

// element.addEventListener('click', () => {
//   openModal('ID_OF_MODAL');
// });

// ***** base markup of modal

// <div class="micromodal-slide" id="ID_OF_MODAL" aria-hidden="true">
//   <div class="modal__overlay" tabindex="-1" data-micromodal-close>
//     <div
//       class="modal__container ENY__CLASS__YOU__NEED"
//       role="dialog"
//       aria-modal="true"
//       aria-labelledby="ID_OF_MODAL-title"
//     >
//       -------- START OF BODY
//       <button class="" aria-label="Close modal" data-micromodal-close></button>
//       -------- END OF BODY
//     </div>
//   </div>
// </div>;


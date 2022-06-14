// функционал открытия-закрытия модального окна, используется дя карточки фильма и в футере
import MicroModal from 'micromodal';
import '../sass/base/_modal.scss';

export const openModal = id => {
  MicroModal.show(id);
};

// ***** in js file example

// import { openModal } from './modal';

// const element = document.querySelector('SELECTOR');

// element.addEventListener('click', () => {
//   openModal('ID_OF_MODAL');
// });

// ***** base markup of modal

// <div class="ENY__CLASS__YOU__NEED micromodal-slide" aria-hidden="true" id="ID_OF_MODAL">
//   <div class="modal__overlay" tabindex="-1" data-micromodal-close>
//     <div>
//       <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
//          -------- START OF BODY
//         <button class="" aria-label="Close modal" data-micromodal-close>
//         </button>
//          -------- END OF BODY
//       </div>
//     </div>
//   </div>
// </div>;



const gallery = document.querySelector('.film-list');

gallery.addEventListener('click', (event => {
        if (event.target.nodeName === 'UL') return;
        // const id = event.target.closest('.film-list__item').getAttribute('data-id');
        openModal("modal_gallery")
    }));
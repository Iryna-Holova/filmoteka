import { openModal } from './modal';

const footerLink = document.querySelector('.footer__link');

footerLink.addEventListener('click', () => {
  openModal('modal_footer');
});

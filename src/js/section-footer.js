// скрипт футера - запускиет открытие модалки при нажатии на GoIT Students, импортирован в index.js

import { openModal } from './modal';

const footerLink = document.querySelector('.footer__link');

footerLink.addEventListener('click', () => {
  openModal('modal_footer');
});

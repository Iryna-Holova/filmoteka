import DataBase from './cloud-firestore';
const userThemeBase = new DataBase();

export const toggleRefs = {
  headerToggleThumb: document.querySelector('.header__theme-thumb'),
  headerToggleBtn: document.querySelector('.header__theme-toggle'),
  bodyTheme: document.querySelector('body'),
  // footerTheme: document.querySelector('footer'),
  // filmListTitleTheme: document.querySelector('.film-list__title'),
  // footerTextTheme: document.querySelector('.footer-text'),
  // footerLinkTheme: document.querySelector('.footer__link'),
  // footerTextSpanTheme: document.querySelector('.footer-text-span'),
  // contextBoxDescriptionTheme: document.querySelector('.contentBox__description'),
  // modalGalleryFlexThumbTheme: document.querySelector('.modal-gallery__flex-thumb'),
  // teamContainerTheme: document.querySelector('.modal__container.team-container'),
  // modalGalleryTitleTheme: document.querySelector('.modal-gallery__title'),
  // modalGalleryListPopTheme: document.querySelector(
  //   '.modal-gallery-list__popularity.modal-gallery-item__value',
  // ),
  // modalGalleryListTitleTheme: document.querySelector(
  //   '.modal-gallery-list__title.modal-gallery-item__value',
  // ),
  // modalGalleryListGenreTheme: document.querySelector(
  //   '.modal-gallery-list__genre.modal-gallery-item__value',
  // ),
  // modalGalleryListAboutTextTheme: document.querySelector('.modal-gallery-about__text'),
  // modalGalleryListAboutTitleTheme: document.querySelector('.modal-gallery-about__title'),
  // modalIconCrossTheme: document.querySelector('.modal__icon_cross'),
};

toggleRefs.headerToggleThumb.addEventListener('click', onHeaderToggleBtnClick);

function onHeaderToggleBtnClick() {
  toggleRefs.headerToggleBtn.classList.toggle('night');
  toggleRefs.bodyTheme.classList.toggle('night');
  // toggleRefs.footerTheme.classList.toggle('night');
  // toggleRefs.filmListTitleTheme.classList.toggle('night');
  // toggleRefs.footerTextTheme.classList.toggle('night');
  // toggleRefs.footerLinkTheme.classList.toggle('night');
  // toggleRefs.footerTextSpanTheme.classList.toggle('night');
  // toggleRefs.contextBoxDescriptionTheme.classList.toggle('night');
  // toggleRefs.modalGalleryFlexThumbTheme.classList.toggle('night');
  // toggleRefs.teamContainerTheme.classList.toggle('night');
  // toggleRefs.modalGalleryTitleTheme.classList.toggle('night');
  // toggleRefs.modalGalleryListPopTheme.classList.toggle('night');
  // toggleRefs.modalGalleryListTitleTheme.classList.toggle('night');
  // toggleRefs.modalGalleryListGenreTheme.classList.toggle('night');
  // toggleRefs.modalGalleryListAboutTextTheme.classList.toggle('night');
  // toggleRefs.modalGalleryListAboutTitleTheme.classList.toggle('night');
  // toggleRefs.modalIconCrossTheme.classList.toggle('night');
  if (toggleRefs.headerToggleBtn.classList.contains('night')) {
    userThemeBase.userIdPromise
      .then(userId => {
        userThemeBase.changeTheme(userId, 'night');
      })
      .catch(error => {
        console.log(error);
      });
  }
  if (!toggleRefs.headerToggleBtn.classList.contains('night')) {
    userThemeBase.userIdPromise
      .then(userId => {
        userThemeBase.changeTheme(userId, 'day');
      })
      .catch(error => {
        console.log(error);
      });
  }
}

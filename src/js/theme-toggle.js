// const refs = {
//   headerToggleThumb: document.querySelector('.header__theme-thumb'),
//   headerToggleBtn: document.querySelector('.header__theme-toggle'),
//   // bodyTheme: document.querySelector('body'),
//   // footerTheme: document.querySelector('footer'),
//   // filmListTitleTheme: document.querySelector('.film-list__title'),
//   // footerTextTheme: document.querySelector('.footer-text'),
//   // footerLinkTheme: document.querySelector('.footer__link'),
//   // footerTextSpanTheme: document.querySelector('.footer-text-span'),
//   // contextBoxDescriptionTheme: document.querySelector('.contentBox__description'),
//   // modalGalleryFlexThumbTheme: document.querySelector('.modal-gallery__flex-thumb'),
//   // teamContainerTheme: document.querySelector('.modal__container.team-container'),
//   // modalGalleryTitleTheme: document.querySelector('.modal-gallery__title'),
//   // modalGalleryListPopTheme: document.querySelector(
//   //   '.modal-gallery-list__popularity.modal-gallery-item__value',
//   // ),
//   // modalGalleryListTitleTheme: document.querySelector(
//   //   '.modal-gallery-list__title.modal-gallery-item__value',
//   // ),
//   // modalGalleryListGenreTheme: document.querySelector(
//   //   '.modal-gallery-list__genre.modal-gallery-item__value',
//   // ),
//   // modalGalleryListAboutTextTheme: document.querySelector('.modal-gallery-about__text'),
//   // modalGalleryListAboutTitleTheme: document.querySelector('.modal-gallery-about__title'),
//   // modalIconCrossTheme: document.querySelector('.modal__icon_cross'),
// };

// refs.headerToggleThumb.addEventListener('click', onHeaderToggleBtnClick);

// function onHeaderToggleBtnClick() {
//   console.log(userDataBase);
//   // refs.headerToggleBtn.classList.toggle('night');
//   // refs.bodyTheme.classList.toggle('night');
//   // // refs.footerTheme.classList.toggle('night');
//   // // refs.filmListTitleTheme.classList.toggle('night');
//   // // refs.footerTextTheme.classList.toggle('night');
//   // // refs.footerLinkTheme.classList.toggle('night');
//   // // refs.footerTextSpanTheme.classList.toggle('night');
//   // // refs.contextBoxDescriptionTheme.classList.toggle('night');
//   // // refs.modalGalleryFlexThumbTheme.classList.toggle('night');
//   // // refs.teamContainerTheme.classList.toggle('night');
//   // // refs.modalGalleryTitleTheme.classList.toggle('night');
//   // // refs.modalGalleryListPopTheme.classList.toggle('night');
//   // // refs.modalGalleryListTitleTheme.classList.toggle('night');
//   // // refs.modalGalleryListGenreTheme.classList.toggle('night');
//   // // refs.modalGalleryListAboutTextTheme.classList.toggle('night');
//   // // refs.modalGalleryListAboutTitleTheme.classList.toggle('night');
//   // // refs.modalIconCrossTheme.classList.toggle('night');
//   // if (refs.headerToggleBtn.classList.contains('night')) {
//   //   themeDataBase.userIdPromise
//   //     .then(userId => {
//   //       themeDataBase.changeTheme(userId, 'night');
//   //     })
//   //     .catch(error => {
//   //       console.log(error);
//   //     });
//   // }
//   // if (!refs.headerToggleBtn.classList.contains('night')) {
//   //   themeDataBase.userIdPromise
//   //     .then(userId => {
//   //       themeDataBase.changeTheme(userId, 'day');
//   //     })
//   //     .catch(error => {
//   //       console.log(error);
//   //     });
//   // }
// }

// // export function userThemeDefaultLoader() {
// //   themeDataBase.userIdPromise
// //     .then(userId => {
// //       themeDataBase
// //         .getTheme(userId)
// //         .then(theme => {
// //           if (theme === 'day') {
// //             return;
// //           }
// //           if (theme === 'night') {
// //             refs.headerToggleBtn.classList.toggle('night');
// //             refs.bodyTheme.classList.toggle('night');
// //             // refs.footerTheme.classList.toggle('night');
// //             // refs.filmListTitleTheme.classList.toggle('night');
// //             // refs.footerTextTheme.classList.toggle('night');
// //             // refs.footerLinkTheme.classList.toggle('night');
// //             // refs.footerTextSpanTheme.classList.toggle('night');
// //             // refs.contextBoxDescriptionTheme.classList.toggle('night');
// //             // refs.modalGalleryFlexThumbTheme.classList.toggle('night');
// //             // refs.teamContainerTheme.classList.toggle('night');
// //             // refs.modalGalleryTitleTheme.classList.toggle('night');
// //             // refs.modalGalleryListPopTheme.classList.toggle('night');
// //             // refs.modalGalleryListTitleTheme.classList.toggle('night');
// //             // refs.modalGalleryListGenreTheme.classList.toggle('night');
// //             // refs.modalGalleryListAboutTextTheme.classList.toggle('night');
// //             // refs.modalGalleryListAboutTitleTheme.classList.toggle('night');
// //             // refs.modalIconCrossTheme.classList.toggle('night');
// //           }
// //         })
// //         .catch(error => {
// //           console.log(error);
// //         });
// //     })
// //     .catch(error => {
// //       console.log(error);
// //     });
// // }

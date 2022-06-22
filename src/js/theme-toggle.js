import DataBase from './cloud-firestore';
const userThemeBase = new DataBase();

export const toggleRefs = {
  headerToggleThumb: document.querySelector('.header__theme-thumb'),
  headerToggleBtn: document.querySelector('.header__theme-toggle'),
  bodyTheme: document.querySelector('body'),
  footerTheme: document.querySelector('footer'),
  // filmListTitleTheme: document.querySelector('.film-list__title'),
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
  toggleRefs.footerTheme.classList.toggle('night');
  // toggleRefs.filmListTitleTheme.classList.toggle('night');
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

function userThemeDefault() {
  if (userThemeBase.userIdPromise) {
    userThemeBase.userIdPromise
      .then(userId => {
        userThemeBase
          .getTheme(userId)
          .then(theme => {
            if (theme === 'day') {
              return;
            }
            if (theme === 'night' && !toggleRefs.headerToggleBtn.classList.contains('night')) {
              toggleRefs.headerToggleBtn.classList.add('night');
              toggleRefs.bodyTheme.classList.add('night');
              toggleRefs.footerTheme.classList.add('night');
              // toggleRefs.filmListTitleTheme.classList.add('night');
              // toggleRefs.contextBoxDescriptionTheme.classList.add('night');
              // toggleRefs.modalGalleryFlexThumbTheme.classList.add('night');
              // toggleRefs.teamContainerTheme.classList.add('night');
              // toggleRefs.modalGalleryTitleTheme.classList.add('night');
              // toggleRefs.modalGalleryListPopTheme.classList.add('night');
              // toggleRefs.modalGalleryListTitleTheme.classList.add('night');
              // toggleRefs.modalGalleryListGenreTheme.classList.add('night');
              // toggleRefs.modalGalleryListAboutTextTheme.classList.add('night');
              // toggleRefs.modalGalleryListAboutTitleTheme.classList.add('night');
              // toggleRefs.modalIconCrossTheme.classList.add('night');
            }
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }
}

userThemeDefault();

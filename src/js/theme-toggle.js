import DataBase from './cloud-firestore';
const userThemeBase = new DataBase();

export const toggleRefs = {
  headerToggleThumb: document.querySelector('.header__theme-thumb'),
  headerToggleBtn: document.querySelector('.header__theme-toggle'),
  htmlTheme: document.querySelector('html'),
  bodyTheme: document.querySelector('body'),
  footerTheme: document.querySelector('footer'),
  galleryTheme: document.querySelector('.gallery'),
  modalContainerTheme: document.querySelector('.modal__container'),
};

toggleRefs.headerToggleThumb.addEventListener('click', onHeaderToggleBtnClick);

function onHeaderToggleBtnClick() {
  toggleRefs.headerToggleBtn.classList.toggle('night');
  toggleRefs.bodyTheme.classList.toggle('night');
  toggleRefs.htmlTheme.classList.toggle('night');
  toggleRefs.footerTheme.classList.toggle('night');
  toggleRefs.galleryTheme.classList.toggle('night');
  toggleRefs.modalContainerTheme.classList.toggle('night');
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
              toggleRefs.galleryTheme.classList.add('night');
              toggleRefs.modalContainerTheme.classList.add('night');
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

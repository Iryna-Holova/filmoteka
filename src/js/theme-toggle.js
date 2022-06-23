import DataBase from './cloud-firestore';
const userThemeBase = new DataBase();

export const toggleRefs = {
  headerToggleThumb: document.querySelector('.header__theme-thumb'),
  headerToggleBtn: document.querySelector('.header__theme-toggle'),
  htmlTheme: document.querySelector('html'),
  bodyTheme: document.querySelector('body'),
  footerTheme: document.querySelector('footer'),
  galleryTheme: document.querySelector('.gallery'),
  modalContainerTheme: document.querySelectorAll('.modal__container'),
  modalFooterTextTheme: document.querySelectorAll('.contentBox__description'),
}

toggleRefs.headerToggleThumb.addEventListener('click', onHeaderToggleBtnClick);

function onHeaderToggleBtnClick() {
  switchTheme();
  if (toggleRefs.headerToggleBtn.classList.contains('night')) {
    localStorage.setItem('theme', 'night');
    userThemeBase.userIdPromise
      .then(userId => {
        userThemeBase.changeTheme(userId, 'night');
      })
      .catch(error => {
        console.log(error);
      });
  }

  if (!toggleRefs.headerToggleBtn.classList.contains('night')) {
    localStorage.setItem('theme', 'day');
    userThemeBase.userIdPromise
      .then(userId => {
        userThemeBase.changeTheme(userId, 'day');
      })
      .catch(error => {
        console.log(error);
      });
  }
}

function switchTheme() {
  toggleRefs.headerToggleBtn.classList.toggle('night');
  toggleRefs.bodyTheme.classList.toggle('night');
  toggleRefs.htmlTheme.classList.toggle('night');
  toggleRefs.footerTheme.classList.toggle('night');
  toggleRefs.galleryTheme.classList.toggle('night');
  toggleRefs.modalContainerTheme.forEach(item => item.classList.toggle('night'));
  toggleRefs.modalFooterTextTheme.forEach(item => item.classList.toggle('night'));
}

export function userThemeDefault() {
  if (localStorage.getItem('theme') === 'night') {
    switchTheme();
    return;
  } else if (userThemeBase.userIdPromise) {
    userThemeBase.userIdPromise
      .then(userId => {
        userThemeBase
          .getTheme(userId)
          .then(theme => {
            if (theme === 'day') {
              return;
            }
            if (theme === 'night' && !toggleRefs.headerToggleBtn.classList.contains('night')) {
              localStorage.setItem('theme', 'night');
              switchTheme();
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
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
  headerLibrary: document.querySelector('[data-page="library"]'),
};

toggleRefs.headerToggleThumb.addEventListener('click', onHeaderToggleBtnClick);

function onHeaderToggleBtnClick() {
  switchTheme();
  let userLogout = toggleRefs.headerLibrary.classList.contains('is-hidden');
  if (userLogout) {
    if (toggleRefs.headerToggleBtn.classList.contains('night')) {
      localStorage.setItem('theme', 'night');
    }
    if (!toggleRefs.headerToggleBtn.classList.contains('night')) {
      localStorage.setItem('theme', 'day');
    }
  }
  if (!userLogout) {
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
}

function switchTheme() {
  toggleRefs.headerToggleBtn.classList.toggle('night');
  toggleRefs.bodyTheme.classList.toggle('night');
  toggleRefs.htmlTheme.classList.toggle('night');
  toggleRefs.footerTheme.classList.toggle('night');
  toggleRefs.galleryTheme.classList.toggle('night');
  toggleRefs.modalContainerTheme.classList.toggle('night');
}

export function userThemeDefault() {
  let userLogout = toggleRefs.headerLibrary.classList.contains('is-hidden');
  if (userLogout) {
    if (localStorage.getItem('theme') === 'night') {
      switchTheme();
    }
  }
  if (!userLogout) {
    userThemeBase.userIdPromise
      .then(userId => {
        userThemeBase
          .getTheme(userId)
          .then(theme => {
            if (theme === 'day' && toggleRefs.headerToggleBtn.classList.contains('night')) {
              switchTheme();
              localStorage.setItem('theme', 'day');
            }
            if (theme === 'night' && !toggleRefs.headerToggleBtn.classList.contains('night')) {
              switchTheme();
              localStorage.setItem('theme', 'night');
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

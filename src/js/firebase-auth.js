import { initializeApp } from 'firebase/app';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import Header from './section-header';
const header = new Header();
import Gallery from './section-gallery';
const gallery = new Gallery();

let userPromiseResolve;

export const userPromise = new Promise((res, rej) => {
  userPromiseResolve = res;
});
// // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCU6_agc0gRhFJSbUVpiyKOJT5Ax6DL3KA',
  authDomain: 'filmoteka-bc120.firebaseapp.com',
  projectId: 'filmoteka-bc120',
  storageBucket: 'filmoteka-bc120.appspot.com',
  messagingSenderId: '495169374192',
  appId: '1:495169374192:web:0d8fac205d62fd05b8bf35',
};

export const defaultCell = {
  theme: 'day',
  watched: [],
  queue: [],
};

async function setDefaultCell(userId) {
  try {
    const cellRef = doc(db, 'users', userId);
    const docSnap = await getDoc(cellRef);
    if (!docSnap.exists()) {
      await setDoc(doc(db, 'users', userId), defaultCell);
    } else {
      return false;
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function getTheme(userId) {
  const cellRef = doc(db, 'users', userId);
  const docSnap = await getDoc(cellRef);

  if (docSnap.exists()) {
    return docSnap.data().theme;
  } else {
    return false;
  }
}

function userThemeDefaultLoader() {
  userPromise
    .then(userId => {
      getTheme(userId)
        .then(theme => {
          if (theme === 'day') {
            return;
          }
          if (theme === 'night') {
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

function setDefaultTheme() {
  toggleRefs.headerToggleBtn.classList.remove('night');
  toggleRefs.bodyTheme.classList.remove('night');
  //   toggleRefs.footerTheme.classList.remove('night');
  //   toggleRefs.filmListTitleTheme.classList.remove('night');
  //   toggleRefs.footerTextTheme.classList.remove('night');
  //   toggleRefs.footerLinkTheme.classList.remove('night');
  //   toggleRefs.footerTextSpanTheme.classList.remove('night');
  //   toggleRefs.contextBoxDescriptionTheme.classList.remove('night');
  //   toggleRefs.modalGalleryFlexThumbTheme.classList.remove('night');
  //   toggleRefs.teamContainerTheme.classList.remove('night');
  //   toggleRefs.modalGalleryTitleTheme.classList.remove('night');
  //   toggleRefs.modalGalleryListPopTheme.classList.remove('night');
  //   toggleRefs.modalGalleryListTitleTheme.classList.remove('night');
  //   toggleRefs.modalGalleryListGenreTheme.classList.remove('night');
  //   toggleRefs.modalGalleryListAboutTextTheme.classList.remove('night');
  //   toggleRefs.modalGalleryListAboutTitleTheme.classList.remove('night');
  //   toggleRefs.modalIconCrossTheme.classList.remove('night');
}

function goHomePageDefault() {
  header.showHome();
  gallery.showHome();
}

const toggleRefs = {
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

const refs = {
  authFormLogin: document.querySelector('#login'),
  authFormSignin: document.querySelector('#register'),
  loginBtn: document.querySelector('[data-page="log-in"]'),
  logOutBtn: document.querySelector('[data-page="log-out"]'),
  libraryBtn: document.querySelector('[data-page="library"]'),
  googleAuth: document.querySelector('[data-link="google"]'),
};

refs.authFormLogin.addEventListener('submit', onLoginFormSubmit);
refs.authFormSignin.addEventListener('submit', onSigninFormSubmit);
refs.logOutBtn.addEventListener('click', onLogOutBtnClick);
refs.googleAuth.addEventListener('click', onGoogleAuthClick);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, user => {
  if (user) {
    const uid = user.uid;
    userPromiseResolve(uid);
    if (refs.loginBtn.classList.contains('is-hidden')) {
      return;
    } else {
      refs.loginBtn.classList.toggle('is-hidden');
      refs.logOutBtn.classList.toggle('is-hidden');
      refs.libraryBtn.classList.toggle('is-hidden');
    }
  }
});

function onGoogleAuthClick() {
  signInWithPopup(auth, provider)
    .then(result => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      MicroModal.close('auth');

      Notify.success(`Welcome ${user.email}! Enjoy our service`, { timeout: 2000 });

      userPromise
        .then(userId => {
          setDefaultCell(userId);
        })
        .catch(error => {
          console.log(error.message);
        });
      userThemeDefaultLoader();
    })
    .catch(error => {
      // // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // // The email of the user's account used.
      // const email = error.customData.email;
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // console.log(errorCode);
      // console.log(errorMessage);
      // console.log(email);
      // console.log(credential);
      console.log(error);
    });
}

function onLoginFormSubmit(e) {
  e.preventDefault();

  signInWithEmailAndPassword(
    auth,
    e.currentTarget.elements.email.value.trim(),
    e.currentTarget.elements.password.value.trim(),
  )
    .then(userCredential => {
      const user = userCredential.user;
      MicroModal.close('auth');

      Notify.success(`Welcome back ${user.email}!`, { timeout: 1000 });

      userThemeDefaultLoader();
    })
    .catch(error => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // console.log(errorCode);
      // console.log(errorMessage);

      Notify.failure('User does not exist, or wrong password!', { timeout: 2000 });
    });
}

function onSigninFormSubmit(e) {
  e.preventDefault();

  if (e.currentTarget.elements.password.value.trim().length < 6) {
    Notify.failure('To small password... It must contain 6 characters', { timeout: 2000 });
  } else {
    createUserWithEmailAndPassword(
      auth,
      e.currentTarget.elements.email.value.trim(),
      e.currentTarget.elements.password.value.trim(),
    )
      .then(userCredential => {
        const user = userCredential.user;
        MicroModal.close('auth');
        Notify.success(`Welcome ${user.email}! Enjoy our service`, { timeout: 2000 });
        userPromise
          .then(userId => {
            setDefaultCell(userId);
          })
          .catch(error => {
            console.log(error.message);
          });
      })

      .catch(error => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // console.log(errorCode);
        // console.log(errorMessage);
        Notify.failure('User exists or invalid values...', { timeout: 2000 });
      });
  }
}

function onLogOutBtnClick() {
  Confirm.show(
    'Log Out Confirm',
    'Do you want to log out?',
    'Yes',
    'No',
    function okCb() {
      signOut(auth)
        .then(() => {
          if (refs.loginBtn.classList.contains('is-hidden')) {
            refs.loginBtn.classList.toggle('is-hidden');
            refs.logOutBtn.classList.toggle('is-hidden');
            refs.libraryBtn.classList.toggle('is-hidden');
            Notify.info(`Come back soon!!!`, { timeout: 1000 });
            setDefaultTheme();
            goHomePageDefault();
          } else {
            return;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    function cancelCb() {
      Notify.success('Good choice!', { timeout: 1000 });
    },
    {
      borderRadius: '3px',
      cssAnimationStyle: 'zoom',
      titleColor: '#000',
      fontFamily: 'Roboto',
      okButtonBackground: '#FF6B01',
    },
  );
}

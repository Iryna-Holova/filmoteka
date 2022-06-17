import { initializeApp } from 'firebase/app';
import Notiflix from 'notiflix';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

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

// // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCU6_agc0gRhFJSbUVpiyKOJT5Ax6DL3KA',
  authDomain: 'filmoteka-bc120.firebaseapp.com',
  projectId: 'filmoteka-bc120',
  storageBucket: 'filmoteka-bc120.appspot.com',
  messagingSenderId: '495169374192',
  appId: '1:495169374192:web:0d8fac205d62fd05b8bf35',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

onAuthStateChanged(auth, user => {
  if (user) {
    const uid = user.uid;
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

      Notiflix.Notify.success(`Welcome ${user.email}! Enjoy our service`, { timeout: 2000 });
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode);
      console.log(errorMessage);
      console.log(email);
      console.log(credential);
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

      Notiflix.Notify.success(`Welcome back ${user.email}!`, { timeout: 1000 });
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Notiflix.Notify.failure('User does not exist, or wrong password!', { timeout: 2000 });
    });
}

function onSigninFormSubmit(e) {
  e.preventDefault();

  if (e.currentTarget.elements.password.value.trim().length < 6) {
    Notiflix.Notify.failure('To small password... It must contain 6 characters', { timeout: 2000 });
  } else {
    createUserWithEmailAndPassword(
      auth,
      e.currentTarget.elements.email.value.trim(),
      e.currentTarget.elements.password.value.trim(),
    )
      .then(userCredential => {
        const user = userCredential.user;
        MicroModal.close('auth');
        Notiflix.Notify.success(`Welcome ${user.email}! Enjoy our service`, { timeout: 2000 });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Notiflix.Notify.failure('User exists or invalid values...', { timeout: 2000 });
      });
  }
}

function onLogOutBtnClick() {
  Notiflix.Confirm.show(
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
            Notiflix.Notify.info(`Come back soon!!!`, { timeout: 1000 });
          } else {
            return;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    function cancelCb() {
      Notiflix.Notify.success('Good choice!', { timeout: 1000 });
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

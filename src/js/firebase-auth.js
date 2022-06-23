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
import { userThemeDefault } from './theme-toggle';
const header = new Header();
// import { userThemeDefault } from './theme-toggle';

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
    header.homeBtn.click();
    if (!localStorage.getItem('theme')) userThemeDefault();
    if (refs.loginBtn.classList.contains('is-hidden')) {
      return;
    } else {
      refs.loginBtn.classList.toggle('is-hidden');
      refs.logOutBtn.classList.toggle('is-hidden');
      refs.libraryBtn.classList.toggle('is-hidden');
    }
  } else header.homeBtn.click();
});

async function getTheme(userId) {
  const cellRef = doc(db, 'users', userId);
  const docSnap = await getDoc(cellRef);
  if (docSnap.exists()) {
    return docSnap.data().theme;
  } else {
    return false;
  }
}

function onGoogleAuthClick() {
  signInWithPopup(auth, provider)
    .then(result => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      MicroModal.close('auth');
      Notify.success(`Welcome ${user.email}! Enjoy our service`);

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
      // const email = error.customData.email;
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
      Notify.success(`Welcome back ${user.email}!`);
    })
    .catch(error => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // console.log(errorCode);
      // console.log(errorMessage);
      Notify.failure('User does not exist, or wrong password!');
    });
}

function onSigninFormSubmit(e) {
  e.preventDefault();

  if (e.currentTarget.elements.password.value.trim().length < 6) {
    Notify.failure('To small password... It must contain 6 characters');
  } else {
    createUserWithEmailAndPassword(
      auth,
      e.currentTarget.elements.email.value.trim(),
      e.currentTarget.elements.password.value.trim(),
    )
      .then(userCredential => {
        const user = userCredential.user;
        MicroModal.close('auth');
        Notify.success(`Welcome ${user.email}! Enjoy our service`);
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
        Notify.failure('User exists or invalid values...');
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
            Notify.info(`Come back soon!!!`);
          } else {
            return;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    function cancelCb() {
      Notify.success('Good choice!');
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

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
// import { firebaseConfig } from './firebase-auth';
import { userPromise } from './firebase-auth';

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
const db = getFirestore(app);

export default class DataBase {
  constructor() {
    this.defaultCell = {
      theme: 'day',
      watched: [],
      queue: [],
    };
    this.userIdPromise = userPromise;
  }

  async setDefaultCell(userId) {
    try {
      await setDoc(doc(db, 'users', userId), this.defaultCell);
    } catch (error) {
      console.log(error.message);
    }
  }

  async changeTheme(userId, newTheme) {
    try {
      const cellRef = doc(db, 'users', userId);
      await updateDoc(cellRef, {
        theme: newTheme,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async addToWatched(userId, movieId) {
    try {
      const cellRef = doc(db, 'users', userId);
      await updateDoc(cellRef, {
        watched: arrayUnion(movieId),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async addToQueue(userId, movieId) {
    try {
      const cellRef = doc(db, 'users', userId);
      await updateDoc(cellRef, {
        queue: arrayUnion(movieId),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async removeFromWatched(userId, movieId) {
    try {
      const cellRef = doc(db, 'users', userId);
      await updateDoc(cellRef, {
        watched: arrayRemove(movieId),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async removeFromQueue(userId, movieId) {
    try {
      const objRef = doc(db, 'users', userId);
      await updateDoc(objRef, {
        queue: arrayRemove(movieId),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  //   Result of the function is a PROMISE!!!
  async isInWatched(userId, movieId) {
    const cellRef = doc(db, 'users', userId);
    const docSnap = await getDoc(cellRef);

    if (docSnap.exists()) {
      if (docSnap.data().watched.includes(movieId)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  //   Result of the function is a PROMISE!!!
  async isInQueve(userId, movieId) {
    const cellRef = doc(db, 'users', userId);
    const docSnap = await getDoc(cellRef);

    if (docSnap.exists()) {
      if (docSnap.data().queue.includes(movieId)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  //   Result of the function is a PROMISE!!!
  async getWatched(userId) {
    const cellRef = doc(db, 'users', userId);
    const docSnap = await getDoc(cellRef);

    if (docSnap.exists()) {
      return docSnap.data().watched;
    } else {
      return false;
    }
  }

  //   Result of the function is a PROMISE!!!
  async getQueue(userId) {
    const cellRef = doc(db, 'users', userId);
    const docSnap = await getDoc(cellRef);

    if (docSnap.exists()) {
      return docSnap.data().queue;
    } else {
      return false;
    }
  }

  //   Result of the function is a PROMISE!!!
  async getTheme(userId) {
    const cellRef = doc(db, 'users', userId);
    const docSnap = await getDoc(cellRef);

    if (docSnap.exists()) {
      return docSnap.data().theme;
    } else {
      return false;
    }
  }
}

// const myDataBase = new DataBase();

// const refs = {
//   addBtn: document.querySelector('.header-nav--current'),
// };

// const movieId = '123456789';

// refs.addBtn.addEventListener('click', onAddBtnClick);

// let filmId = '1234';

// function onAddBtnClick() {
//   myDataBase.userIdPromise
//     .then(userId => {
//       myDataBase.getTheme(userId).then(data => {
//         console.log(data);
//       });
//     })

//     .catch(error => {
//       console.log(error.message);
//     });
// }

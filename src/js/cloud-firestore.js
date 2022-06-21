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
import { userPromise, defaultCell } from './firebase-auth';

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
    this.defaultCell = defaultCell;
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

  async addToWatched(userId, movie) {
    try {
      const cellRef = doc(db, 'users', userId);
      await updateDoc(cellRef, {
        watched: arrayUnion(movie),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async addToQueue(userId, movie) {
    try {
      const cellRef = doc(db, 'users', userId);
      await updateDoc(cellRef, {
        queue: arrayUnion(movie),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async removeFromWatched(userId, movieId) {
    const cellRef = doc(db, 'users', userId);
    const docSnap = await getDoc(cellRef);

    if (docSnap.exists()) {
      const movieToRemove = docSnap.data().watched.find(movie => movie.id === Number(movieId));
      if (movieToRemove) {
        try {
          await updateDoc(cellRef, {
            watched: arrayRemove(movieToRemove),
          });
        } catch (error) {
          console.log(error.message);
        }
      }
    }
  }

  async removeFromQueue(userId, movieId) {
    const cellRef = doc(db, 'users', userId);
    const docSnap = await getDoc(cellRef);

    if (docSnap.exists()) {
      const movieToRemove = docSnap.data().queue.find(movie => movie.id === Number(movieId));
      if (movieToRemove) {
        try {
          await updateDoc(cellRef, {
            queue: arrayRemove(movieToRemove),
          });
        } catch (error) {
          console.log(error.message);
        }
      }
    }
  }

  //   Result of the function is a PROMISE!!!
  async isInWatched(userId, movieId) {
    const cellRef = doc(db, 'users', userId);
    const docSnap = await getDoc(cellRef);

    if (docSnap.exists()) {
      if (docSnap.data().watched.find(movie => movie.id === Number(movieId))) {
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
      if (docSnap.data().queue.find(movie => movie.id === Number(movieId))) {
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

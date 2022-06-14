// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
// } from 'firebase/auth';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyCU6_agc0gRhFJSbUVpiyKOJT5Ax6DL3KA',
//   authDomain: 'filmoteka-bc120.firebaseapp.com',
//   projectId: 'filmoteka-bc120',
//   storageBucket: 'filmoteka-bc120.appspot.com',
//   messagingSenderId: '495169374192',
//   appId: '1:495169374192:web:0d8fac205d62fd05b8bf35',
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);
// createUserWithEmailAndPassword(auth, 'macsym.dziubanchuk@gmail.com', '12345678')
//   .then(userCredential => {
//     // Signed in
//     const user = userCredential.user;
//     debugger;
//     // ...
//   })
//   .catch(error => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });

// signInWithEmailAndPassword(auth, 'macsym.dziubanchuk@gmail.com', '12345678')
//   .then(userCredential => {
//     // Signed in
//     const user = userCredential.user;
//     console.log(user);
//     // ...
//   })
//   .catch(error => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });

// onAuthStateChanged(auth, user => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     console.log(user);
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });

// signOut(auth).then(() => {
//     // Sign-out successful.
//   }).catch((error) => {
//     // An error happened.
//   });

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBH6QHAL-hZXLUx4dwLDk5Q4f7mpqsUgew",
    authDomain: "diagramming-web-app.firebaseapp.com",
    databaseURL: "https://diagramming-web-app.firebaseio.com",
    projectId: "diagramming-web-app",
    storageBucket: "diagramming-web-app.appspot.com",
    messagingSenderId: "2220019104",
    appId: "1:2220019104:web:57452769b734df4c0268c5"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var mSaves = {
    cloud: firebase.firestore()
};

// mSaves.cloud.collection("saves").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         console.log(doc.data());
//     });
// });

// mSaves.cloud.collection('saves').doc('LOL').get().then((docRef) => { console.log(docRef.data()) });
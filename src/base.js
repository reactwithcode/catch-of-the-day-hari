import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyC2EGEcGt8CgXgnYQ1S9uIntX1N_lBF57A',
	authDomain: 'catch-of-the-day-hari.firebaseapp.com',
	databaseURL: 'https://catch-of-the-day-hari-default-rtdb.firebaseio.com',
	projectId: 'catch-of-the-day-hari',
	storageBucket: 'catch-of-the-day-hari.appspot.com',
	messagingSenderId: '490272879357',
	appId: '1:490272879357:web:6309478f22cd617fac8494',
	measurementId: 'G-RZ7E1MVVEX',
});

const base = Rebase.createClass(firebaseApp.database());

// This si a named export
export { firebaseApp };

// This is a default export
export default base;

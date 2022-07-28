// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB0HgT6gKe8gWepw4CnTLpyg7H4KdC1JVQ",
    authDomain: "habit-tracker-eab1d.firebaseapp.com",
    projectId: "habit-tracker-eab1d",
    storageBucket: "habit-tracker-eab1d.appspot.com",
    messagingSenderId: "1026049864154",
    appId: "1:1026049864154:web:c2aa354c6bfb28c95e90e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider()
export async function SignInWithGoogle() {
    const res = await signInWithPopup(auth, provider);

    const userDataByGoogle = {
        ID: res.user.uid,
        name: res.user.displayName,
        email: res.user.email,
        emailVerified: res.user.emailVerified
    }

    return userDataByGoogle
}
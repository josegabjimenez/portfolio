import { getApps, initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GithubAuthProvider, signOut } from 'firebase/auth';
import 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

if (!getApps.length) {
  initializeApp(firebaseConfig);
  // getAnalytics();
}

const auth = getAuth();
const githubSignIn = async () => {
  try {
    await signInWithPopup(auth, new GithubAuthProvider());
    // const credential = GithubAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    // const user = result.user;
  } catch (err) {
    console.log('Something went wrong.');
    console.log(err);
  }
};

const logOut = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.log('Something went wrong.');
    console.log(err);
  }
};

export { auth, githubSignIn, logOut };

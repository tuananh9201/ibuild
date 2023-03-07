import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  User,
  fetchSignInMethodsForEmail,
  linkWithCredential,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const supportedPopupSignInMethods = [
  GoogleAuthProvider.PROVIDER_ID,
  FacebookAuthProvider.PROVIDER_ID,
];
interface SignInResult {
  user: User;
  provider: string;
  accessToken?: string;
}
function getProvider(providerId: string) {
  if (providerId === "google") {
    return googleProvider;
  }
  return facebookProvider;
}

export const signInWithProvider = async (
  provider: "google" | "facebook"
): Promise<string> => {
  try {
    const res: UserCredential = await signInWithPopup(
      auth,
      provider === "google" ? googleProvider : facebookProvider
    );
    const user = res.user;
    return await user.getIdToken();
  } catch (err: any) {
    console.log("********************");
    console.error(err);
    if (
      err.email &&
      err.code === "auth/account-exists-with-different-credential"
    ) {
      // const linkedProvider =
      //   provider === "google" ? facebookProvider : googleProvider;
      // linkedProvider.setCustomParameters({ login_hint: err.email });

      // const result = await signInWithPopup(auth, linkedProvider);
      // const user = result.user;
      // return await user.getIdToken();
      if (
        err.email &&
        err.credential &&
        err.code === "auth/account-exists-with-different-credential"
      ) {
        const linkedProvider = getProvider(provider);
        linkedProvider.setCustomParameters({ login_hint: err.email });

        const result = await signInWithPopup(auth, linkedProvider);
        const rs = await linkWithCredential(result.user, err.credential);
        console.log("Account linking success", rs);
        return await rs.user.getIdToken();
      }
    }
    throw err;
  }
};
export default app;

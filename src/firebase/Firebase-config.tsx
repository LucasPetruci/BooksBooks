import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtzHALgGDjjQLyGOs8J14Sxaf5adnFuXA",
  authDomain: "booksbooks-4df9c.firebaseapp.com",
  projectId: "booksbooks-4df9c",
  storageBucket: "booksbooks-4df9c.appspot.com",
  messagingSenderId: "476417412459",
  appId: "1:476417412459:web:8f01f5fd31d108c03dd02e",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

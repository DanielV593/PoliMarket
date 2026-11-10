import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjkZyKL-lUxvdSoUIQhsinAJRC14LXBgk",
  authDomain: "polimarket-2ac45.firebaseapp.com",
  projectId: "polimarket-2ac45",
  storageBucket: "polimarket-2ac45.firebasestorage.app",
  messagingSenderId: "131048902678",
  appId: "1:131048902678:web:f52035efdfc62c9cdde537"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
import { initializeApp, getApp, getApps } from "firebase/app"
import ReactNativeAsyncStore from "@react-native-async-storage/async-storage"
import { getAnalytics } from "firebase/analytics"
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore"
import { initializeAuth, getReactNativePersistence } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA4GDbTODh5NalCG-7O0chmF74nela4xjU",
  authDomain: "dandc-b3497.firebaseapp.com",
  projectId: "dandc-b3497",
  storageBucket: "dandc-b3497.firebasestorage.app",
  messagingSenderId: "1075282064497",
  appId: "1:1075282064497:web:0abf5ea3b8a6480db497d0",
  measurementId: "G-VK38MXXYW4"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app)
connectFirestoreEmulator(firestore, "192.168.1.11", 8080)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStore)
})
export { app, firestore, auth }



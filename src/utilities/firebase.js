import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { useState, useEffect, useCallback } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBh0ZT6KHiyK_gh4GsFTc00imFDJQ7HKYA",
  authDomain: "class-compass-83546.firebaseapp.com",
  databaseURL: "https://class-compass-83546-default-rtdb.firebaseio.com",
  projectId: "class-compass-83546",
  storageBucket: "class-compass-83546.appspot.com",
  messagingSenderId: "516854927870",
  appId: "1:516854927870:web:2ab47a09a5aaf66bacb0af",
  measurementId: "G-SN7CH7RK5R"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged };

export const useDbData = (path) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const dbRef = ref(database, path);

    const unsubscribe = onValue(dbRef, (snapshot) => {
      setData(snapshot.val());
      setIsLoading(false);
    }, (err) => {
      setError(err);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [path]);

  return { data, error, isLoading };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState(null);

  const updateData = useCallback((value) => {
    const dbRef = ref(database, path);
    update(dbRef, value)
      .then(() => setResult({ timestamp: Date.now(), error: null, message: `Updated successfully at ${new Date().toLocaleString()}` }))
      .catch((error) => setResult({ timestamp: Date.now(), error, message: error.message }));
  }, [database, path]);

  return [updateData, result];
};
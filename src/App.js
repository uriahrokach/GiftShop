import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore';

import React from 'react';
import Home from './pages/home';
// import './App.css';

const firebaseConfig = {
  apiKey: "AIzaSyCFNdWiyFguH_hCiGb_jc8nDL2-x3nOpLU",
  authDomain: "giftshop-2243d.firebaseapp.com",
  projectId: "giftshop-2243d",
  storageBucket: "giftshop-2243d.appspot.com",
  messagingSenderId: "27326949595",
  appId: "1:27326949595:web:45da994bcd2c27e37284fe",
  measurementId: "\${config.measurementId}"
};

initializeApp(firebaseConfig);
const firestore = getFirestore() 

function App() {
  console.log(collection(firestore, 'gifts'));
  return (
    <div className="App">
      <h1>
        Hello World!  
      </h1>
      <Home db={firestore} />
    </div>
  );
}

export default App;

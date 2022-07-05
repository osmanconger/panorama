import React, { useState } from "react";
import "./App.css";


function App() {

  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');

  const runWorker = (email, message) => {
    setStatus('pending');
    const worker = new window.Worker('./components/worker.js');

    worker.postMessage('email sending');
    worker.onerror = (err) => err;
    worker.onmessage = (e) => {
      // send email here
      worker.terminate();
    };
  };

  
  
  return (
    <div className="App">
      <h1>Panorama</h1>
      <p>The email sent to {email} is {status}.</p>
      <input 
        type="text" 
        id = "email"
        value = {email}
        onChange={(e) => setEmail(e.target.value)}/>

      <button
            id="submit-btn"
            className="btn-submit"
            onClick={() => {
              runWorker(email, "hello world");
            }}
          >
            Send email
          </button>
    </div>
  );
}

export default App;

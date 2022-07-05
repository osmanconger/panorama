import React, { useState } from "react";
import "./App.css";
import Worker from './components/worker';
import WorkerBuilder from './components/WorkerBuilder';


function App() {

  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');
  const [timeSent, setTime] = useState('');

  const runWorker = (toEmail, message) => {
    setStatus('pending');
    const worker = new WorkerBuilder(Worker);

    worker.postMessage({toEmail, message});
    worker.onerror = (err) => err;
    worker.onmessage = (e) => {
      const {success, time} = e.data;
      console.log(e.data);
      setStatus(success);
      setTime(time);
      worker.terminate();
    };
  };

  
  
  return (
    <div className="App">
      <h1>Panorama</h1>
      <p>The email sent to {email} is {status}. Time: {timeSent} </p>
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

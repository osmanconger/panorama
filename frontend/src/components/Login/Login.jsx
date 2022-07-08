import React, { useEffect, useState } from "react";

function Login() {
  const [errors, setErrors] = useState({});
  const [isSubmitted, setSubmit] = useState(false);
  
  const [user, setUser] = useState("");
  
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    //Prevent page reload
    e.preventDefault();
    const creds = { username: user, password: pass };

    // Fetch call to sign user in
    fetch(`http://localhost:5000/api/login`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(creds),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  };

  const renderErrorMessage = (message) =>
    (
      <div className="error">{message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="username" required onChange={e => setUser(e.target.value)} />
          {renderErrorMessage("incorrect credentials")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required onChange={e => setPass(e.target.value)}  />
          {renderErrorMessage("incorrect credentials")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return ( 
    <div className="Login">
      <h1> Log in to Panorama</h1>
      {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
    </div>
  );
}

export default Login;

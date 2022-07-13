import React, { useEffect, useState } from "react";

function Signup() {
  const [errors, setErrors] = useState({});
  const [isSubmitted, setSubmit] = useState(false);
  
  const [user, setUser] = useState("");
  
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");

  const handleSubmit = (e) => {
    //Prevent page reload
    e.preventDefault();

    if (pass2!=pass) {
      console.log("pass does not match");
      return;
    }
    const creds = { username: user, password: pass };

    // Fetch call to sign user in
    fetch(`http://localhost:5000/api/signup/`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(creds),
    })
    .then((res) => { 
      if (res.status != 200) {
        let error = "";
        if (res.status === 409) error = "username already taken";
        if (res.status === 401) error = "access denied";
        console.log(error);
      } else return res.json();
    })
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
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required onChange={e => setPass(e.target.value)}  />
        </div>
        <div className="input-container">
          <label>Confirm Password </label>
          <input type="password" name="pass2" required onChange={e => setPass2(e.target.value)}  />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return ( 
    <div className="Signup">
      <h1> Sign up for an account</h1>
      {isSubmitted ? <div>User is successfully signed up</div> : renderForm}
    </div>
  );
}

export default Signup;

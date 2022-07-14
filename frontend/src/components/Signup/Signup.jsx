import React, { useEffect, useState } from "react";
import { Button, TextField} from "@mui/material";
import "../Form.css";

function Signup() {
  const [errors, setErrors] = useState({});
  const [isSubmitted, setSubmit] = useState(false);
  
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");

  const handleSubmit = (e) => {
    //Prevent page reload
    e.preventDefault();

    if (pass2!=pass) {
      console.log("pass does not match");
      return;
    }
    const creds = { username: user, email: email, password: pass };

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
      alert("Successfully sign up. You may now log in.")
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  };

  const renderErrorMessage = (message) =>
    (
      <div className="error">{message}</div>
    );

  // JSX code for signup form
  const renderForm = (
    <div>
      <form onSubmit={handleSubmit} className = "form">
        <TextField
            variant="standard"
            placeholder="Enter username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
        />
        <br />
        <TextField
            variant="standard"
            type="password"
            placeholder="Enter password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
        />
        <br />
        <TextField
            variant="standard"
            type="password"
            placeholder="Confirm password"
            value={pass2}
            onChange={(e) => setPass2(e.target.value)}
        />
        <br />
        <Button variant="outlined" type="submit">
            Sign In
        </Button>
      </form>
    </div>
  );

  return ( 
    <div>
      <form onSubmit={handleSubmit} className = "form">
        <TextField
            variant="standard"
            placeholder="Enter username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
        />
        <br />
        <TextField
            variant="standard"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <TextField
            variant="standard"
            type="password"
            placeholder="Enter password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
        />
        <br />
        <TextField
            variant="standard"
            type="password"
            placeholder="Confirm password"
            value={pass2}
            onChange={(e) => setPass2(e.target.value)}
        />
        <br/>
        <Button variant="outlined" type="submit">
            Sign In
        </Button>
      </form>
    </div>
  );
}

export default Signup;

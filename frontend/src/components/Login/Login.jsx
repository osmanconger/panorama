import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

function Login() {
  const { user, setUser } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setSubmit] = useState(false);

  const [username, setUsername] = useState("");

  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    //Prevent page reload
    e.preventDefault();
    const creds = { username: username, password: pass };

    // Fetch call to sign user in
    fetch(`http://localhost:5000/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then((response) => response.json())
      //TODO: Possibly check status is ok before rendering
      .then((json) => {
        setUser({ id: json._id, name: json.username });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const renderErrorMessage = (message) => (
    <div className="error">{message}</div>
  );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            type="password"
            name="pass"
            value={pass}
            required
            onChange={(e) => setPass(e.target.value)}
          />
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

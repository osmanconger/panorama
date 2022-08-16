import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Login from "../../components/Login/Login";
import Signup from "../../components/Signup/Signup";
import { AuthContext } from "../../context/AuthProvider";
import "./Signin.css";

const Signin = () => {
  const [signinType, setSigninType] = useState("login");

  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // check if the user has authenticated through linkedin
  useEffect(() => {
    if (!user) {
      fetch(`https://api.panoramas.social/api/linkedin/auth/success`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true
        }
      })
        .then(response => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then(json => {
          setUser({ email: json.email });
          navigate("/lobby");
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }
  }, []);

  return (
    <div className="page" id="signin">
      {signinType === "signup" ? <Signup /> : <Login />}

      {signinType === "signup" ? (
        <div className="switch">
          {" "}
          Already have an account?{" "}
          <div className="link" onClick={() => setSigninType("login")}>
            {" "}
            Click here to sign in.
          </div>
        </div>
      ) : (
        <div className="switch">
          {" "}
          Don't have an account?{" "}
          <div className="link" onClick={() => setSigninType("signup")}>
            {" "}
            Click here to sign up.
          </div>
        </div>
      )}
    </div>
  );
};

export default Signin;

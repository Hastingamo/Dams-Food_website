import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logins from "../auth/Logins.js";
import Sidebars from "../Component/Sidebars.jsx";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Login(props) {
  const userRef = useRef();
  const errRef = useRef();

  const { login } = Logins();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/Dashboard";

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validEmail || !validPwd) {
      setErrMsg("Invalid email or password format");
      return;
    }

    const { user, error } = await login(email, pwd);
    if (!error) {
      setSuccess(true);
      setEmail("");
      setPwd("");
      navigate(from, { replace: true });
    } else {
      setErrMsg(error);
      errRef.current?.focus();
    }
    // console.log("Trying to login with", email, pwd);

  };

  return (
    <div className="flex flex-row">
      <Sidebars />
      <section className="ml-[86px] px-4 w-[40rem] h-fit bg-gradient-to-r from-blue-500 to-blue-300 rounded-lg shadow-lg">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
          tabIndex={-1}
        >
          {errMsg}
        </p>

        <h1 className="text-2xl font-bold">Login</h1>

        <form onSubmit={handleLogin}>
          <label htmlFor="email">
            Email:
            <div className="inline-block ml-2">
              {email && validEmail && <FontAwesomeIcon icon={faCheck} className="text-green-500" />}
              {email && !validEmail && <FontAwesomeIcon icon={faTimes} className="text-red-500" />}
            </div>
          </label>
          <input
            type="email"
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="emailnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            className="mt-2 p-2 border rounded w-full"
          />
          {email && !validEmail && (
            <p id="emailnote" className="text-white bg-black text-sm mt-1">
              <FontAwesomeIcon icon={faInfoCircle} /> Please enter a valid email address.
            </p>
          )}

          <label htmlFor="password" className="mt-4 block">
            Password:
            <div className="inline-block ml-2">
              {pwd && validPwd && <FontAwesomeIcon icon={faCheck} className="text-green-500" />}
              {pwd && !validPwd && <FontAwesomeIcon icon={faTimes} className="text-red-500" />}
            </div>
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            className="mt-2 p-2 border rounded w-full"
          />
          {pwd && !validPwd && (
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters. Must include uppercase and lowercase letters, a number, and a special character.
            </p>
          )}
        {/* {error && <p>{errMsg}</p>} */}
          <button
            type="submit"
            className="mt-4 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
            disabled={!validEmail || !validPwd}
          >
            Login
          </button>
          {}
        </form>

        <p className="mt-4">Don't have an account yet?</p>
        <button onClick={props.toggleSignUp} className="text-blue-600 underline">
          Signup
        </button>
      </section>
    </div>
  );
}

export default Login;

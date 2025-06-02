import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignUps from "../auth/SignUps.js";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebars from "../Component/Sidebars.jsx";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function SignUp(props) {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const { signUp, error } = SignUps(); // Call the hook/function to access signUp and error

  const navigate = useNavigate();
  const location = useLocation();

const from = location.state?.from?.pathname || "/Dashboard";

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [user, email, pwd, matchPwd]);

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signUp(user, email, pwd);
      if (!error) {
        setSuccess(true);
        setUser("");
        setEmail("");
        setPwd("");
        setMatchPwd("");
        navigate("/Login", { replace: true });
      } else {
        setErrMsg(error);
        errRef.current.focus();
      }
    } catch (err) {
      setErrMsg(err.message || "Sign up failed");
      errRef.current.focus();
    }
  };

  return (
    <div className="flex flex-row justify-center items-center h-screen w-screen">
      <Sidebars />
      <section className="ml-[86px] px-4 w-[40rem] h-fit bg-gradient-to-r from-blue-500 to-blue-300 rounded-lg shadow-lg">
        <p
          ref={errRef}
          className={errMsg ? "errmsg text-red-600" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <form onSubmit={handleSignOut}>
          {/* Username */}
          <label htmlFor="username">Username:</label>
          <div className="inline-block ml-2">
            {user && validName && (
              <FontAwesomeIcon icon={faCheck} className="text-green-500" />
            )}
            {user && !validName && (
              <FontAwesomeIcon icon={faTimes} className="text-red-500" />
            )}
          </div>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            aria-invalid={!validName}
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            className="mt-2 p-2 border rounded w-full"
          />
          {user && !validName && (
            <p id="uidnote" className="text-white bg-black text-sm mt-1">
              <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters. Must
              begin with a letter.
            </p>
          )}

          {/* Email */}
          <label htmlFor="email">Email:</label>
          <div className="inline-block ml-2">
            {email && validEmail && (
              <FontAwesomeIcon icon={faCheck} className="text-green-500" />
            )}
            {email && !validEmail && (
              <FontAwesomeIcon icon={faTimes} className="text-red-500" />
            )}
          </div>
          <input
            type="email"
            id="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            aria-invalid={!validEmail}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            className="mt-2 p-2 border rounded w-full"
          />
          {email && !validEmail && (
            <p id="emailnote" className="text-white bg-black text-sm mt-1">
              <FontAwesomeIcon icon={faInfoCircle} /> Please enter a valid email
              address.
            </p>
          )}

          {/* Password */}
          <label htmlFor="password">Password:</label>
          <div className="inline-block ml-2">
            {pwd && validPwd && (
              <FontAwesomeIcon icon={faCheck} className="text-green-500" />
            )}
            {pwd && !validPwd && (
              <FontAwesomeIcon icon={faTimes} className="text-red-500" />
            )}
          </div>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            aria-invalid={!validPwd}
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            className="mt-2 p-2 border rounded w-full"
          />
          {pwd && !validPwd && (
            <p id="pwdnote" className="text-white bg-black text-sm mt-1">
              <FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 characters, must
              include uppercase, lowercase, number, and a special character.
            </p>
          )}

          {/* Confirm Password */}
          <label htmlFor="confirm_pwd">Confirm Password:</label>
          <div className="inline-block ml-2">
            {matchPwd && validMatch && (
              <FontAwesomeIcon icon={faCheck} className="text-green-500" />
            )}
            {matchPwd && !validMatch && (
              <FontAwesomeIcon icon={faTimes} className="text-red-500" />
            )}
          </div>
          <input
            type="password"
            id="confirm_pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            aria-invalid={!validMatch}
            className="mt-2 p-2 border rounded w-full"
          />
          {matchPwd && !validMatch && (
            <p id="confirmnote" className="text-white bg-black text-sm mt-1">
              <FontAwesomeIcon icon={faInfoCircle} /> Must match the password.
            </p>
          )}

          <button
            disabled={!validName || !validEmail || !validPwd || !validMatch}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded w-full"
          >
            Sign up
          </button>
        </form>
        <p className="mt-4 text-white">
          Already registered?
          <br />
          <span
            className="underline cursor-pointer text-black"
            onClick={props.toggleLogin}
          >
            Sign In
          </span>
        </p>
      </section>
    </div>
  );
}

export default SignUp;

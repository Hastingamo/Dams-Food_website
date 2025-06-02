import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignUps from "../auth/SignUps.js";
import { motion } from "framer-motion";
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
    <div className="flex flex-row  h-screen w-full  overflow-hidden">
      <div className="fixed top-0 left-0 h-full w-[86px] z-10">
        <Sidebars />
      </div>{" "}
      <div className="ml-[86px] flex h-full w-[calc(100%-86px)]">
        <div className="flex  w-4/12 h-screen">
          <motion.div
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 2 }}
            initial={{ opacity: 0, scale: 0.8, x: 730 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex-1  bg-blue-300 rounded-xl shadow-md "
          >
            <h1 className="text-2xl font-bold mt-20 ">Welcome Back!</h1>
            <p className="text-gray-600">
              enter your personal detail and start your journey
            </p>
            <button
              onClick={props.toggleLogin}
              className=" underline mt-4 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded flex justify-center items-center w-1/2"
            >
              Signup
            </button>
          </motion.div>
        </div>
        <motion.div 
                  animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 2 }}
          initial={{ opacity: 0, scale: 0.8, x: -730 }}
          whileInView={{ opacity: 1, scale: 1 }}
        className="flex w-2/3  justify-center items-center p-8">
          {" "}
      <section className="w-full max-w-md h-fit">
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
                  <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters.
                  Must begin with a letter.
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
                  <FontAwesomeIcon icon={faInfoCircle} /> Please enter a valid
                  email address.
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
                  <FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 characters,
                  must include uppercase, lowercase, number, and a special
                  character.
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
                <p
                  id="confirmnote"
                  className="text-white bg-black text-sm mt-1"
                >
                  <FontAwesomeIcon icon={faInfoCircle} /> Must match the
                  password.
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
        </motion.div>
      </div>
    </div>
  );
}

export default SignUp;

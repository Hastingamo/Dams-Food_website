import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logins from "../auth/Logins.js";
import Sidebars from "../Component/Sidebars.jsx";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
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
    <div className="flex flex-row  h-screen w-full  overflow-hidden">
      <Sidebars />
      <div className="w-2/3">
        <motion.div
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 2 }}
          initial={{ opacity: 0, scale: 0.8, x: 730 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="flex bg-[#F9E4DA]  justify-center items-center p-8"
        >
          <section className="ml-[86px] w-full max-w-md h-screen rounded-lg text-black">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
              tabIndex={-1}
            >
              {errMsg}
            </p>

            <h1 className="text-center text-5xl mt-5 text-black ">Login</h1>

            <form onSubmit={handleLogin} className="mt-10">
              <label htmlFor="email" className="md:text-2xl">
                Email:
                <div className="inline-block ml-2">
                  {email && validEmail && (
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-green-500"
                    />
                  )}
                  {email && !validEmail && (
                    <FontAwesomeIcon icon={faTimes} className="text-red-500" />
                  )}
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
                className="mt-2 p-2 border rounded w-full md:text-2xl"
              />
              {email && !validEmail && (
                <p id="emailnote" className="text-white bg-black text-sm mt-1">
                  <FontAwesomeIcon icon={faInfoCircle} /> Please enter a valid
                  email address.
                </p>
              )}

              <label htmlFor="password" className="mt-4 block md:text-2xl">
                Password:
                <div className="inline-block ml-2">
                  {pwd && validPwd && (
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-green-500"
                    />
                  )}
                  {pwd && !validPwd && (
                    <FontAwesomeIcon icon={faTimes} className="text-red-500" />
                  )}
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
                className="mt-2 p-2 border rounded w-full text-2xl"
              />
              {pwd && !validPwd && (
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />8 to 24 characters.
                  Must include uppercase and lowercase letters, a number, and a
                  special character.
                </p>
              )}
              {/* {error && <p>{errMsg}</p>} */}
              <button
                type="submit"
                className="mt-4  bg-[#79826A] text-white font-bold py-2 px-4 rounded flex justify-center ml-10 items-center w-1/2"
                disabled={!validEmail || !validPwd}
              >
                Login
              </button>
              {}
            </form>

            {/* <button
              onClick={props.toggleSignUp}
              className="text-blue-600 underline"
            >
              Signup
            </button> */}
          </section>
        </motion.div>
      </div>

      <div className="flex w-2/6 h-screen">
        <motion.div
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 2 }}
          initial={{ opacity: 0, scale: 0.8, x: -730 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="flex-1  bg-[#552834] text-gray-600 rounded-xl shadow-md p-4 flex  flex-col gap-4"
        >
          <h1 className="text-color-[#E5D2B0] text-2xl md:text-4xl xl:text-5xl font-bold mt-20 text-center">
            Helllo Freind{" "}
          </h1>
          <p className="text-color-[#E5D2B0] text-[12px] md:text-[20px] lg:text-2xl md:text-center ">
            enter your personal detail <br></br>and start your journey
          </p>
          <p className="mt-4 text-center md:text-[20px] lg:text-2xl">Don't have an account yet?</p>

          <button
            onClick={props.toggleSignUp}
            className=" underline mt-4 bg-[#f7f4f4] hover:bg-blue-800 text-black font-bold py-2 px-4 rounded md:ml-14 w-1/2"
          >
            Signup
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;

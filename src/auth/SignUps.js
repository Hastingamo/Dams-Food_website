import { projectAuth } from "../firebase";

let error = null;

const signUp = async (username, email, password) => {
  error = null;
  try {
    const userCredential = await projectAuth.createUserWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (err) {
    error = err.message;
    throw new Error(error);
  }
};

const SignUps = () => {
  return { signUp, error };
};

export default SignUps;

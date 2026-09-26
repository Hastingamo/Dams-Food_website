import { projectAuth } from "../firebase";

const login = async (email, password) => {
  try {
    const userCredential = await projectAuth.signInWithEmailAndPassword(email, password);
    return { user: userCredential.user, error: null };
  } catch (err) {
    return { user: null, error: err.message };
  }
};

const Logins = () => {
  return {
    login,
  };
};

export default Logins;

import { projectAuth } from "../firebase";
const LogOut = async () => {
  try {
    await projectAuth.signOut();
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
const UserLogOut = () => {
  return {
    LogOut,
  };
};
 export default UserLogOut;
import React from "react";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { projectAuth } from "../firebase";
function FireBaseUser() {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(projectAuth, (user) => {
      if (user) {
        setUserData({
          email: user.email,
          userName: user.displayName || "No Name",
        });
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);
  return userData;

}

export default FireBaseUser;

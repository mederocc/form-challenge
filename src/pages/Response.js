import { useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useState, useLayoutEffect, useCallback } from "react";

function Response() {
  const [user, setUser] = useState({});
  const [userMapping, setUserMapping] = useState([]);
  const location = useLocation();

  const handleUserId = useCallback(async () => {
    try {
      const docRef = doc(db, "user", location.state.id);

      setUser(await getDoc(docRef));
    } catch (error) {
      console.error(error);
    }
  }, [location.state.id]);

  useLayoutEffect(() => {
    handleUserId();
  }, [handleUserId]);

  useLayoutEffect(() => {
    if (Object.keys(user).length) {
      const fileteredData = user.data();
      const mappedValues = [];
      for (let key in fileteredData) {
        mappedValues.push(
          <p>
            {key.replaceAll("_", " ")}: {String(fileteredData[key])}
          </p>
        );
      }
      setUserMapping(mappedValues);
    }
  }, [user]);

  return <>{userMapping.length ? userMapping : ""}</>;
}

export default Response;

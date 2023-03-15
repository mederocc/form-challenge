import { useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useState, useEffect, useCallback } from "react";

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

  useEffect(() => {
    handleUserId();
  }, [handleUserId]);

  useEffect(() => {
    if (Object.keys(user).length) {
      const fileteredData = user.data();
      const mappedValues = [];
      for (let key in fileteredData) {
        mappedValues.push(
          <>
            <p>
              <span className="block text-gray-500 font-bold mb-2">
                {key.replaceAll("_", " ")}:
              </span>
              {String(fileteredData[key])}
            </p>
            <br />
          </>
        );
      }
      setUserMapping(mappedValues);
    }
  }, [user]);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-50">
      <div className="	p-10  rounded-lg shadow-md m-4 text-gray-800 bg-white	">
        <h2 className="text-gray-500 text-3xl font-bold mb-2	px-8 pb-8">
          Here's your data!
        </h2>
        {userMapping.length ? userMapping : ""}
      </div>
    </div>
  );
}

export default Response;

import { useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useState, useEffect, useCallback } from "react";

function Response() {
  const [user, setUser] = useState({});
  const [userMapping, setUserMapping] = useState([]);
  const location = useLocation();

  // Recibe un id por location.state. Usa el id para encontrar registro en firestore
  const handleUserId = useCallback(async () => {
    try {
      const docRef = doc(db, "user", location.state.id);

      // Guarda el registro encontrado en variable de estado user
      setUser(await getDoc(docRef));
    } catch (error) {
      console.error(error);
    }
  }, [location.state.id]);

  useEffect(() => {
    // se ejecuta una vez
    handleUserId();
  }, [handleUserId]);

  useEffect(() => {
    if (Object.keys(user).length) {
      // Genera mapeo de jsx si user ha recibido valores
      const fileteredData = user.data();
      const mappedValues = [];
      for (let key in fileteredData) {
        mappedValues.push(
          <>
            <p className="ml-2">
              <span className="block text-gray-500 font-bold mb-2">
                {key.replaceAll("_", " ")}:
              </span>
              {String(fileteredData[key])}
            </p>
            <br />
          </>
        );
      }
      // guarda mapping con jsx de valores de user en variable de estado userMapping
      setUserMapping(mappedValues);
    }
  }, [user]);

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center bg-gray-50">
        {userMapping.length ? (
          <div className="	p-10  rounded-lg shadow-md m-4 text-gray-800 bg-white	">
            <h2 className="text-gray-500 text-3xl font-bold mb-2	px-8 pb-8">
              Here's your data!
            </h2>
            {userMapping}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Response;

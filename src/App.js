import { Route, Routes } from "react-router-dom";
import FormComponent from "./pages/Form";
import Response from "./pages/Response";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [initialValues, setInitialValues] = useState({});

  const getInitialValues = (data) => {
    const initialValuesObj = {};

    data.forEach((entry) => {
      if (entry.name) {
        initialValuesObj[entry.name] = "";
      }
      if (entry.type === "select") {
        initialValuesObj[entry.name] = entry.options[0].value;
      }
    });
    setInitialValues(initialValuesObj);
  };

  useEffect(() => {
    fetch("https://testdata-49262-default-rtdb.firebaseio.com/.json")
      .then((response) => response.json())
      .then((response) => {
        getInitialValues(response.items);
        setData(response.items);
      });
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/home"
          element={<FormComponent initialValues={initialValues} data={data} />}
        />
        <Route path="/response" element={<Response />} />
      </Routes>
    </div>
  );
}

export default App;

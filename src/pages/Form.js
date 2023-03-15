import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import CustomSelect from "../components/CustomSelect";
import * as Yup from "yup";
import debounce from "lodash/debounce";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import RedirectButton from "../components/RedirectButton";

function FormComponent({ initialValues, data }) {
  const [responseId, setResponseId] = useState("");
  const [didSubmit, setDidSubmit] = useState(false);

  // Validación según cada tipo
  const getValidationSchema = (data) => {
    const validationSchema = {};
    data.forEach((entry) => {
      if (entry.type === "checkbox" && entry.required) {
        validationSchema[entry.name] = Yup.boolean()
          .oneOf([true], "Debes aceptar los términos y condiciones")
          .required("Debes aceptar los términos y condiciones");
      }
      if (entry.type === "email") {
        validationSchema[entry.name] = Yup.string()
          .email("correo inválido")
          .required("Este campo no debe estar vacío");
      } else if (entry.required && entry.type !== "checkbox") {
        validationSchema[entry.name] = Yup.string()
          .max(30, `No debe superar los 30 caracteres`)
          .required("Este campo no debe estar vacío");
      }
    });

    return validationSchema;
  };

  // Ref a una colección "user" en Firebase. La collección "user" y su schema serán creados según el entry que reciba.
  const userCollectionRef = collection(db, "user");

  // Será ejecutado por formik on submit. Guarda el id generado en variable de estado responseId.
  const handleSubmit = async (values) => {
    try {
      const response = await addDoc(userCollectionRef, values);
      setDidSubmit(true);
      formik.resetForm({ values: initialValues, errors: {}, touched: {} });

      setResponseId(response.id);
    } catch (error) {
      console.error(error);
    }
  };

  // Inicializando formik
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validationSchema: Yup.object(getValidationSchema(data)),
    validateOnChange: false,
  });

  // Agregando debouncing a la validación de formik
  const debouncedValidate = useMemo(
    () => debounce(formik.validateForm, 500),
    [formik.validateForm]
  );

  // Hace debouncing de validación al generarse cambios
  useEffect(() => {
    debouncedValidate(formik.values);
  }, [formik.values, debouncedValidate]);

  // Elementos que irán en el form
  const formContent = (
    <>
      {
        // mapea un jsx según cada el tipo
        Object.keys(data).map((el) => {
          if (data[el].type === "select") {
            return (
              <div
                key={data[el].name}
                className="mb-10 rounded-lg shadow-md m-4 text-gray-800 bg-gray-50	p-5"
              >
                <label
                  className="text-gray-500 font-bold"
                  htmlFor={data[el].name}
                >
                  {data[el].label}
                </label>
                <CustomSelect
                  className="mt-2 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  options={data[el].options}
                  value={formik.values.country_of_origin}
                  onBlur={formik.handleBlur}
                  onChange={(value) =>
                    formik.setFieldValue(data[el].name, value.value)
                  }
                  required={data[el].required}
                />
                {formik.errors[data[el].name] &&
                formik.touched[data[el].name] ? (
                  <div>{formik.errors[data[el].name]}</div>
                ) : null}
              </div>
            );
          }

          if (data[el].name) {
            return (
              <div
                key={data[el].name}
                className="mb-10  rounded-lg shadow-md m-4 text-gray-800 bg-gray-50	p-5"
              >
                <label
                  className="md:w-2/3 block text-gray-500 font-bold mb-2 "
                  htmlFor={data[el].name}
                >
                  {data[el].label}
                </label>

                <input
                  className={`${
                    data[el].type === "checkbox"
                      ? "form-checkbox h-5 w-5 mt-2 shadow rounded "
                      : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 focus:ring-blue-500"
                  }   ${
                    formik.errors[data[el].name] &&
                    formik.touched[data[el].name] &&
                    "border-red-500 focus:border-red-500 focus:ring-red-500"
                  }`}
                  checked={formik.values[data[el].name]}
                  name={data[el].name}
                  value={formik.values[data[el].name]}
                  id={data[el].name}
                  type={data[el].type}
                  onChange={formik.handleChange}
                  required={data[el].required}
                  onBlur={formik.handleBlur}
                ></input>

                {formik.errors[data[el].name] &&
                formik.touched[data[el].name] ? (
                  <div className="text-red-700 ">
                    {formik.errors[data[el].name]}
                  </div>
                ) : null}
              </div>
            );
          }

          if (data[el].type === "submit") {
            return (
              <button
                key={data[el].name}
                className="w-full mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {data[el].label}
              </button>
            );
          }

          return null;
        })
      }
    </>
  );

  return (
    <div className="h-screen flex flex-col items-center justify-center  bg-gray-50 p-3">
      {Object.keys(data).length && !didSubmit ? (
        <form
          my-auto
          noValidate
          className="shadow-md rounded px-8 pt-6 pb-8 mb-10 mt-10 bg-white h-min-60"
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          <div>{formContent}</div>
        </form>
      ) : null}
      {didSubmit && <RedirectButton responseId={responseId} />}
    </div>
  );
}

export default FormComponent;

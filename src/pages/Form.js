import React, { useEffect, useMemo } from "react";
import { useFormik } from "formik";
import CustomSelect from "../components/CustomSelect";
import * as Yup from "yup";
import debounce from "lodash/debounce";

function FormComponent({ initialValues, data }) {
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

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log("submitted", values);

      formik.resetForm({ values: initialValues, errors: {}, touched: {} });
    },
    enableReinitialize: true,
    validationSchema: Yup.object(getValidationSchema(data)),
    validateOnChange: false,
  });

  const debouncedValidate = useMemo(
    () => debounce(formik.validateForm, 500),
    [formik.validateForm]
  );

  useEffect(() => {
    console.log("calling deboucedValidate");
    debouncedValidate(formik.values);
  }, [formik.values, debouncedValidate]);

  const formContent = (
    <>
      {Object.keys(data).map((el) => {
        if (data[el].type === "select") {
          return (
            <div key={data[el].name} className="mb-10">
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
              {formik.errors[data[el].name] && formik.touched[data[el].name] ? (
                <div>{formik.errors[data[el].name]}</div>
              ) : null}
            </div>
          );
        }

        if (data[el].name) {
          return (
            <div key={data[el].name} className="mb-10">
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

              {formik.errors[data[el].name] && formik.touched[data[el].name] ? (
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
      })}
    </>
  );

  return (
    <div className="h-screen flex items-center justify-center">
      {Object.keys(data).length ? (
        <form
          noValidate
          className="shadow-md rounded px-8 pt-6 pb-8 mb-4  bg-gray-100"
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          <div>{formContent}</div>
        </form>
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default FormComponent;

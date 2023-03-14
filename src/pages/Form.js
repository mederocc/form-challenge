import React from "react";
import { useFormik } from "formik";
import CustomSelect from "../components/CustomSelect";

function FormComponent({ initialValues, data }) {
  // console.log(data);

  // const validate = (values) => {
  //   const errors = {};

  //   data.forEach((entry) => {
  //     if (entry.required && !values[entry.name]) {
  //       errors[entry.name] = `Este campo no puede estar vacío`;
  //     }
  //   });

  //   return errors;
  // };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log("submitted", values);
    },
    enableReinitialize: true,
    // validate,
  });

  const formContent = (
    <>
      {Object.keys(data).map((el) => {
        if (data[el].type === "select") {
          return (
            <div className="mb-4">
              <label
                className="text-gray-500 font-bold"
                htmlFor={data[el].name}
              >
                {data[el].label}
              </label>
              <CustomSelect
                className="mt-2 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                options={data[el].options}
                value={data[el].options[0]}
                onChange={(value) =>
                  formik.setFieldValue(data[el].name, value.value)
                }
                required={data[el].required}
              />
              {formik.errors[data[el].name] ? (
                <div>{formik.errors[data[el].name]}</div>
              ) : null}
            </div>
          );
        }

        if (data[el].name) {
          return (
            <div className="mb-4">
              <label
                className="md:w-2/3 block text-gray-500 font-bold mb-2"
                htmlFor={data[el].name}
              >
                {data[el].label}
              </label>
              <input
                className={
                  data[el].type === "checkbox"
                    ? "form-checkbox h-5 w-5 text-gray-600 "
                    : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                }
                name={data[el].name}
                value={formik.values[data[el].name]}
                id={data[el].name}
                type={data[el].type}
                onChange={formik.handleChange}
                required={data[el].required}
              ></input>

              {formik.errors[data[el].name] ? (
                <div>{formik.errors[data[el].name]}</div>
              ) : null}
            </div>
          );
        }

        if (data[el].type === "submit") {
          return (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
          className="shadow-md rounded px-8 pt-6 pb-8 mb-4 "
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

import React from "react";
import { useFormik } from "formik";
import CustomSelect from "../components/CustomSelect";

function FormComponent({ initialValues, data }) {
  // console.log(data);

  const validate = (values) => {
    const errors = {};

    data.forEach((entry) => {
      if (entry.required && !values[entry.name]) {
        errors[entry.name] = `${entry.name} field is required`;
      }
    });

    return errors;
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log("submitted", values);
    },
    enableReinitialize: true,
    validate,
  });

  const formContent = (
    <>
      {Object.keys(data).map((el) => {
        if (data[el].type === "select") {
          return (
            <>
              <label htmlFor={data[el].name}>{data[el].label}</label>
              <CustomSelect
                options={data[el].options}
                value={data[el].options[0]}
                onChange={(value) =>
                  formik.setFieldValue(data[el].name, value.value)
                }
              />
              {formik.errors[data[el].name] ? (
                <div>{formik.errors[data[el].name]}</div>
              ) : null}
            </>
          );
        }

        if (data[el].name) {
          return (
            <>
              <label htmlFor={data[el].name}>{data[el].label}</label>
              <input
                name={data[el].name}
                value={formik.values[data[el].name]}
                id={data[el].name}
                type={data[el].type}
                onChange={formik.handleChange}
                // required={data[el].required}
              ></input>
              {formik.errors[data[el].name] ? (
                <div>{formik.errors[data[el].name]}</div>
              ) : null}
            </>
          );
        }

        if (data[el].type === "submit") {
          return <button type="submit">{data[el].label}</button>;
        }
      })}
    </>
  );

  return (
    <>
      {Object.keys(data).length ? (
        <form onSubmit={formik.handleSubmit}>{formContent}</form>
      ) : (
        "Loading"
      )}
    </>
  );
}

export default FormComponent;

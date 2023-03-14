import React from "react";
import Select from "react-select";

function CustomSelect({ onChange, options, value, className }) {
  const defaultValue = (options, value) => {
    return options ? options.find((option) => option.value === value) : "";
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "none",
    }),
  };

  return (
    <div className={className}>
      <Select
        value={defaultValue(options, value)}
        onChange={(value) => onChange(value)}
        options={options}
        placeholder="Selecciona una opción..."
        styles={customStyles}
      />
    </div>
  );
}

export default CustomSelect;

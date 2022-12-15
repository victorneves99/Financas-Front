import React from "react";

const SelectMenu = (props) => {
  const options = props.lista.map((option, index) => {
    return (
      <option key={index} value={option.value}>
        {option.label}
      </option>
    );
  });

  return (
    <div>
      <select {...props}>{options}</select>
    </div>
  );
};

export default SelectMenu;

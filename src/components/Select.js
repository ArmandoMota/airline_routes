import React from 'react';

const Select = ({ options, valueKey, titleKey, allTitle, value, onSelect }) => {
  return (
    <select onChange={onSelect}>
      <option key={value} value={value}>{allTitle}</option>
      {options.map(optionData => (
        <option key={optionData[valueKey]} value={optionData[valueKey]}>
          {optionData[titleKey]}
        </option>
      ))}
    </select>
  );
};

export default Select;
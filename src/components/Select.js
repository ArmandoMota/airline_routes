import React from 'react';

const Select = ({
  options,
  valueKey,
  titleKey,
  allTitle,
  value,
  onSelect,
  selectable,
}) => {

  const isDisabled = (option) => {
    return !selectable.find(item => {
      return item[valueKey] === option[valueKey];
    });
  };

  return (
    <select onChange={onSelect}>
      <option key={value} value={value}>{allTitle}</option>
      {options.map(optionData => (
        <option key={optionData[valueKey]} value={optionData[valueKey]}
          disabled={isDisabled(optionData)}>
          {optionData[titleKey]}
        </option>
      ))}
    </select>
  );
};

export default Select;
import React from 'react';
import PropTypes from "prop-types";



const SelectField = ({ label, id, options, required, onChange }) => {
    return (
                <div className="mb-5">
                    <label htmlFor={id}>{label}</label>
                    <select
                        required={required}
                        name={id}
                        id={id}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium outline-none focus:shadow-md"
                        onChange={onChange}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
    );
};

SelectField.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.string.isRequired,
    required: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

export default SelectField;

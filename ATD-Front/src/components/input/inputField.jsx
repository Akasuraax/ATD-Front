import React from "react";
import PropTypes from "prop-types";


const InputField = ({ label, type, name, id, pattern, minLength, placeHorlder, className, value, onChange }) => (
    <div className="mb-5">
        <label htmlFor={id}>{label}</label>
        <input
            required
            type={type}
            name={name}
            id={id}
            pattern={pattern}
            onChange={onChange}
            minLength={minLength}
            placeholder={placeHorlder}
            value={value}
            className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium outline-none focus:shadow-md ${className}`}
        />
    </div>
);

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    pattern: PropTypes.string,
    minLength: PropTypes.string,
    placeHorlder: PropTypes.string,
    className: PropTypes.string,
    value:PropTypes.string,
    onChange: PropTypes.func,
};
export default InputField;

import React from 'react';

export const TextAreaInput = ({ type, label, onChange, value, placeholder, className , cssProps }) => {

    const change = (val) => {
        onChange(val);
    };

    return (
        <div className={`form-field ${className}`} style={cssProps}>
            {label && <p className="form-field-title"> {label} </p>}
            <textarea
                type={type}
                className="form-input"
                onChange={(e) => change(e.target.value)}
                value={value}
                placeholder={placeholder || ''}
            />
        </div>
    );
};

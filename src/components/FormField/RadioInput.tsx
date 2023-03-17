import React from 'react';
import { classnames } from 'utils';

export const RadioInput: React.FC<Props> = ({ label, cssProps , className = "", value, onChange, options }) => {

    const change = () => {
        if (onChange) {
            onChange(!value);
        }
    }

    return (
        <div
            className={classnames('form-field', 'labelled-checkbox', className , "form-field-radio-block")}
            tabIndex={0}
            style={cssProps}
            role={"button"}
        >

            {label &&
                <p
                    className="form-field-title"
                    onClick={() => change()}
                >
                    {label}
                </p>
            }

            <div className='form-field-radio-options'>

                {options?.map((item, index) =>

                    <div key={`${label}-${item.value}-${index}`} className="form-field-radio-wrapper">

                        <div
                            onClick={() => change()}
                            className={classnames("form-field-radio", value === true ? "form-field-radio-selected" : "")}
                        >
                            <div className="form-field-radio-bg" />
                        </div>

                        <p className='mr-3'> {item?.label} </p>

                    </div>
                )}

            </div>

        </div>
    );
};

interface Props {
    label?: string,
    onChange?(arg?: any): void,
    value?: boolean,
    className?: string,
    type?: string,
    options?: {

        "label": string,
        "value": string

    }[],
    cssProps?: React.CSSProperties

}

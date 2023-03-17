import React from 'react';
import { classnames } from 'utils';

export const LabeledCheckbox: React.FC<Props> = ({ label, type = "checkbox", className = "", options, onChange , cssProps, ...props }) => {

    const change = ( val?: string ) => {
        if (onChange) {
            onChange( val ? val : !props.value);
        }
    }

    const CheckBoxItem: React.FC<{ label?: string, value?: string }> = ({ label, value }) => (

        <div className='d-flex'>

            {label && <p className='labelled-checkbox-p'> {label} </p>}

            <div
                className={`custom-checkbox-wrapper`}
            >

                <label
                    className="custom-checkbox" >

                    <input
                        type={"checkbox"}
                        checked={value === props.value}
                        onChange={() => change()}
                    />

                    <span className="checkmark" />

                </label>

            </div>

        </div>

    );

    return (
        <div
            className={classnames('form-field', 'labelled-checkbox', className, type === "radio" ? "form-field-radio-wrapper" : "")}
            tabIndex={0}
            style={cssProps}
            role={"button"}
        >

            {
                label &&
                <p
                    className="form-field-title"
                    onClick={() => change()}
                >
                    {label}
                </p>
            }

            <div className='form-field-radio-options labelled-checkbox-item'>

                {((options?.length || 0) > 0) ?

                    options?.map((item, index) =>

                        <CheckBoxItem

                            key={`${label}-${item.value}-${index}`}

                            label={item?.label}

                            value={item?.value}

                        />

                    )

                    :

                    <CheckBoxItem />

                }

            </div>

        </div >
    );
};

interface Props {
    label?: string,
    onChange?(arg?: any): void,
    value?: boolean,
    className?: string,
    type?: string,
    options?: { label?: string, value?: string }[],
    cssProps?: React.CSSProperties
}

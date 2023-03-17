import React, { useState } from 'react';
import { classnames } from 'utils';
import { FormField } from '.';
import { FormError } from './FormError';

export const FormFieldPhoneBox: React.FC<Props> = (
    {
        label,
        onChange,
        value,
        placeHolder,
        className = '',
        errorClass = "-",
        cssProps,
        ...props
    }
) => {

    const [focus, setFocus] = useState(false);

    const errorText = () => {
        if (typeof props.error === "string") return props.error;
        return null;
    }

    const errorTextClass = () => {
        if (typeof props.error === "string") return undefined;
        return undefined;
    }

    const errorOutput = errorText();

    return (
        <div 
            
            className='form-field'
            
            style={cssProps}

            >

            {label && <p className='form-field-title text-left'> {label} </p>}

            <div className={classnames('form-field-phone-box', className, focus && "mock-border")}>

                <FormField
                    label={undefined}
                    onlyNumber={true}
                    placeHolder={placeHolder}
                    value={value}
                    onChange={(e: any) => onChange && onChange(e)}
                    className={classnames(props.phoneClassName , "mb-0")}
                    disabled={props.disabled}
                    onFocus={()=> setFocus(true)}
                    onBlur={()=> setFocus(false)}
                    onKeyDown={(e: React.KeyboardEvent) => props.onKeyDown && props.onKeyDown(e)}
                />

            </div>

            <FormError
                condition={errorOutput !== null}
                text={errorOutput ? errorOutput : ""}
                className={classnames(errorClass, errorTextClass() && errorTextClass())}
            />

        </div>
    )
}

interface Props {
    label?: string,
    errorClass?: string,
    onChange?(arg: any): void,
    onClick?: () => void,
    value?: string,
    placeHolder?: string,
    className?: string,
    disabled?: boolean,
    readonly?: boolean,
    error?: boolean | string,
    onKeyDown?(e: React.KeyboardEvent): void,
    phoneClassName?: string,
    cssProps?: React.CSSProperties
}
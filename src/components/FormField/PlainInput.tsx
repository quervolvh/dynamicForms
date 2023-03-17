import React, { useState } from 'react';
import Eye from 'assets/svg/eye.svg';
import EyeOff from 'assets/svg/eye-off.svg';
import { FormError } from 'components';
import { classnames } from 'utils/index';
import { isNumber } from 'utils/index';

export const PlainInput: React.FC<Props> = (
    {
        type,
        label,
        onChange,
        onClick,
        value,
        placeHolder,
        className = '',
        errorClass = "-",
        onlyNumber,
        accepts,
        cssProps,
        ...props
    }
) => {

    const [visibility, setVisibility] = useState(false);

    const passwordType = visibility === true ? "text" : "password";

    const change = (val: any) => {

        if (onlyNumber) {

            if (!isNumber(val) && val !== "") {

                return

            };

            if (isNumber(val) || val === "") {

                onChange && onChange(val);

            }

            return;

        }

        if (onChange) {

            onChange(val);

        }
    };

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
            style={cssProps}
            className={
                classnames(
                    'form-field',
                    className,
                    type === 'password' && 'with-password',
                )}
        >

            {label &&

                <div className={classnames("form-field-title-block")}>

                    <>

                        <p className="form-field-title">

                            {label}

                            {props.required === false ?
                                <i className="form-field-optional"> (Optional) </i> :
                                <></>
                            }

                        </p>

                    </>

                </div>

            }

            <input
                type={type === 'password' ? passwordType : type}
                className="form-input"
                onChange={(e) => !props.disabled && change(e.target.value)}
                placeholder={placeHolder}
                readOnly={props.readonly || false}
                onKeyDown={(e) => props.onKeyDown && props.onKeyDown(e)}
                onClick={() => typeof onClick === "function" && onClick()}
                onFocus={() => props.onFocus && props.onFocus()}
                onBlur={() => props.onBlur && props.onBlur()}
                accept={accepts}
                {... (type !== "password" && { value })}
            />

            {type === 'password' &&
                <img
                    className='form-field-password-toggle'
                    src={visibility ? EyeOff : Eye}
                    onClick={() => setVisibility(prevState => !prevState)} />
            }

            <FormError
                condition={errorOutput !== null}
                text={errorOutput ? errorOutput : ""}
                className={classnames(errorClass, errorTextClass() && errorTextClass())}
                noIcon={errorTextClass() === "account-name-value" || errorTextClass() === "account-name-loader"}
            />

        </div>
    );
};

interface Props {
    type: string,
    label?: string,
    onlyNumber?: true,
    errorClass?: string,
    onChange?(arg: any): () => void,
    onClick?: () => void,
    value?: string,
    placeHolder?: string,
    className?: string,
    disabled?: boolean,
    readonly?: boolean,
    error?: boolean | string,
    onKeyDown?(e: React.KeyboardEvent): void,
    required?: boolean,
    onFocus?: () => void,
    onBlur?: () => void,
    accepts?: string,
    cssProps?: React.CSSProperties
}

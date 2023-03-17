import React, { useState } from "react";
import { Button, FormField } from "components";
import { errorItem, quickValidation } from "utils";

export const DeliveryServiceSelector: React.FC<{ engage: (e: string)=> void }> = ({ engage }) => {

    const initialState: stateType = {
        error: {},
        service: "https://api.jsonbin.io/v3/b/641442efebd26539d09034ff",
        loading: false,
        attempt: 0,
        success: undefined,
        data: undefined
    };

    const [state, setState] = useState(initialState);

    const formError = Object.values(state.error || {}).map(item => item).filter((item) => Array.isArray(item)).length > 0;

    const disabled = () => {

        if (state.attempt > 0) return formError;

        return false;

    }

    const onChanged = (e: any, field: string) => {

        const validation = quickValidation(field, e, state);

        setState((prevState) => ({ ...prevState, [field]: e, error: validation, success: undefined , data: undefined }));

    }

    const setData = (url: string, data: { [key: string]: any }) => {

        let json : any = undefined;

        if (url.includes("api.jsonbin.io")) {

            json = data?.record;

        } else {
        
            json = data;

        }

        if ( JSON.stringify(json) ) {

            const stringifiedJson = JSON.stringify(json, null, "\t")
            .replaceAll(
                "],\n\t\"", 
                "],\n\n\t\""
            );

            setState((prevState) => ({ ...prevState, data: stringifiedJson, loading: false }));

            engage(stringifiedJson);

        } else {

            setState((prevState) => ({ ...prevState, success: "Cannot parse response" , loading: false }));

        }

    };

    const process = async (url: string) => {

        setState((prevState) => ({ ...prevState, loading: true }));

        fetch(url)
            .then((response) => response.json())
            .then((data) => setData(url, data))
            .catch(() => setState((prevState) => ({ ...prevState, loading: false, success: "Cannot retrieve json from this url" })))

    }

    const preProcess = () => {

        if (state.success === true) return;

        setState((prevState) => ({ ...prevState, success: undefined, attempt: prevState.attempt + 1 }))

        if (!state?.service || state.loading) return;

        if (formError) return;

        process(state.service);

    }

    const keyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            preProcess();
        }
    }

    return (

        <>

            <div className="form-field-group mb-0">

                <FormField
                    label="Enter URL to Fetch JSON Content"
                    placeHolder={"Insert json url"}
                    value={state?.service}
                    onChange={(e) => onChanged(e, "service")}
                    error={state.attempt > 0 && errorItem(state?.error || {}, "service")}
                    onKeyDown={(e: React.KeyboardEvent) => keyDown(e)}
                    type={"plain"}
                />

                <Button
                    label={ state.loading ? "Please wait..." : "Retrieve JSON"}
                    disabled={disabled()}
                    onClick={() => preProcess()}
                />

            </div>

        </>

    )

}

type stateType = {
    service?: string,
    loading: boolean,
    attempt: number,
    error: {},
    success?: boolean | string,
    data?: string
};

import React, { useEffect, useState } from "react";
import { Button, ComponentHolder, FormField, ProgressTab } from "components";
import { quickValidation } from "utils";
import { providerFormBlock } from "types";
import { Cancel } from "./Cancel";

export const FormOutput: React.FC<{ data?: providerFormBlock, inView: boolean,}> = ({ data, inView }) => {

    const [state, setState] = useState<{
        attempt: number,
        cancelTrigger: number,
        cancelDescription?: string,
        itemInfo?: { [key: string]: number | string | {} },
        error: {},
        loading: boolean,
        step: number,
        page: number,
        [key: number]: any
    }>({
        attempt: 0,
        cancelTrigger: 0,
        error: {},
        loading: false,
        step: 0,
        page: 0,
    });

    const onChanged = (e: any, field: string, step: number) => {

        const validation = quickValidation(field, e, state?.itemInfo?.[step] || {});

        setState((prevState) => ({

            ...prevState,

            [step]: { ...(prevState?.[step] as {} || {}), [field]: e },

            error: validation,

            success: undefined

        }));

    };

    const enumTypes: {

        [key: string]: "plain" | "textarea" | "option" | "date" | "checkbox" | "image" | "phone" |
        "price-field" | "radio" | "file" | "datetime-local" | "time"

    } =

    {
        "short_text": "plain",
        "long_text": "textarea",
        "date_time": "datetime-local",
        "integer": "plain",
        "number": "price-field",
        "phone": "plain",
        "email": "plain",
        "label": "plain",
        "time": "time",
        "checkbox": "checkbox",
        "radio": "radio",
        "dropdown": "option",
        "upload": "file",
        "audio": "file",
        "video": "file",
        "date": "date",
        "image": "image"

    };

    const accepts = (type: string) => {

        if (["video", "audio", "upload"].includes(type)) {

            return ({

                "video": "video/*",

                "audio": "audio/*",

                "upload": "image/*"

            }[type])

        }

        return undefined;

    }

    const form = data;

    const goToTab = (index: number) => {

        setState((prevState) => ({ ...prevState, page: index , step: 0 }));

        window?.scrollTo({ behavior: "smooth", top: 0 });

    }

    const buttonText = (label: string) => {

        if (label.toLowerCase() === "cancel") return label;

        const currentStep = state.step + 1;

        const currentPage = state.page + 1;

        const numberOfPages = data?.pages?.length || 0;

        const numberOfSections = data?.pages[state?.page]?.sections.length || 0;

        if (numberOfSections > 0) {

            if (currentStep === numberOfSections) {

                return currentPage === numberOfPages ? "Done" : "Next Page"

            }

            return "Next Section";

        }

        return "Next"

    }

    const onClick = (

        label: string,

        message: string

    ) => {

        const text = buttonText(label).toLowerCase();

        if (text === "cancel" || text === "done") {

            setState((prevState) => ({

                ...prevState,

                cancelTrigger: prevState.cancelTrigger + 1,

                cancelDescription: message

            }));

        }

        if (text === "next page") {

            goToTab(state.page + 1);

            return;

        }

        if (text === "next section") {

            setState((prevState) => ({ ...prevState, step: prevState.step + 1 }))

            return;

        }

    }

    useEffect(() => {

        if (inView) setState((prevState) => ({ ...prevState, step: 0 }));

    }, [inView]);

    return (

        <>

            <ComponentHolder

                className={"form-field-group-holder"}

            >

                <h2 className="text-center color-darker mb-2"> {form?.meta?.name} </h2>

                <p className="text-center small-text color-darker mb-5"> {form?.meta?.Description} </p>

                <ProgressTab

                    className={"mt-5"}

                    activeIndex={state.page}

                    tabs={data?.pages?.map((item, index) => ({

                        label: item.title,

                        onClick: () => goToTab(index)

                    })) || []}

                />

                {data?.pages?.[state.page]?.sections?.map((block, index) =>

                    <React.Fragment key={`form-group-${index}`}>

                        {state.step >= index &&

                            <ComponentHolder

                                className={"form-field-group mt-5"}

                            >

                                <h2 className="text-center color-primary mb-4"> {block.name}</h2>

                                <p className="text-center color-primary mb-4 description"> {block.description} </p>

                                {block.fields.map((item, index) =>

                                    <FormField

                                        cssProps={{}}

                                        type={enumTypes[String(item?.type || "").toLowerCase()] as any}

                                        key={`${item.name}-form-field-${state.step}-${index}`}

                                        label={item.label}

                                        placeHolder={item.description}

                                        className={`${item.type}-field-${state.step}`}

                                        onChange={(e) => onChanged(e, item.id, state.step)}

                                        value={state?.[state?.step]?.[item.id] || ""}

                                        options={item.options}

                                        accepts={accepts(String(item?.type || "").toLowerCase())}

                                        onlyNumber={["number", "phone", "integer"].includes(item?.type)}

                                    />

                                )}

                                {state.step === index &&

                                    <div className="form-field-group-buttons">

                                        {form?.pages[state.page]?.actions?.map((item) =>

                                            <Button

                                                label={buttonText(item.label.toLowerCase())}

                                                key={`button-key-${item.label}`}

                                                onClick={() => onClick(item.label.toLowerCase() , item?.message || "" )}

                                            />


                                        )}

                                    </div>

                                }

                            </ComponentHolder>

                        }

                    </React.Fragment>

                )}

            </ComponentHolder>

            <Cancel 
            
                trigger={state.cancelTrigger} 
                
                description={state.cancelDescription || ""} 
                
            />

        </>

    );

}
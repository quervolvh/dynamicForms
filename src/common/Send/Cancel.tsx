import React, { useEffect, useState } from "react";
import { Button, Modal } from "components";

export const Cancel: React.FC<{ trigger?: number, description: string }> = ({ trigger, description }) => {

    const [state, setState] = useState<{
        visibility: boolean,
        description?: string,

    }>({
        visibility: false
    });

    useEffect(() => {

        if (trigger && trigger > 0) {

            setState({ description: description, visibility: true });

        }

        // eslint-disable-next-line
    }, [trigger]);

    return (

        <>

            <Modal

                visibility={state.visibility}


            >

                <>

                    <h2 className="text-center color-darker mb-2"> Cancel </h2>

                    <p className="text-center small-text color-darker mb-5"> {state?.description} </p>



                    <Button

                        label={"Continue"}

                        onClick={() => setState((prevState) => ({ ...prevState, visibility: false, description: "" }))}

                    />

                </>

            </Modal>

        </>

    );

}
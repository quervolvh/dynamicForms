import React, { useState } from 'react';
import { LandingLayout } from 'layout';
import { DeliveryServiceSelector } from 'common/Send/DeliveryServiceSelector';
import { FormOutput } from 'common/Send/FormOutput';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

const Send: React.FC<Props> = ({}) => {

    const [state, setState] = useState<{
        json?: string
    }>({});

    const onChange = React.useCallback((value) => {
        setState((prevState) => ({ ...prevState, json: value }));
    }, []);

    const engageSelection = (data: string) => {

        setState((prevState) => ({ ...prevState, json: data }));

        // router.push("send?view=fill")

    };

    return (

        <LandingLayout
            headTitle={"Assessment"}
            isMobile={false}
            deviceWidth={1500}
            showHeader={true}
            noRightLinks={true}
            bodyClass="landing"
        >

            <div className='landing-editor'>

                <DeliveryServiceSelector engage={(e) => engageSelection(e)} />

                {state.json &&

                    <CodeMirror
                        value={state.json}
                        height="200px"
                        extensions={[json()]}
                        onChange={onChange}
                    />

                }

            </div>

            {state.json &&

                <FormOutput

                    data={JSON.parse(state?.json ? state.json : "{}")}

                    inView={true}

                />

            }


        </LandingLayout >

    )
}

export default Send;

interface Props {
    currentPath: string
}

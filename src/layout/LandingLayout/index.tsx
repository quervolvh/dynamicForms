import React from 'react';
import { Header } from './header';
import { HtmlHead } from 'components';
import { classnames } from 'utils';

export const LandingLayout: React.FC<Props> = ({
    headTitle,
    isMobile,
    deviceWidth,
    showHeader = false,
    className = "",
    bodyClass,
    bodyAlignment,
    noRightLinks,
    ...props
}) => {
    return (
        <>
            <HtmlHead
                title={headTitle}
            />
            <div className={`landingLayout ${className}`}>

                {
                    showHeader &&
                    <Header
                        isMobile={isMobile}
                        noRightLinks={noRightLinks ? true : false}
                        deviceWidth={deviceWidth}
                    />
                }

                <div
                    className={classnames("landing-layout-body" , "landingLayout-body", bodyAlignment === false && "default", bodyClass && bodyClass)}
                    id={"landing-layout-body"}
                >
                    {props.children}

                </div>

            </div>
        </>
    );
}

interface Props {
    headTitle: string,
    isMobile: boolean,
    deviceWidth: number,
    shadyHeader?: boolean,
    className?: string,
    showHeader?: boolean,
    bodyAlignment?: boolean,
    noRightLinks?: boolean,
    bodyClass?: string,
    children?: React.ReactChild | React.ReactNode
}


import React from 'react';
import { FullHeader } from './FullHeader';
import { MobileHeader } from './MobileHeader';

export const Header: React.FC<Props> = ({ isMobile , noRightLinks }): JSX.Element => {

    return (
        <>

            {(isMobile) ?
                <MobileHeader noRightLinks={noRightLinks} /> :
                <FullHeader noRightLinks={noRightLinks} />
            }

        </>
    )
}
interface Props {
    isMobile: boolean,
    deviceWidth: number,
    noRightLinks: boolean
}

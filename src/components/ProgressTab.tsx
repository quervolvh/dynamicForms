import React from 'react';
import { classnames } from 'utils';

export const ProgressTab: React.FC<Props> = ({
    type,
    tabs,
    activeIndex,
    className,
    withSvg
}) => {

    return (

        <div className={classnames('progress-tab', className, type)}>

            {tabs.map((item, index) => {

                const completedActivity = Number(activeIndex || 0) >= index;

                return (

                    <div

                        key={`progress-item-${item.label}-${index}`}

                        onClick={()=> item?.onClick ? item.onClick() : null}

                        className={classnames(
                            `progress-tab-item`,
                            completedActivity && "progress-tab-item-active",
                            withSvg && `progress-tab-item-with-svg`
                        )}

                    >

                        <div className='progress-tab-item-indicator'>

                            {item.svgString ? <span dangerouslySetInnerHTML={{ __html: item.svgString }} /> : <p> {index + 1} </p>}

                        </div>

                        <p> {item.label} </p>

                    </div>

                )
            })}

            <div className={classnames('progress-tab-line' , withSvg && 'progress-tab-line-with-svg')}>

                {tabs.map((item, index) => {

                    const completedActivity = Number(activeIndex || 0) >= index;

                    return (

                        <div

                            key={`progress-tab-line-item-${index}`}

                            className={classnames(
                                
                                'progress-tab-line-item', 
                                
                                completedActivity && 'progress-tab-line-item-active'
                                
                                )}
                                
                            />

                    )

                })}


            </div>

        </div>

    )

}


interface Props {
    activeIndex?: number,
    className?: string,
    withSvg?: boolean,
    tabs: {
        label: string,
        key?: string,
        index?: number,
        svgString?: string,
        onClick?: () => void
    }[],
    type?: "basic" | "tracker"
};
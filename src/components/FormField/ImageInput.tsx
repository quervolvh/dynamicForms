import { UploadIcon } from 'components/Assets';
import React, { useState } from 'react';
import { change, setBase64 } from 'utils';

const Upload = () => {
  return <div dangerouslySetInnerHTML={{ __html: UploadIcon }}></div>;
};

export const ImageInput: React.FC<Props> = ({

  label,
  onChange,
  value,
  className,
  instruction,
  showDragDropField,
  placeHolder,
  cssProps

}) => {

  const [state, setState] = useState({
    dragVisibility: false,
    img: "",
    defaultImg: true,
  });

  const localChange = (event: any) => {

    const file = event?.file;

    if (file?.type?.includes?.("image")) {

      setState({
        img: event.base64,
        dragVisibility: false,
        defaultImg: false,
      });

      onChange && onChange({ ...event , fileName: file?.name});

    }

  };

  const onItemDrop = (event: any) => {

    event.preventDefault();

    localChange(event);

  };

  return (
    <div>
      <div className={`form-field ${className}`} style={cssProps} >
        {label && <p className="form-field-title form-field-image-title"> {label} </p>}
        <label
          className={`form-field-image ${state.dragVisibility ? 'darken' : ''} ${showDragDropField ? '' : 'hide-drop-zone'} `}
          onDragEnter={() => change(true, "dragVisibility", setState)}
          onDragLeave={() => change(false, "dragVisibility", setState)}
          onDragOver={e => e.preventDefault()}
          onDrop={e => onItemDrop(e)}
        >
          <input
            type="file"
            onChange={(event: any) => setBase64(event?.target?.files[0], localChange)}
            accept="image/*"
          />

          {!state?.img ? (
            <div className="form-field-image-none">
              <Upload />
              <p className="form-field-title"> {instruction || placeHolder || 'Upload an Image'} </p>
              <div className='button'> <span> Choose a file</span> </div>
            </div>
          ) : (
            <div className="form-field-image-yes">

              <img
                src={(typeof value === "string" ? value : value?.base64) || state.img}
                alt={'post-up'}
                className="creating-image m-0"
                loading="lazy"
              />

            </div>
          )}

          {!showDragDropField && instruction && <p> {instruction} </p>}
        </label>
      </div>
    </div>
  );
};

interface Props {

  label?: string,
  onChange?: (e: any) => void,
  value?: string | { base64?: string },
  className?: string,
  instruction?: string,
  showDragDropField?: boolean,
  placeHolder?: string,
  cssProps?: React.CSSProperties

}

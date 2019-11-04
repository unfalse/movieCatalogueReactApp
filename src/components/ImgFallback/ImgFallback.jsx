import React, {useState} from 'react';

export const ImgFallback = ({alt = '', src, srcFallback}) => {
    const [imgSrc, setSrc] = useState(src);
    const [errored, setErrored] = useState(false);
    const onError = () => {
        if (!errored) {
            setSrc(srcFallback);
            setErrored(true);
        }
    }
    return (
        <img alt={alt} src={imgSrc} onError={onError}/>
    )
};
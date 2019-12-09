import React, {useState,useEffect, FunctionComponent} from 'react';

interface Props {
    alt: string;
    src: string;
    srcFallback: string;
}

export const ImgFallback: FunctionComponent<Props> = ({alt = '', src, srcFallback}) => {
    const [imgSrc, setSrc] = useState<string>(src);
    const [errored, setErrored] = useState<boolean>(false);
    const onError = () => {
        if (!errored) {
            setSrc(srcFallback);
            setErrored(true);
        }
    }
    useEffect(() => {
        setSrc(src);
        setErrored(false);
    }, [src]);
    return (
        <img alt={alt} src={imgSrc} onError={onError}/>
    )
};
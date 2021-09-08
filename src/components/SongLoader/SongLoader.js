import { useCallback, useEffect, useRef, useState } from "react";

const SongLoader = () => {

    const element = useRef(document.createElement('div'));

    useEffect(() => {
        element.current.style.display = 'none';
        document.body.append(element.current);

        return () => {
            document.body.removeChild(element.current);
            element.current = null;
        };

    }, [null]);

    return null;

};

export default SongLoader;
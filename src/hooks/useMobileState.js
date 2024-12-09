import { useEffect, useState } from 'react';

export const useMobileState = (value) => {
    const [state, setState] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const isMobile = window.innerWidth <= 768;
            setState(isMobile ? value : false);
        };

        checkMobile();

        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, [value]);

    const toggleState = () => {
        setState((prev) => !prev);
    };

    return [state, toggleState];
};

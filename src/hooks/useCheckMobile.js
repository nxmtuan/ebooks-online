import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

const useIsMobile = () => {
    const [mobile, setMobile] = useState(isMobile);

    useEffect(() => {
        const handleResize = () => {
            setMobile(isMobile);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return mobile;
};

export default useIsMobile;

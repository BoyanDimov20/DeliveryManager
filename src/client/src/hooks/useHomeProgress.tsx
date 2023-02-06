import { useEffect, useState } from "react";
import { useIdentity } from "../services/authService";


const useHomeProgress = () => {
    const [progress, setProgress] = useState(0);
    const identity = useIdentity();


    useEffect(() => {
        const isRegistered = localStorage.getItem('registered');

        if (isRegistered == 'true') {
            setProgress(1);
        } else {
            setProgress(0);
        }
    }, [identity]);

    if (identity?.hasAtLeastOnePackageProcessed && progress < 4) {
        setProgress(4);
    }
    else if (identity?.hasAtLeastOnePackage && progress < 3) {
        setProgress(3);
    }
    else if (identity?.isAuthenticated && progress < 2) {
        setProgress(2);
    }

    return progress;
};

export default useHomeProgress;
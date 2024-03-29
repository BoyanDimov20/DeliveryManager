import Navigation from "../../components/Navigation/Navigation";

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import homeImg from '../../assets/home-img.png';
import homeImg2 from '../../assets/home-img2.png';
import { useEffect, useState, useTransition } from "react";
import useHomeProgress from "../../hooks/useHomeProgress";
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';


const Home = () => {

    const [progress, setProgress] = useState(1);

    useEffect(() => {
        for (let i = 1; i <= 4; i++) {
            setTimeout(() => {
                setProgress(i);
            }, 1000 * i);
        }
    }, []);

    const completedTasks = useHomeProgress();

    return (
        <>
            <Navigation />
            <div className="w-full flex items-start">
                <img src={homeImg} className="hidden lg:block" />
                <div className={`w-full p-12 lg:p-24`}>
                    <h2 className="font-medium leading-tight text-4xl mt-0 mb-10 text-blue-600">
                        Добре дошли в Delivery Manager!
                    </h2>
                    <Stepper orientation="vertical" activeStep={completedTasks} className="bg-white">
                        {progress >= 1 &&
                            <Step completed={completedTasks > 0} className="slide-side">
                                <StepLabel className={completedTasks == 0 ? "animate-bounce" : ""}>Направете си регистрация</StepLabel>
                            </Step>
                        }
                        {progress >= 2 &&
                            <Step completed={completedTasks > 1} className="slide-side">
                                <StepLabel className={completedTasks == 1 ? "animate-bounce" : ""}>Влезте във вашия профил</StepLabel>
                            </Step>
                        }
                        {progress >= 3 &&
                            < Step completed={completedTasks > 2} className="slide-side">
                                <StepLabel className={completedTasks == 2 ? "animate-bounce" : ""}>Изпратете вашата първа пратка</StepLabel>
                            </Step>
                        }
                        {progress == 4 &&
                            <Step completed={completedTasks > 3} className="slide-side">
                                <StepLabel className={completedTasks == 3 ? "animate-bounce" : ""}>Изчакайте одобрение :)</StepLabel>
                            </Step>
                        }
                    </Stepper>
                    <img src={homeImg2} className="absolute z-[-10] right-3 bottom-0 opacity-50" />
                </div>
            </div>

        </>
    );

};

export default Home;
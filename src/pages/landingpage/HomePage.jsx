import Button from '../../Components/buttons/Bigbutton/bigButton';
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./Homepage.module.css";
import { TypeAnimation } from 'react-type-animation';

function LandingPage() {
    const navigate = useNavigate();
    const csrftoken = localStorage.getItem('csrftoken');
    const userType = localStorage.getItem('userType');

    useEffect(() => {
        if (csrftoken && userType === "ngo") {
            navigate('/stats');
        }
    }, [csrftoken, userType, navigate]);

    return (
        <div className="z-[-2]  h-screen bg-gradient-to-b from-[#CEFBE8] to-[#0DB6A2] w-full flex flex-col items-center font-Calistoga">
        <div className="flex flex-col items-center justify-between h-[70vh] gap-5">
        <div className="flex flex-col items-center h-fit gap-2">
        <div className="mt-[100px] relative">
        <img className="w-40 absolute z-4 top-[-23px] right-[5px]" src="./images/t1.png" alt="" />
        <h2 className={`${styles.heading} font-Calistoga tracking-wider`}>Paws</h2>
        </div>
        
            <TypeAnimation
                      sequence={[
                       "Pause to save some Paws.",
                        1000,
                        " ",
                        1000,
                        "Pause to save some Paws.",
                        1000
                      ]}
                      wrapper="span"
                      speed={50}
                      style={{ fontSize: '28px', letterSpacing:'0.1rem', display: 'inline-block', fontWeight: 'bold' }}
                      repeat={Infinity}
                    />
            <div>
  {/* SAVE LIVES */}
 
                <p className= {`${styles.para} text-[24px] p-4 font-baijam drop-shadow-lg tracking-wider`}>
                    "Save lives - report injured animals to authorities. Click below to notify and make a difference."
                </p>
            </div>
            </div>
{/* BUTTON */}
            <div className="relative mt-5">
            <img className="w-40 absolute z-4 top-[-50px] right-[15px]" src="./images/t2.png" alt=""></img>
            <button
                  type='submit'
                  className="bg-gradient-to-b m-3 from-[#50f609] to-[#41d302] text-white focus:outline-none rounded-[40px] shadow-buttonShadow  py-4 font-bold tracking-widest text-[2rem] px-10"
                >
                  <Link to="/report-incident">Report</Link>
                </button>
            </div>
            
        </div>
        </div>
    );
}

export default LandingPage;

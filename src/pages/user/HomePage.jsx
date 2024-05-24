import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaStar } from 'react-icons/fa';
import { PiPawPrintFill } from "react-icons/pi";

const stars = Array.from({ length: 45 /*no of stars*/ }, (_, i) => (
    <FaStar
        key={i}
        className="absolute text-white animate-ping opacity-75"
        style={{
            top: `${Math.random() * 70}vh`,
            left: `${Math.random() * 95}vw`,
            fontSize: `${Math.random() * 1.5}rem`, /*size*/
            animationDuration: `${Math.random() * 12 + 1.1}s`, /*how long star should stay*/
        }}
    />
));

function LandingPage() {
    const navigate = useNavigate();
    const csrftoken = localStorage.getItem('csrftoken');
    const userType = localStorage.getItem('userType');
    
    useEffect(() => {
        const img = new Image();
        img.src = "./images/paws.webp";
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'manipulation';
    
        return () => {
          document.body.style.overflow = '';
          document.body.style.touchAction = '';
        };
      }, []);
    
    useEffect(() => {
        if (csrftoken && userType === "ngo") {
          navigate('/stats');
        }
      }, [csrftoken, userType, navigate]);

    return (
        <div style={{
            overflowY: 'scroll',
            height: '100vh',
            scrollbarWidth: 'thin',
            scrollbarColor: '#888 transparent',
        }}>
            <div>
    <div className="z-[-2] h-[120vh] bg-custom-gradient w-full flex flex-col items-center font-VarelaRound">
        {stars}
            <div className="flex flex-col items-center justify-between h-[70vh] gap-2.5">
                <div className="flex flex-col items-center gap-2 max-h-[650px] -mt-[40px]">
                    <div className="mt-[50px] relative">
                        <div className="absolute top-3 right-[-2rem] flex flex-row items-start">
                            <PiPawPrintFill className="text-white text-[2.2rem] transform rotate-45 " />
                            <PiPawPrintFill className="text-white text-[2rem] transform -rotate-12 mt-4" />
                        </div>
                        <h2 style={{ textShadow: '2px 4px 6px black' }} className=" text-[6rem] text-white drop-shadow-3xl font-extrabold font-VarelaRound tracking-wider`">Paws</h2>
                        <div className="absolute bottom-0 left-[-2rem] flex flex-row items-start">
                            <PiPawPrintFill className="text-white text-[2.2rem] transform rotate-45 " />
                            <PiPawPrintFill className="text-white text-[2rem] transform -rotate-12 mt-4 " />
                        </div>
                    </div>
                    <img

                        className="mx-auto my-auto h-72 backdrop-blur"
                        src="./images/paws.webp"
                        alt="Paws"
                    />
                    <p className="text-[24px] drop-shadow-3xl w-full px-4 text-center font-semibold tracking-wider h-md:hidden">Pause to save Paws</p>
                <div className="text-[18px] text-center max-width-[95%] pt-3 font-baijam drop- tracking-wider">
                    <p>
                        "Save lives - Click below to report 
                    </p>
                    <p>
                        injured animals to authorities."
                    </p>
                </div>
                {/* BUTTON */}
            <div className="">
                <button
                    type='submit'
                    className="bg-gradient-to-r from-[#f27b79] via-[#e6466c] to-[#f3285b] text-white focus:outline-none rounded-[40px] shadow-buttonShadow py-4 font-bold tracking-widest text-[2rem] px-10">
                    <Link to="/report-incident">Report</Link>
                </button>
            </div>
            </div>
            </div>
            </div>
        </div>
    </div>
);}

export default LandingPage;
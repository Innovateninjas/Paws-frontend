import React from 'react'
import  { useContext, useEffect, useState } from "react";
import InputField from "../../../../Components/shared/InputField";
import Background from "../../../../Components/shared/Background";
import './feedBack.css'
import Button from '../../../../Components/shared/Button';

const Feedback = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center border-2 '>
        <Background/>
        <div className='relative flex flex-col justify-center items-center w-full h-full '>
            <h2 className='main-head font-Calistoga tracking-wide text-[#0B0553DE] '>Feedback</h2>
        <div className='outer-main bg-opacity-15 w-[40%] h-[60%] md:w-[75%] sm:w-[80%] backdrop-blur-[6px] shadow-dashBoardCardImageShadow mb-12 flex flex-col items-center justify-evenly'>
            {/* star rating section */}
            <div className='rating-main w-[70%] gap-2'>
                <div className='rating-title font-Calistoga tracking-wide text-[#0B0553DE]'>
                   How much would you like to rate us? 
                </div>
                <div class="rate">
    <input type="radio" id="star5" className="rate" value="5" />
    <label for="star5" title="text">5 stars</label>
    <input type="radio" id="star4" className="rate" value="4" />
    <label for="star4" title="text">4 stars</label>
    <input type="radio" id="star3" className="rate" value="3" />
    <label for="star3" title="text">3 stars</label>
    <input type="radio" id="star2" className="rate" value="2" />
    <label for="star2" title="text">2 stars</label>
    <input type="radio" id="star1" className="rate" value="1" />
    <label for="star1" title="text">1 star</label>
  </div>
            </div>
            <div className='suggestion w-[70%] gap-4'>
            <div className='rating-title font-Calistoga tracking-wide text-[#0B0553DE]'>
                   Please write your suggestions below:
                </div>
                <textarea
                className="pt-3 pl-2  m-auto rounded-[10px] border-0 outline-none text-gray-800 w-[90%] h-12 "
                name="description"
               
                rows={4}
                placeholder="Describe here"
              ></textarea>
            </div>
            <div className='submit-button w-[70%] flex items-center justify-center'>
            <Button text="Submit" clas="tracking-wider md:text-[23px] md:px-5 xs:text-[20px] xs:px-5 px-14 text-white bg-gradient-to-b from-blue-600 to-blue-800 shadow-buttonShadow focus:outline-none" onClick={(e) => {
           
          }}/>
            </div>
        </div>
        </div>
        </div>
  )
}

export default Feedback
import React from "react";
import { TypeAnimation } from 'react-type-animation';
import { Link } from "react-router-dom";
import Button from "../../../Components/shared/Button";
const Success = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-custom-gradient">
      <h1 className="text-3xl font-bold no-underline">
        <div>
        Campaign created <br />  <TypeAnimation
                      sequence={[
                       "Successfully.",
                        1000,
                      ]} 
                      wrapper="span"
                      speed={0.1}
                      />

        </div>
        <div className="pt-4">
        <Button
          text={<Link to="/dashboard"> Back to dashboard</Link>}
          clas="px-7 py-3 font-semibold tracking-wider"
        />
        </div>
      </h1>
    </div>
  );
};

export default Success;

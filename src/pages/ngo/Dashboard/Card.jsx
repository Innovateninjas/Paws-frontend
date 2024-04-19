// Card.jsx
import React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { handleStatusChange } from '../../../utils/Functions/statusUpdater';



const CardItem = ({ report, index, statusOptions, toggleExpand, setReports }) => {

  const [status, setStatus] = useState(report.status || '');
  return (
    <Card
      key={report.id}
      className={`shadow-dashBoardCardShadow  ${report.expanded ? 'h-auto' : ''}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        border: '1px solid #75757575',
        backgroundImage: 'linear-gradient(to bottom ,#1E85E420,#1E85E440)',
        borderRadius: '15px',
        marginBottom: '30px',
        cursor: 'pointer',
        opacity: '0.95',
        transition: 'transform 0.3s',
        boxShadow: '0px 28.052980422973633px 28.052980422973633px 0px #1E85E426',
      }}
    >
      <CardContent >
        <div className="flex justify-center  " >
          <img
            src={report.image}
            alt={report.description}
            className="h-auto w-[18.3rem] max-h-[22rem] rounded-[17px] object-cover object-center shadow-dashBoardCardImageShadow mb-4 "
          />
        </div>
        <p >
          <span
            className="text-center  text-[25px] font-breeSerif "
          >Animal Type : </span>

          <span
            className='text-center text-[25px] font-breeSerif'>
            {report.animal_type}
          </span>
        </p>

        <p >
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${report.latitude},${report.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className='text-[#40025D] underline text-[15px] leading-relaxed ' >
            <b>Click here to get directions</b>
          </a>
        </p>
        <p className="text-[#0B0553F5] font-ChauPhilomeneOne leading-relaxed text-[17px]">
          Landmark : {report.landmark}
        </p>

        {report.expanded && (
          <>
            <p className="text-[#0B0553F5] font-ChauPhilomeneOne leading-relaxed text-[17px]" >
              Description :  {report.description}
            </p >

            <p className="text-[#0B0553F5] font-ChauPhilomeneOne leading-relaxed text-[17px]">
              Condition : {report.condition}
            </p>
            <p className="text-[#0B0553F5] font-ChauPhilomeneOne leading-relaxed text-[17px]">
              Number of Animals : {report.numberOfAnimals === "More" || report.numberOfAnimals === "more" ? "More than two" : `${report.numberOfAnimals}`}
            </p>

            <p className="text-[#0B0553F5] font-ChauPhilomeneOne leading-relaxed text-[17px]">
              Name : {report.user_name}
            </p>

            <p className="text-[#0B0553F5] font-ChauPhilomeneOne leading-relaxed text-[17px]">
              Phone Number : {report.user_phone}
            </p>

            <p className="text-[#0B0553F5] font-ChauPhilomeneOne leading-relaxed text-[17px]">
              Email : {report.user_email}
            </p>
            <p className="text-[#0B0553F5] font-ChauPhilomeneOne leading-relaxed text-[17px]">
              Reported At : {report.reported_time}
            </p>


            <p className="text-[#0B0553F5] font-ChauPhilomeneOne leading-relaxed text-[17px]">
              Status:
              <select
                value={status}
                onChange={(e) => {
                  const newStatus = e.target.value;
                  setStatus(newStatus);
                  handleStatusChange(report.id, newStatus, setReports);
                }}
              >
                {statusOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </p>
          </>
        )}
      </CardContent>
      <div  >
        <ExpandMoreIcon
          onClick={() => toggleExpand(report.id)}
          className={`absolute bottom-2 right-3 ${report.expanded ? 'rotate-180' : ''}`}
        />
      </div>
    </Card>
  );
};

export default CardItem;

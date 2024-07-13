import React from 'react';
import './RecoveredsPage.css';

const RecoveredsPage = () => {
  // Define the data for rescuers
  const rescuers = [
    {
      name: 'Ms. Lobo',
      profileImage: 'src/pages/user/RecoveredsPage/images/rescuer1.PNG',
      details: 'Saved 20+ lives',
    },
    {
      name: 'Mr. Smith',
      profileImage: 'src/pages/user/RecoveredsPage/images/rescuer2.PNG',
      details: 'Rescued 10+ wilds',
    },
    {
      name: 'Dr. Carol',
      profileImage: 'src/pages/user/RecoveredsPage/images/rescuer3.jpg',
      details: 'Healed several injureds',
    },
  ];

  return (
    <div className="recovereds-page">
        <div className="recovereds-container">
      <h1 className="title">Brave Hearts!</h1>
      <div className="rescuers">
        {rescuers.map((rescuer, index) => (
          <div key={index} className="rescuer">
            <img src={rescuer.profileImage} alt={rescuer.name} className="rescuer-image" />
            <div className="rescuer-details">
              <h2>{rescuer.name}</h2>
              <p>{rescuer.details}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="read-stories-link">
        Read <a href="/happy-recoveries">Happy Recovery Stories</a>
      </p>
    </div>
    </div>
  );
};

export default RecoveredsPage;

import React from 'react';
import './HappyRecoveriesPage.css';

const HappyRecoveriesPage = () => {
  const recoveredAnimals = [
    {
      name: 'Buddy',
      recoveryDetails: 'Buddy, the dog, was rescued by one of our dedicated rescuers. After being saved from a difficult situation, he found a loving family who adopted him and gave him a new life full of care and happiness.',
      imageUrl: './src/pages/user/RecoveredsPage/images/buddy.PNG',
      rescuer: {
        name: 'Ms. Lobo',
        photoUrl: './src/pages/user/RecoveredsPage/images/rescuer1.PNG',
      },
    },
    {
      name: 'Ash',
      recoveryDetails: 'Ash, the cat rescued from a high-rise building by one of our dedicated rescuers and treated by Dr. Carol, now thrives in a loving foster home. Her journey from peril to safety is a testament to compassion and the promise of a brighter future for every rescued animal.',
      imageUrl: './src/pages/user/RecoveredsPage/images/ash.PNG',
      rescuer: {
        name: 'Mr. Smith',
        photoUrl: './src/pages/user/RecoveredsPage/images/rescuer2.PNG',
      },
    },
    {
      name: 'Kau',
      recoveryDetails: 'Kau, a cow rescued by one of our rescuers, was found abandoned near a slaughterhouse. Nursed back to health with care and compassion, she was eventually adopted by a kind couple involved in agriculture, who provided her with a loving home on their farm.',
      imageUrl: './src/pages/user/RecoveredsPage/images/kau.PNG',
      rescuer: {
        name: 'Dr. Carol',
        photoUrl: './src/pages/user/RecoveredsPage/images/rescuer3.jpg',
      },
    },
    {
      name: 'Cherry',
      recoveryDetails: 'Cherry, the horse, was found injured and in need of help by one of our rescuers. Thanks to the dedicated care of Dr. Carol, Cherry was nursed back to health. She found a new home with a compassionate family involved in agriculture, where she now thrives and enjoys a life filled with care and comfort.',
      imageUrl: './src/pages/user/RecoveredsPage/images/cherry.PNG',
      rescuer: {
        name: 'Ms. Lobo',
        photoUrl: './src/pages/user/RecoveredsPage/images/rescuer1.PNG',
      },
    },
    {
      name: 'Luna',
      recoveryDetails: 'Luna, a dog abandoned and abused by her previous owners, was rescued by one of our dedicated rescuers. She received compassionate care and rehabilitation, thanks to the efforts of our brave hearts. Now, Luna has found a loving forever home where she is cherished and cared for, embodying the resilience and joy that come with a second chance at life.',
      imageUrl: './src/pages/user/RecoveredsPage/images/luna.PNG',
      rescuer: {
        name: 'Mr. Smith',
        photoUrl: './src/pages/user/RecoveredsPage/images/rescuer2.PNG',
      },
    },
    {
      name: 'Cotton',
      recoveryDetails: 'Cotton, a rabbit needing care, was rescued by a dedicated rescuer. Found in a situation requiring attention, Cotton received compassionate care and nurturing. Now, in a safe and loving home, Cotton hops freely, embodying resilience and joy after receiving a second chance at life..',
      imageUrl: './src/pages/user/RecoveredsPage/images/cotton.PNG',
      rescuer: {
        name: 'Dr. Carol',
        photoUrl: './src/pages/user/RecoveredsPage/images/rescuer3.jpg',
      },
    },
  ];

  return (
    <div className="happy-recoveries-page">
      <h1 className="this-title">Happy Recoveries</h1>
      <div className="cards">
        {recoveredAnimals.map((animal, index) => (
          <div key={index} className="card">
            <img src={animal.imageUrl} alt={animal.name} />
            <div className="card-desc">
              <h2 className="card-title">{animal.name}</h2>
              <p>{animal.species}</p>
              <p>{animal.recoveryDetails}</p>
              <div className="rescuer-info">
                <img src={animal.rescuer.photoUrl} alt={animal.rescuer.name} className="rescuer-photo" />
                <p className="rescuer-name">Rescued by: {animal.rescuer.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="read-more-link">
        <a href="/happy-recovery-stories">Read More Recovery Stories</a>
      </p>
    </div>
  );
};

export default HappyRecoveriesPage;

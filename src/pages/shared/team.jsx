import React from 'react';

const TeamPage = () => {
  const teamMembers = [
    {
      name: "Rishi Paul",
      position: "AI Engineer and Full Stack Developer",
      image: "https://media.licdn.com/dms/image/D5603AQFcc8_vrp3w-Q/profile-displayphoto-shrink_800_800/0/1714159671557?e=1720051200&v=beta&t=fWJEx0tXqTQdx1xN63fDZW50kS_LAZStD9TyF67le_k",
      featureText: "Tests in Production, because who needs that silly staging environment anyway?",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/rishi-paul04/",
        github: "https://github.com/rishicds"
      }
    },
    {
      name: "Aditi Ghosh",
      position: "Frontend Developer & UI/UX Designer",
      image: "https://res.cloudinary.com/dff97ky68/image/upload/v1714333558/WhatsApp_Image_2024-04-29_at_12.31.12_AM_ohouce.jpg",
      featureText: "Code Fearlessly, Innovate Relentlessly.",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/aditighosh2005",
        github: "https://github.com/GhoshAditi"
      }
    },
    {
      name: "Arnab Mondal",
      position: "Frontend Developer",
      image: "https://media.licdn.com/dms/image/D5603AQF1SG1K-VPsTg/profile-displayphoto-shrink_800_800/0/1699975516118?e=1717027200&v=beta&t=ZLzBL-4382gD16CTtZhR9aEEz6El5CBF8L_ImUUVz3w",
      featureText: "it's not a bug; it's an undocumented feature",
      socialLinks: {
        linkedin: "https://in.linkedin.com/in/arnab-mondal-117616278",
        github: "https://github.com/codewarnab"
      }
    },
    {
      name: "Sutanuka Chakraborty",
      position: "UI/UX Designer",
      image: "https://media.licdn.com/dms/image/D4D03AQHYnR-kriTWSQ/profile-displayphoto-shrink_200_200/0/1713470417629?e=1718841600&v=beta&t=CayRuA_fpxqoUydhR-bMDvhAa2bnah_9Lvm_KbsV61k",
      featureText: 'Make sure to always "make it pop"!',
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/sutanuka-chakraborty-148744275/",
      }
    },
    {
      name: "Anirban Majumdar",
      position: "Backend Developer",
      image: "https://media.licdn.com/dms/image/D5603AQG5LSd6uM5VsA/profile-displayphoto-shrink_800_800/0/1711645732216?e=1717027200&v=beta&t=rk-Gap8Q-uA7Bh-tv_mbNHX-Szhe-9yP-X7NCFlkr1Y",
      featureText: "It all starts with 0 or it's an error",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/anirbanmajumder0/",
        github: "https://github.com/anirbanmajumder0"
      }
    },
    {
      name: "Shreya Shaw",
      position: "Frontend Developer & UI/UX Designer",
      image: "https://media.licdn.com/dms/image/D5603AQFAH-ciYtM0ZA/profile-displayphoto-shrink_800_800/0/1711645818457?e=1717027200&v=beta&t=lQ0H6HJRfpEhlorEc4OhMNNC_sPgSQTDtPHgq47M9K4",
      featureText: "Code, Create, Conquer - Engineering the Future..",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/shreya-shaw/",
        github: "https://github.com/shreyashaw05"
      }
    },
    {
      name: "Debayudh Basu",
      position: "Frontend and Payments Developer",
      image: "https://media.licdn.com/dms/image/D5603AQE3L9nP5ZM_vg/profile-displayphoto-shrink_800_800/0/1708620931019?e=1717027200&v=beta&t=mJwwcnkLJNBYUAa4vzFqXGe0C4TVOAwD5iD9eJih0lY",
      featureText: "Who needs cocaine when you can sniff HTTP requests?",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/debayudh-basu-5280562b2/",
        github: "https://github.com/debayudh07"
      }
    },
    {
      name: "Chandrima Ghosh",
      position: "QA & Testing Engineer",
      image: "https://media.licdn.com/dms/image/D5603AQGQNKUH0VzDMQ/profile-displayphoto-shrink_800_800/0/1698230927367?e=1717027200&v=beta&t=7y20D_MiqLSOFHBFg-hdvxYBqnrUOiiXdIGfBCXa4qk",
      featureText: "Engineering the world differently.",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/chandrima-ghosh-476231295/",
        github: "https://github.com/chandrima25"
      }
    },
    // Add more team members as needed
  ];

  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 min-h-screen pb-4">
      <div className='mx-auto mb-2 px-8 py-8 overflow-hidden'>
        <h2 className="text-4xl font-semibold text-center mb-8 text-white">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center pb-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="z-[30] bg-white rounded-3xl bg-opacity-57 backdrop-blur-[5px] shadow-lg ring-1 ring-gray-300">
              <img className="w-50 mt-2 h-60 rounded-full border-4 border-emerald-500 mx-auto block" src={member.image} alt={member.name} />
              <div className="px-6 py-4 text-center">
                <div className="font-bold text-xl mb-2">{member.name}</div>
                <p className="text-gray-700 text-base">{member.position}</p>
                <p className="text-gray-700 text-base mt-2">{member.featureText}</p>
              </div>
              <div className="px-6 py-4 text-center mb-2">
                <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-base mt-3 text-white bg-gradient-to-b from-blue-300 to-emerald-500 focus:outline-none rounded-[30px] mr-3 px-3 py-4 bg-opacity-20 font-semibold">LinkedIn</a>
                {member.socialLinks.github && ( //Check for github
                  <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-base mt-3 text-white bg-gradient-to-b from-blue-300 to-emerald-500 focus:outline-none rounded-[30px] mr-3 px-3 py-4 bg-opacity-20 font-semibold">GitHub</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamPage;

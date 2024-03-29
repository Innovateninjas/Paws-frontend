import React from 'react';

const TeamPage = () => {
  // Sample team data
  const teamMembers = [
    {
      name: "Rishi Paul",
      position: "AI & Fullstack Developer",
      image: "https://media.licdn.com/dms/image/D5603AQH5Pdev9HMjdw/profile-displayphoto-shrink_800_800/0/1702138868459?e=1717027200&v=beta&t=67GlMCnOOMNe-dqJ5YfbeY3dgaGjQA1j935ImKW3Dyc",
      featureText: "Tests in Production, because who needs that silly staging environment anyway?",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/rishi-paul04/",
        github: "https://github.com/rishicds"
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
        name: "Debayudh Basu",
        position: "Frontend Developer",
        image: "https://media.licdn.com/dms/image/D5603AQE3L9nP5ZM_vg/profile-displayphoto-shrink_800_800/0/1708620931019?e=1717027200&v=beta&t=mJwwcnkLJNBYUAa4vzFqXGe0C4TVOAwD5iD9eJih0lY",
        featureText: "Who needs cocaine when you can sniff HTTPs requests",
        socialLinks: {
          linkedin: "https://www.linkedin.com/in/debayudh-basu-5280562b2/",
          github: "https://github.com/debayudh07"
        }
    },
    {
        name: "Shreya Shaw",
        position: "UI/UX Developer", 
        image: "https://media.licdn.com/dms/image/D5603AQFAH-ciYtM0ZA/profile-displayphoto-shrink_800_800/0/1711645818457?e=1717027200&v=beta&t=lQ0H6HJRfpEhlorEc4OhMNNC_sPgSQTDtPHgq47M9K4",
        featureText: "Code, Create, Conquer - Engineering the Future..",
        socialLinks: {
          linkedin: "https://www.linkedin.com/in/shreya-shaw/",
          github: "https://github.com/shreyashaw05"
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
        name: "Chandrima Ghosh",
        position: "Designer and QA",
        image: "https://media.licdn.com/dms/image/D5603AQGQNKUH0VzDMQ/profile-displayphoto-shrink_800_800/0/1698230927367?e=1717027200&v=beta&t=7y20D_MiqLSOFHBFg-hdvxYBqnrUOiiXdIGfBCXa4qk",
        featureText: "Engineering the world differently.",
        socialLinks: {
          linkedin: "https://www.linkedin.com/in/chandrima-ghosh-476231295/",
          github: "https://github.com/chandrima25"
        }
    }
    // Add more team members as needed
  ];

  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold text-center mb-8 text-white">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-center">
        {teamMembers.map((member, index) => (
    <div key={index} className="w-[23rem] z-[30] bg-white rounded-3xl bg-opacity-57 backdrop-blur-[5px] shadow-lg ring-1 ring-gray-300">
        <img className="w-60 mt-2 h-60 rounded-full border-4 border-emerald-500 mx-auto block" src={member.image} alt={member.name} />
        <div className="px-6 py-4 text-center">
            <div className="font-bold text-xl mb-2">{member.name}</div>
            <p className="text-gray-700 text-base">{member.position}</p>
            <p className="text-gray-700 text-base mt-2">{member.featureText}</p>
        </div>
        <div className="px-6 py-4 text-center mb-2">
            <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-base mt-3 text-white bg-gradient-to-b from-blue-300 to-emerald-500 focus:outline-none rounded-[30px] mr-3 px-3 py-4 bg-opacity-20 font-semibold">Linkedin</a>
            <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-base mt-3 text-white bg-gradient-to-b from-blue-300 to-emerald-500 focus:outline-none rounded-[30px] mr-3 px-3 py-4 bg-opacity-20 font-semibold">Github</a>
        </div>
    </div>
))}
        </div>
      </div>
    </div>
      
  );
}

export default TeamPage;

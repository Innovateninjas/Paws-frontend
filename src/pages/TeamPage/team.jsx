import React from 'react';
import Background from "../../../src/Components/backgroundComponent/Background";

const TeamPage = () => {
  // Sample team data
  const teamMembers = [
    {
      name: "Rishi Paul",
      position: "AI & Frontend Developer",
      image: "https://media.licdn.com/dms/image/D5603AQH5Pdev9HMjdw/profile-displayphoto-shrink_800_800/0/1702138868459?e=1717027200&v=beta&t=67GlMCnOOMNe-dqJ5YfbeY3dgaGjQA1j935ImKW3Dyc",
      featureText: "Tests in Production, because who needs that silly staging environment anyway?",
      socialLinks: {
        linkedin: "https://www.twitter.com",
        github: "https://www.facebook.com"
      }
    },
    {
        name: "Arnab Mondal",
        position: "Frontend Developer",
        image: "https://media.licdn.com/dms/image/D5603AQF1SG1K-VPsTg/profile-displayphoto-shrink_800_800/0/1699975516118?e=1717027200&v=beta&t=ZLzBL-4382gD16CTtZhR9aEEz6El5CBF8L_ImUUVz3w",
        featureText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        socialLinks: {
          linkedin: "https://www.twitter.com",
          github: "https://www.facebook.com"
        }
    },
    {
        name: "Debayudh Basu",
        position: "Payments Developer",
        image: "https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/expert2.png",
        featureText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        socialLinks: {
          linkedin: "https://www.twitter.com",
          github: "https://www.facebook.com"
        }
    },
    {
        name: "Shreya Shaw",
        position: "UI/UX Developer", 
        image: "https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/expert2.png",
        featureText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        socialLinks: {
          linkedin: "https://www.twitter.com",
          github: "https://www.facebook.com"
        }
    },
    {
        name: "Anirban Majumdar",
        position: "Backend Developer",
        image: "https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/expert2.png",
        featureText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        socialLinks: {
          linkedin: "https://www.twitter.com",
          github: "https://www.facebook.com"
        }
    },
    {
        name: "Chandrima Ghosh",
        position: "Designer",
        image: "https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/expert2.png",
        featureText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        socialLinks: {
          linkedin: "https://www.twitter.com",
          github: "https://www.facebook.com"
        }
    }
    // Add more team members as needed
  ];

  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold text-center mb-8 text-white">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
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

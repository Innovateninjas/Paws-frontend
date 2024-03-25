import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { FaUser, FaUserPlus} from 'react-icons/fa';
import { PiHandCoinsBold } from "react-icons/pi";
import { MdCampaign, MdHome, MdContentPasteSearch } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import { ImStatsBars } from "react-icons/im";

//function for replacing the icons with images or svg
//const NavigationAction = ({ value, to, imgSrc, key }) => {
//  const imgPath = `images/nav/${imgSrc}.png`;
//
//  return (
//    <BottomNavigationAction 
//      value={value} 
//      component={Link} 
//      to={to} 
//      icon={<img src={imgPath} alt={key} style={{width: '32px', height: '32px'}} />} 
//    />
//  );
//};


const Navbar = () => {
  const csrftoken = localStorage.getItem('csrftoken');
  const userType = localStorage.getItem('userType');
  const [value, setValue] = useState(0);
  const location = useLocation();
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    setValue(location.pathname);
    setIsScrollable(window.innerHeight < document.body.offsetHeight);
  }, [location.pathname]);

  return (
    <div className={`fixed bottom-0 left-0 w-full z-50 ${isScrollable ? 'bg-white' : 'bg-opacity-0'}`}>
    <nav className='p-0.5 bg-teal-500/25'>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        style={{
          width: '100%',
          margin: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          backgroundColor: 'transparent',
        }}
      >
        {csrftoken && userType === "user" ? (
          [
            <BottomNavigationAction key="home" value="/" component={Link} to="/" icon={<MdHome size={30}/>} />,
            <BottomNavigationAction key="campaignList" value="/campaignList" component={Link} to="/campaignList" icon={<IoPeople size={28} />} />,
            <BottomNavigationAction key="donationfront" value="/donationfront" component={Link} to="/donationfront" icon={<PiHandCoinsBold size={28} />} />,
            <BottomNavigationAction key="profile" value="/user" component={Link} to="/user" icon={<FaUser size={24} />} />,
          ]
        ) : csrftoken && userType === "ngo" ? (
          [
            <BottomNavigationAction key="stats" value="/stats" component={Link} to="/stats" icon={<ImStatsBars size={26}/>}/>,
            <BottomNavigationAction key="reports" value="/dashboard" component={Link} to="/dashboard" icon={<MdContentPasteSearch size={28}/>} />,
            <BottomNavigationAction key="createcampaign" value="/createcampaign" component={Link} to="/createcampaign" icon={<MdCampaign size={32} style={{ transform: 'rotate(-15deg)' }} />} />,
            <BottomNavigationAction key="ngoprofile" value="/ngoProfile" component={Link} to="/ngoProfile" icon={<FaUser size={24} />} />,
          ]
        )
          : (
            [
              <BottomNavigationAction key="register" value="/register" showLabel label="Register" component={Link} to="/register" icon={<FaUserPlus size={28} />} />,
              <BottomNavigationAction key="login" value="/login" showLabel label="Login" component={Link} to="/login" icon={<FaUser size={24} />} />,
            ]
          )}
      </BottomNavigation>
    </nav>
    </div>
  );
};

export default Navbar;
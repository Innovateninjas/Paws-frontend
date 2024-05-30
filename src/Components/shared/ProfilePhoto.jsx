import { useState } from "react";
import { uploadImageToCloudinary } from "../../utils/Functions/imageUploader";
import ImageUploading from "react-images-uploading";
import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { blue} from "@mui/material/colors";
import { FaCamera } from "react-icons/fa";
import { Close } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

export function ProfilePhoto({ userDetails, setUserData }) {
  const location = useLocation();
  const navigate = useNavigate();
  

  const queryParams = new URLSearchParams(location.search).get('upload') ? true : null;
  
  const [openDialog, setOpenDialog] = useState(queryParams || false);

  const [showSaveBtn, setShowSaveBtns] = useState(false);

  const [tempImg, setTempImg] = useState(userDetails.profile_image);

  const [loading , setLoading] = useState(false);

  const csrftoken = localStorage.getItem('csrftoken');

  const dataURLtoFile = (dataUrl, filename) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleProfileUpload = async (imageList) => {
    setShowSaveBtns(true);
    if (imageList.length > 0) {
      const imageData = imageList[0].data_url;
      try {
        setTempImg(imageData);
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }
  };

  const handleCancelProfile = () => {
    setOpenDialog(false);
    setShowSaveBtns(false);
    setTempImg(userDetails.profile_image);
    removeQueryParams();
  };

  // when reload/cancel/update want to remove query params
  const removeQueryParams = () => {
    if(queryParams){
      navigate(location.pathname); 
    }
    
  }

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      // for storing into db we are converting into url
      const imageUrl = await uploadImageToCloudinary(
        dataURLtoFile(tempImg, "image.png")
      );
      setUserData({ ...userDetails, profile_image: imageUrl });
      const url = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${url}/profile/`, {
        method: "POST",
        headers: {
          "Authorization": `Token ${csrftoken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profile_image: imageUrl,
        }),
      });

      setOpenDialog(false);
      setShowSaveBtns(false);
      setLoading(false);
      removeQueryParams();
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error("Error:", error);
      setOpenDialog(false);
      setLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={() => setOpenDialog(true)}
        className="rounded-[50%] shadow-dashBoardCardImageShadow flex justify-center items-center cursor-pointer relative group"
      >
        <Avatar
          alt={userDetails.name}
          src={userDetails.profile_image}
          sx={{
            color: "rgba(255,255,255,0.8)",
            width: "8rem",
            height: "8rem",
            fontSize: "3rem",
            bgcolor: blue[700],
            textTransform: "capitalize",
          }}
          
        >
          {!userDetails.profile_image && userDetails.name[0]}
        </Avatar>
        <div className="absolute rounded-[50%] top-0 left-0 z-10 w-full h-full bg-blue-900 bg-opacity-80 flex justify-center items-center opacity-0 transform  group-hover:opacity-100 transition-opacity duration-400 transition-transform">
          <div className="flex justify-center items-center flex-col text-white opacity-60 gap-1 pt-4">
            <span>Upload Photo</span>
            <FaCamera fontSize={25} />
          </div>
        </div>
      </div>

      {/* Dialog for uploading Profile */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}
      
      >
        <DialogTitle>
            <div className="flex justify-end cursor-pointer">
                <Close onClick={handleCancelProfile}/>
            </div>
        </DialogTitle>
        <DialogContent sx={{ width: '400px', height: '450px' }}>
          <div className="h-full">
            <ImageUploading
              value={[userDetails]}
              onChange={handleProfileUpload}
              dataURLKey="data_url"
            >
              {({ onImageUpload }) => (
                <div className="flex justify-around items-center flex-col w-100 h-full">
                  <div className="shadow-dashBoardCardImageShadow rounded-[50%]">
                    <Avatar
                      alt={userDetails.name}
                      src={tempImg}
                      sx={{
                        color: "rgba(255,255,255,0.8)",
                        width: "15rem",
                        height: "15rem",
                        fontSize: "5rem",
                        bgcolor: blue[700],
                        textTransform: "capitalize",
                      }}
                    >
                      {!tempImg && userDetails.name[0]}
                    </Avatar>
                  </div>

                  {/* buttons */}
                  <div className="flex gap-6">
                    <button
                      className="px-9 py-5 rounded-[35px]  drop-shadow-md shadow-buttonShadow text-[1.2rem] leading-[1.3rem] tracking-widest"
                      onClick={handleCancelProfile}
                    >
                      Cancel
                    </button>
                    {showSaveBtn ? (
                      <button
                        className="px-8 py-5 text-white bg-gradient-to-b from-green-600 to-green-700  bg-opacity-35 rounded-[35px] drop-shadow-md shadow-buttonShadow text-[1.2rem] leading-[1.3rem] tracking-widest"
                        onClick={handleSaveProfile}
                      >
                        { loading ? 'Saving...' : <div className="flex gap-2"><span>Save</span><FaCamera/></div>} 
                      </button>
                    ) : (
                      <button
                        className="flex gap-2 px-8 py-5 text-white bg-gradient-to-b from-green-600 to-green-700  bg-opacity-35 rounded-[35px] drop-shadow-md shadow-buttonShadow text-[1.2rem] leading-[1.3rem] tracking-widest"
                        onClick={onImageUpload}
                      >
                       <span>Upload</span><FaCamera/>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </ImageUploading>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

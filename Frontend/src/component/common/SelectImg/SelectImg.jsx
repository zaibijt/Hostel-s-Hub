import React, { useRef, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const SelectImg = ({ onImageUpload,image }) => {

  console.log(image,'image');

  const [imageUrl, setImageUrl] = useState(image ? image : '');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", "HostelApp");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/djwuojoue/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          setImageUrl(data.secure_url);
          onImageUpload(data.secure_url);
        } else {
          console.error("Failed to upload image");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEmpty = ()=>{
    setImageUrl('')
  }

  return (
    <>
      {loading ? (
        <Box sx={{ mt: 2 }}>
          <CircularProgress />
          <Typography>Uploading image...</Typography>
        </Box>
      ) : imageUrl ? (
        <Box sx={{ mt: 2 }}>
          <Box onClick={handleEmpty} sx={{backgroundColor:'black',borderRadius:'50%',color:'white',position:'relative',height:'28px',width:'28px',cursor:'pointer',display:'flex',justifyContent:'center',alginItems:'center',top:'20px',left:'-10px',paddingTop:'4px'}} >x</Box>
          <img src={imageUrl} alt="Preview" style={{ width: "100%" }} />
        </Box>
      ) : (
        <Box
          sx={{
            cursor: "pointer",
            border: "dashed 2px gray",
            height: "400px",
            width: "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "15px",
            flexDirection: "column",
          }}
          onClick={handleBoxClick}
        >
          <AddIcon />
          <Typography>Select Your Hostel Image</Typography>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none",
              border:'10px solid green',
             }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </Box>
      )}
    </>
  );
};

export default SelectImg;

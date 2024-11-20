import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`;

const BackButton = styled.img`
  position: absolute;
  top: 30px;
  left: 20px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const ImageWrapper = styled.label`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  position: relative;
  margin-top: 10px;

  background-color: #ffffff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
`;

const HiddenInput = styled.input`
  display: none;
`;

const SetProfileImage = () => {
  const [profileImage, setProfileImage] = useState(
    "/src/assets/images/mypage/setimage.svg"
  );
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <ProfileContainer>
      <BackButton
        src="/src/assets/images/mypage/ic_back.svg"
        alt="Back"
        onClick={handleBackClick}
      />
      <ImageWrapper htmlFor="file-input">
        <ProfileImage src={profileImage} alt="Profile" />
        <HiddenInput
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </ImageWrapper>
    </ProfileContainer>
  );
};

export default SetProfileImage;

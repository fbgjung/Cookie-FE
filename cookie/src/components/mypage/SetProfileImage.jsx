import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;

  @media (max-width: 768px) {
    margin-top: 20px;
  }

  @media (max-width: 480px) {
    margin-top: 10px;
  }
`;

const BackButton = styled.img`
  position: absolute;
  top: 30px;
  left: 20px;
  width: 24px;
  height: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    top: 20px;
    left: 15px;
    width: 20px;
    height: 20px;
  }

  @media (max-width: 480px) {
    top: 15px;
    left: 10px;
    width: 18px;
    height: 18px;
  }
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

  @media (max-width: 768px) {
    width: 90px;
    height: 90px;
    border-radius: 16px;
  }

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
    border-radius: 12px;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;

  @media (max-width: 768px) {
    border-radius: 16px;
  }

  @media (max-width: 480px) {
    border-radius: 12px;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const SetProfileImage = ({ profileImage, onChange }) => {
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onChange(imageUrl);
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
        <ProfileImage
          src={profileImage || "/src/assets/images/mypage/setdefaultImage.svg"}
          alt="Profile"
        />
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

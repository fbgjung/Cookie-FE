import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`;

const Image = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  background-color: #fff;
  background-image: ${(props) =>
    props.image
      ? `url("${props.image}")`
      : `url("/src/assets/images/defaultImage.png")`};
  background-size: cover;
  background-position: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const BadgeIcon = styled.img`
  position: absolute;
  bottom: -10px;
  right: -10px;
  width: 50px;
  height: 50px;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 10px 0;
  text-align: center;
  color: #ffffff;
  font-weight: bold;
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin: 30px;
`;

const Name = styled.h2`
  font-size: 1.2rem;
  margin: 0;
  text-align: center;
  color: #000;
`;

const ManageProfileIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 2px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const ProfileImage = ({ title, name, image, badgeIcon }) => {
  const navigate = useNavigate();
  const [isBadgeVisible, setIsBadgeVisible] = useState(true);

  console.log("이미지 프롭", image);

  const handleManageClick = () => {
    navigate("/manageprofile");
  };

  return (
    <ProfileContainer>
      {title && <Title>{title}</Title>}
      <ImageContainer>
        <Image image={image} />

        {badgeIcon && isBadgeVisible && (
          <BadgeIcon
            src={badgeIcon}
            alt=""
            onError={() => setIsBadgeVisible(false)}
          />
        )}
      </ImageContainer>
      <NameContainer>
        {name && <Name>{name}</Name>}
        <ManageProfileIcon
          src="/src/assets/images/mypage/manageprofile.svg"
          alt="Manage Profile"
          onClick={handleManageClick}
        />
      </NameContainer>
    </ProfileContainer>
  );
};

export default ProfileImage;

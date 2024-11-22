import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  background-color: #fff;
  background-image: url(${(props) => props.image || "defaultImage.png"});
  background-size: cover;
  background-position: center;
  margin-bottom: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 10px 0;
  text-align: center;
  color: #ffffff; /* 기본값으로 설정 */
  font-weight: bold;
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  margin-left: 8px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const ProfileImage = ({ title, name, image }) => {
  const navigate = useNavigate();

  const handleManageClick = () => {
    navigate("/manageprofile");
  };

  return (
    <ProfileContainer>
      {title && <Title>{title}</Title>}
      <Image image={image} />
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

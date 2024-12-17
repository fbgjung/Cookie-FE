import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuthStore from "../../stores/useAuthStore";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
`;

const Image = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 20px;
  background-color: #fff;
  background-image: ${(props) =>
    props.image
      ? `url("${props.image}")`
      : `url("/assets/images/defaultImage.png")`};
  background-size: cover;
  background-position: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const BadgeIcon = styled.img`
  position: absolute;
  bottom: -20px;
  right: -20px;
  width: 70px;

  height: 70px;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Name = styled.h2`
  font-size: 1.2rem;
  margin: 0;
  text-align: center;
  color: var(--text-wh);
`;

const ManageButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background: #f9f9f9;
  color: black;
  border: none;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #e0e0e0;
  }
`;

const getBadgeImage = (title) => {
  const badgeImages = {
    영화새싹: "/assets/images/mypage/lv1.svg",
    나쵸쟁이: "/assets/images/mypage/lv2.svg",
    영화매니아: "/assets/images/mypage/lv3.svg",
  };
  return badgeImages[title] || "/assets/images/defaultBadge.png";
};

const ProfileImage = ({ title, name, image }) => {
  const navigate = useNavigate();
  const isLogined = useAuthStore((state) => state.isLogined);
  const openLoginModal = useAuthStore((state) => state.openLoginModal);

  const getBadgeImage = (title) => {
    const badgeImages = {
      영화새싹: "/assets/images/mypage/lv1.svg",
      나쵸쟁이: "/assets/images/mypage/lv2.svg",
      영화매니아: "/assets/images/mypage/lv3.svg",
    };
    return badgeImages[title] || null; // "배지 없음"일 경우 null 반환
  };

  const badgeIcon = getBadgeImage(title);

  const handleManageClick = () => {
    if (!isLogined()) {
      openLoginModal();
      return;
    }
    navigate("/manageprofile");
  };

  console.log("제목", title);

  return (
    <ProfileContainer>
      <ImageContainer>
        <Image image={image} />
        {badgeIcon && (
          <BadgeIcon
            src={badgeIcon}
            alt={title}
            onError={(e) => (e.target.style.display = "none")}
          />
        )}
      </ImageContainer>
      <NameContainer>
        {name && <Name>{name}</Name>}
        <ManageButton onClick={handleManageClick}>
          내 정보 관리하기
        </ManageButton>
      </NameContainer>
    </ProfileContainer>
  );
};
export default ProfileImage;

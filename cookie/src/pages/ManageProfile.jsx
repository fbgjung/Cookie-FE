import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SetProfileImage from "../components/mypage/SetProfileImage";
import BadgeSelector from "../components/mypage/BadgeSelector";
import styled from "styled-components";
import NicknameInput from "../components/mypage/NicknameInput";
import SaveProfileButton from "../components/mypage/SaveProfileButton";
import { Toaster, toast } from "react-hot-toast";
import SetGenre from "../components/mypage/SetGenre";

const ManageProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
  position: relative;
  overflow-y: auto;
`;

const ManageProfileContent = styled.div`
  background-color: #ffffff;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 20px;
  z-index: 1;
  box-sizing: border-box;
  padding: 20px;
  padding-bottom: 20px;

  @media (max-width: 768px) {
    padding: 16px;
    margin-top: 15px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    margin-top: 10px;
  }

  & > *:not(:last-child) {
    margin-top: 10px;
  }
`;

const ManageProfile = () => {
  const userId = 1;
  const [profileImage, setProfileImage] = useState("");
  const [badges, setBadges] = useState([]);
  const [nickname, setNickname] = useState("");
  const [selectedBadge, setSelectedBadge] = useState("");
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const isErrorShown = useRef(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${userId}/profileData`
        );
        const { profileImage, badges, nickname } = response.data.response;

        setProfileImage(profileImage);
        setBadges(badges);
        setNickname(nickname);

        const mainBadge = badges.find((badge) => badge.main);
        if (mainBadge) {
          setSelectedBadge(mainBadge.name);
        }
      } catch (error) {
        if (!isErrorShown.current) {
          toast.error("프로필 정보를 불러오지 못했습니다!");
          isErrorShown.current = true;
        }
        console.error("Failed to fetch profile data:", error);
      }
    };

    fetchProfileData();
  }, [userId]);

  const handleSaveClick = async () => {
    // if (!isNicknameChecked) {
    //   toast.error("닉네임 중복 확인을 완료해주세요.");
    //   return;
    // }

    try {
      const requestData = {
        profileImage,
        nickname,
        mainBadge: selectedBadge,
      };

      const response = await axios.post(
        `http://localhost:8080/api/users/${userId}`,
        requestData
      );

      if (response.data.response === "SUCCESS") {
        toast.success("프로필 저장이 완료되었습니다!");
      } else {
        throw new Error("오류");
      }
    } catch (error) {
      toast.error("프로필 저장에 실패했습니다.");
      console.error("오류", error);
    }
  };

  return (
    <ManageProfileContainer>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            marginTop: "10px",
            fontSize: "1rem",
          },
        }}
      />
      <ManageProfileContent>
        <SetProfileImage
          profileImage={profileImage}
          onChange={(newImage) => setProfileImage(newImage)}
        />
        <BadgeSelector
          badges={badges}
          selectedBadge={selectedBadge}
          onBadgeChange={(updatedBadges, newSelectedBadge) => {
            setBadges(updatedBadges);
            setSelectedBadge(newSelectedBadge);
          }}
        />
        <NicknameInput
          nickname={nickname}
          onChange={(newNickname) => setNickname(newNickname)}
          onResetCheck={setIsNicknameChecked}
          isChecked={isNicknameChecked}
        />

        <SetGenre />
        <SaveProfileButton onClick={handleSaveClick} />
      </ManageProfileContent>
    </ManageProfileContainer>
  );
};

export default ManageProfile;

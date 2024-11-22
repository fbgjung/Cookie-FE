import React, { useState, useEffect } from "react";
import axios from "axios";
import SetProfileImage from "../components/mypage/SetProfileImage";
import BadgeSelector from "../components/mypage/BadgeSelector";
import styled from "styled-components";
import NicknameInput from "../components/mypage/NicknameInput";
import SaveProfileButton from "../components/mypage/SaveProfileButton";

const ManageProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
  position: relative;
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
`;

const ManageProfile = () => {
  const userId = 1; // 예시 User ID
  const [profileImage, setProfileImage] = useState("");
  const [badges, setBadges] = useState([]);
  const [nickname, setNickname] = useState("");

  // 데이터 가져오기
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${userId}/profileData`
        );
        const { profileImage, badges, nickname } = response.data.response;
        console.log(response.data.response);

        setProfileImage(profileImage);
        setBadges(badges);
        setNickname(nickname);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };

    fetchProfileData();
  }, [userId]);

  const handleSaveClick = async () => {
    try {
      // 요청 데이터 생성
      const requestData = {
        profileImage, // 프로필 이미지 URL
        nickname, // 닉네임
        mainBadge: badges.find((badge) => badge.main)?.name || "", // 메인 뱃지의 이름
      };

      // API 요청
      const response = await axios.post(
        `http://localhost:8080/api/users/${userId}`,
        requestData
      );

      // 응답 확인 및 처리
      if (response.data.response === "SUCCESS") {
        alert("프로필 저장이 완료되었습니다!");
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Failed to save profile data:", error);
      alert("프로필 저장에 실패했습니다.");
    }
  };

  return (
    <ManageProfileContainer>
      <ManageProfileContent>
        <SetProfileImage
          profileImage={profileImage}
          onChange={(newImage) => setProfileImage(newImage)}
        />
        <BadgeSelector
          badges={badges}
          onBadgeChange={(updatedBadges) => setBadges(updatedBadges)}
        />
        <NicknameInput
          nickname={nickname}
          onChange={(newNickname) => setNickname(newNickname)}
        />
        <SaveProfileButton onClick={handleSaveClick} />
      </ManageProfileContent>
    </ManageProfileContainer>
  );
};

export default ManageProfile;

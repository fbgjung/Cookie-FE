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

const handleSaveClick = () => {
  alert("프로필 이미지 저장 완료!");
};

const ManageProfile = () => {
  return (
    <ManageProfileContainer>
      <ManageProfileContent>
        <SetProfileImage />
        <BadgeSelector />
        <NicknameInput />
        <SaveProfileButton onClick={handleSaveClick} />
      </ManageProfileContent>
    </ManageProfileContainer>
  );
};

export default ManageProfile;

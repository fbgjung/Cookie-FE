import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import axiosInstance from "../api/auth/axiosInstance";
import SetProfileImage from "../components/mypage/SetProfileImage";
import BadgeSelector from "../components/mypage/BadgeSelector";
import NicknameInput from "../components/mypage/NicknameInput";
import SetGenre from "../components/mypage/SetGenre";
import SaveProfileButton from "../components/mypage/SaveProfileButton";
import Spinner from "../components/common/Spinner";

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
  const [profileImage, setProfileImage] = useState("");
  const [badges, setBadges] = useState([]);
  const [nickname, setNickname] = useState("");
  const [selectedBadge, setSelectedBadge] = useState("");
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const isErrorShown = useRef(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [initialNickname, setInitialNickname] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axiosInstance.get("/api/users/profileData");
        const { profileImage, badges, nickname, genreId } =
          response.data.response;

        setProfileImage(profileImage);
        setBadges(badges);
        setNickname(nickname);
        setSelectedGenreId(genreId);
        setProfileImage({ file: null, preview: profileImage });
        setInitialNickname(nickname);

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
  }, []);

  const handleSaveClick = async () => {
    setIsSaving(true);

    const MINIMUM_SPINNER_TIME = 200;
    const startTime = Date.now();

    try {
      if (nickname !== initialNickname && !isNicknameChecked) {
        toast.error("닉네임 중복 확인이 필요합니다.");
        setIsSaving(false);
        return;
      }

      const formData = new FormData();

      if (profileImage.file) {
        formData.append("profileImage", profileImage.file);
      }

      formData.append("nickname", nickname);

      if (selectedBadge) {
        formData.append("mainBadgeId", selectedBadge);
      }

      formData.append("genreId", selectedGenreId);

      const response = await axiosInstance.post("/api/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MINIMUM_SPINNER_TIME - elapsedTime);

      setTimeout(() => {
        if (response.data.response === "SUCCESS") {
          if (response.data.profileImageUrl) {
            setProfileImage({
              file: null,
              preview: response.data.profileImageUrl,
            });
          }
          toast.success("프로필 저장이 완료되었습니다!");
        } else {
          throw new Error("오류 발생");
        }
        setIsSaving(false);
      }, remainingTime);
    } catch (error) {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MINIMUM_SPINNER_TIME - elapsedTime);

      setTimeout(() => {
        toast.error("프로필 저장에 실패했습니다.\n다시 시도해주세요.");
        console.error("프로필 저장 실패:", error);
        setIsSaving(false);
      }, remainingTime);
    }
  };

  const handleResetCheck = (value) => {
    setIsNicknameChecked(value);
  };

  return (
    <ManageProfileContainer>
      {isSaving && <Spinner />}
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
          onChange={setNickname}
          onResetCheck={handleResetCheck}
          isChecked={isNicknameChecked}
        />
        <SetGenre
          selectedGenreId={selectedGenreId}
          onSelectGenre={(id) => setSelectedGenreId(id)}
        />
        <SaveProfileButton onClick={handleSaveClick} />
      </ManageProfileContent>
    </ManageProfileContainer>
  );
};

export default ManageProfile;

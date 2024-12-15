import { useRef, useState } from "react";
import styled from "styled-components";
import userDefaultImg from "../assets/images/signUp/user_img.svg";
import deleteBtn from "../assets/images/signUp/close_icon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../api/auth/axiosInstance";
import { FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";

const MainContainer = styled.div`
  background-color: white;
  min-height: 100vh;
  padding-top: 6rem;
`;

const BackButton = styled.button`
  position: absolute;
  top: 2rem;
  left: 1.5rem;
  background: none;
  border: none;
  color: #f84b99;
  font-size: 1.8rem;
  cursor: pointer;
  &:hover {
    color: #ffb88c;
  }
`;

const MainTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.1rem 0 0 2.5rem;
  line-height: 0.5rem;

  h2 {
    margin: 0.8rem;
    color: #f84b99;
  }

  @media (max-width: 768px) {
    margin: 1.5rem 0 0 2rem;
    h2 {
      font-size: 1.4rem;
    }
  }
`;
const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 2.5rem;

  .user__profile {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    position: relative;
  }

  .user__profile--image {
    width: 6.25rem;
    height: 6.25rem;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
    box-shadow: 0.13rem 0.19rem 0.5rem rgba(3, 6, 59, 0.2);
    &:hover {
      border: 1px solid var(--ticket-bg);
    }
  }

  .user__profile--deleteBtn {
    background-color: transparent;
    width: 1.5rem;
    height: 1.5rem;
    border: none;
    padding: 0;
    outline: none;
    cursor: pointer;
    position: absolute;
    left: 5rem;
    top: 0.8rem;
  }

  p {
    margin: 1.5rem 0 0.5rem 0;
    color: #f84b99;
    font-weight: 500;
  }

  .user__nickName {
    margin-top: 3.125rem;
    gap: 1rem;
  }
  .user__nickName div {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
  }
  .nickName__valid--text {
    color: #4a4a4a;
    padding: 0 5px;
    font-size: 1rem;

    margin: -5px 0 0 0;
  }
  .nickName__valid--btn {
    margin: 8px 0 0 0;
    background-color: ${(props) => (props.$isSelected ? "#724b2e" : "#f84b99")};
    color: ${(props) => (props.$isSelected ? "#fdf8fa" : "white")};
    border-radius: 0.75rem;
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: #c33677;
      color: white;
    }
  }
  label {
    display: block;
    font-size: 1rem;
    margin-bottom: 1rem;
    color: #f84b99;
    font-weight: 700;
  }

  input {
    display: block;
    width: 22.6rem;
    height: 3rem;
    border-radius: 0.75rem;
    border: 1px solid black;

    font-size: 1rem;
    padding: 0.5rem;
    margin-top: 0.5rem;
    background-color: white;
    color: black;
  }
  input:focus {
    border: 2px solid #c33677;
  }
  @media (max-width: 768px) {
    input {
      width: 14.5rem;
    }
    .nickName__valid--text {
      font-size: 0.9rem;
    }
  }
`;

const SubmitBtn = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 6rem;

  button {
    background-color: #f84b99;
    color: #fdf8fa;
    width: 29rem;
    height: 4rem;
    border-radius: 0.75rem;
    border: none;
    font-size: 1.2rem;
    font-weight: 700;
    outline: none;
    cursor: pointer;

    &:hover {
      background-color: #c33677;
      color: white;
    }
  }

  @media (max-width: 768px) {
    button {
      width: 20rem;
      height: 3.5rem;
    }
  }
`;

function SignUpProfile() {
  const [profileImage, setProfileImage] = useState(null);
  const [userNickname, setUserNickname] = useState("");
  const [nicknameValid, setNicknameValid] = useState(false);
  const [isDuplicateNickname, setIsDuplicateNickname] = useState(null);
  const [isCheckedNickname, setIsCheckedNickname] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const socialProvider = searchParams.get("socialProvider");
  const email = searchParams.get("email");
  const socialId = searchParams.get("socialId");
  const regex = /^(?=.*[가-힣ㄱ-ㅎㅏ-ㅣA-Za-z0-9])[가-힣A-Za-z0-9]{2,10}$/;
  const isNicknameInvalid = userNickname.length <= 1 || !nicknameValid;
  const isNicknameNotChecked = userNickname.length >= 2 && !isCheckedNickname;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const validFileTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/svg+xml",
      ];
      if (!validFileTypes.includes(file.type)) {
        toast.error(
          "지원하지 않는 파일 형식입니다. jpg, jpeg, png, svg 파일만 업로드 가능합니다."
        );
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error("파일 크기는 5MB 이하로 업로드 가능합니다.");
        return;
      }

      const fileUrl = URL.createObjectURL(file);
      setProfileImage(file);
    }
  };

  const handleImageDelete = () => {
    setProfileImage(null);
    fileInputRef.current.value = "";
  };

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setUserNickname(value);

    const isValid = value && regex.test(value);
    setNicknameValid(isValid);

    if (isValid) {
      setIsDuplicateNickname(null);
      setIsCheckedNickname(false);
    }
  };

  const handleCheckNickname = async (e) => {
    e.preventDefault();

    if (!nicknameValid || !userNickname) {
      setIsDuplicateNickname(false);
      return;
    }

    try {
      const response = await axiosInstance.get("/api/auth/check-nickname", {
        params: {
          nickname: userNickname,
        },
      });

      if (response.data.response === "SUCCESS") {
        setIsDuplicateNickname(true);
      } else if (response.data.response === "DUPLICATED_NICKNAME") {
        setIsDuplicateNickname(false);
      }
      setIsCheckedNickname(true);
    } catch (error) {
      console.error("중복 확인 실패:", error);
      setIsDuplicateNickname(false);
      setIsCheckedNickname(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userProfileData = {
      socialProvider,
      email,
      socialId,
      nickname: userNickname,
      profileImage,
    };
    navigate("/sign-up-genre", {
      state: userProfileData,
    });
  };

  return (
    <>
      <MainContainer>
        <BackButton onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </BackButton>
        <MainTitle>
          <h2>회원 정보를</h2>
          <h2>입력해주세요</h2>
        </MainTitle>
        <form onSubmit={handleSubmit}>
          <UserInfo>
            <div className="user__profile">
              <img
                className="user__profile--image"
                src={
                  profileImage
                    ? URL.createObjectURL(profileImage)
                    : userDefaultImg
                }
                alt="user_img"
                onClick={() => fileInputRef.current.click()}
              />
              <input
                type="file"
                accept="image/jpeg, image/jpg, image/png, image/svg+xml"
                ref={fileInputRef}
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              {profileImage && (
                <button
                  type="button"
                  className="user__profile--deleteBtn"
                  onClick={handleImageDelete}
                >
                  <img src={deleteBtn} alt="delete_button" />
                </button>
              )}
            </div>
            <p>프로필사진을 등록해주세요 😎</p>

            <div className="user__nickName">
              <label>
                닉네임
                <div>
                  <input
                    type="text"
                    placeholder="ex) 쿠키"
                    value={userNickname || ""}
                    onChange={handleNicknameChange}
                    maxLength={11}
                    required
                  />
                  <button
                    className="nickName__valid--btn"
                    onClick={handleCheckNickname}
                    type="button"
                    disabled={!nicknameValid || !userNickname}
                  >
                    중복확인
                  </button>
                </div>
              </label>
              {isNicknameInvalid && (
                <p className="nickName__valid--text">
                  닉네임은 2~10자 사이의 숫자, 영어, 한글만 가능해요!
                </p>
              )}

              {nicknameValid && isDuplicateNickname === false && (
                <p className="nickName__valid--text">
                  이미 사용 중인 닉네임입니다.
                </p>
              )}

              {nicknameValid && isDuplicateNickname === true && (
                <p className="nickName__valid--text">
                  사용 가능한 닉네임입니다.
                </p>
              )}
              {nicknameValid &&
                !isCheckedNickname &&
                isDuplicateNickname === null && (
                  <p className="nickName__valid--text">
                    중복확인 버튼을 눌러주세요!
                  </p>
                )}
            </div>
          </UserInfo>
          <SubmitBtn>
            <button
              type="submit"
              disabled={
                isNicknameInvalid ||
                isDuplicateNickname === false ||
                !isCheckedNickname
              }
            >
              다음
            </button>
          </SubmitBtn>
        </form>
      </MainContainer>
    </>
  );
}

export default SignUpProfile;

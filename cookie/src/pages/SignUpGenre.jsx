import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GlobalStyle from "../styles/global";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Modal from "../components/signUp/Modal";
import useNotificationStore from "../stores/notificationStore";
import serverBaseUrl from "../config/apiConfig";
import axios from "axios";
import useUserStore from "../stores/useUserStore";

const MainContainer = styled.div`
  background-color: #fff4b9;
  height: 100vh;
  padding: 4.375rem 0 0 0;
  margin: 0 auto;
`;
const MainTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 0 2.5rem;
  line-height: 0.5rem;

  h2 {
    margin: 0.8rem;
    color: #724b2e;
  }
`;

const SubTitle = styled.div`
  margin: 2.5rem 3.3rem;

  h3 {
    color: #724b2e;
    margin: 0;
  }

  p {
    color: #235b97;
    margin: 0;
    font-size: 0.9rem;
  }
`;

const GenreContainer = styled.div`
  margin: 2.5rem 3.3rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  width: 75%;
`;

const GenreBtn = styled.button`
  background-color: ${(props) => (props.$isSelected ? "#aad6e7" : "white")};
  color: ${(props) => (props.$isSelected ? "#724b2e" : "#724b2e")};
  border-radius: 12px;
  padding: 0.8rem 1rem;
  border: 1px solid #aad6e7;
  cursor: pointer;
  &:hover {
    background-color: #aad6e7;
    color: #724b2e;
  }
`;

const SubmitBtn = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15rem;

  button {
    background-color: #aad6e7;
    color: #724b2e;
    width: 29rem;
    height: 4rem;
    border-radius: 0.75rem;
    border: none;
    box-shadow: 0.5rem 0.625rem 12rem 3rem #ffeb7d;
    font-size: 1.2rem;
    font-weight: 700;
    outline: none;
    cursor: pointer;
  }
`;

function SignUpGenre() {
  const MovieGenre = [
    {
      id: 1,
      genre: "로맨스",
    },
    {
      id: 2,
      genre: "공포",
    },
    {
      id: 3,
      genre: "코미디",
    },
    {
      id: 4,
      genre: "액션",
    },
    {
      id: 5,
      genre: "판타지",
    },
    {
      id: 6,
      genre: "애니메이션",
    },
    {
      id: 7,
      genre: "범죄",
    },
    {
      id: 8,
      genre: "SF",
    },
    {
      id: 9,
      genre: "음악",
    },
    {
      id: 10,
      genre: "스릴러",
    },
    {
      id: 11,
      genre: "전쟁",
    },
    {
      id: 12,
      genre: "다큐멘터리",
    },
    {
      id: 13,
      genre: "드라마",
    },
    {
      id: 14,
      genre: "가족",
    },
    {
      id: 15,
      genre: "역사",
    },
    {
      id: 16,
      genre: "미스터리",
    },
    {
      id: 17,
      genre: "TV영화",
    },
    {
      id: 18,
      genre: "서부극",
    },
    {
      id: 19,
      genre: "모험",
    },
  ];
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const userProfileData = location.state;
  const [showModal, setShowModal] = useState(false);
  const [pushEnabled, setPushEnabled] = useState("false");
  const [emailEnabled, setEmailEnabled] = useState("false");

  const handleButtonClick = (id) => {
    setSelectedGenreId(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedGenreId) {
      alert("장르를 선택해주세요.");
      return;
    }
    setShowModal(true);
  };

  useEffect(() => {
    if (pushEnabled === "true" || emailEnabled === "true") {
      handleFormDataSubmission();
    }
  }, [pushEnabled, emailEnabled]);

  const handlePushNotification = () => {
    setPushEnabled("true");
    setEmailEnabled("false");
  };

  const handleEmailNotification = () => {
    setEmailEnabled("true");
    setPushEnabled("false");
  };

  const handleCloseModal = () => {
    setEmailEnabled("false");
    setPushEnabled("false");
    setTimeout(() => {
      handleFormDataSubmission();
    }, 0);
  };

  const handleFormDataSubmission = async () => {
    const formData = new FormData();
    formData.append("socialProvider", userProfileData.socialProvider);
    formData.append("socialId", userProfileData.socialId);
    formData.append("email", userProfileData.email);
    formData.append("nickname", userProfileData.nickname);
    formData.append("pushEnabled", pushEnabled);
    formData.append("emailEnabled", emailEnabled);
    formData.append("genreId", selectedGenreId.toString());
    formData.append("profileImage", userProfileData.profileImage);

    try {
      const response = await axios.post(
        `${serverBaseUrl}/api/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success("회원등록이 완료되었어요! 메인으로 이동할게요");

        const { accessToken } = response.data.response.token;
        if (accessToken) {
          sessionStorage.setItem("accessToken", accessToken);
          console.log("AccessToken: ", accessToken);

          const userResponse = response.data.response.user;
          const setUserInfo = useUserStore.getState().setUserInfo;
          const userInfo = {
            userId: userResponse.userId,
            nickname: userResponse.nickname,
            profileImage: userResponse.profileImage,
            genreId: userResponse.genreId,
          };
          setUserInfo(userInfo);
          console.log("저장된 유저 정보:", userInfo);

          const eventSource = new EventSource(
            `${serverBaseUrl}/api/reviews/subscribe/push-notification`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const addNotification =
            useNotificationStore.getState().addNotification;

          eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            addNotification(data);
          };

          eventSource.onerror = (error) => {
            console.error("SSE 연결 에러:", error);
            eventSource.close();
          };

          setShowModal(false);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          throw new Error("토큰 발급에 실패했습니다.");
        }
      }
    } catch (error) {
      console.error("오류 발생:", error);
      toast.error(`가입 실패: ${error.message}`);
    }
  };

  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <MainTitle>
          <h2>선호하는 장르를</h2>
          <h2>알려주세요</h2>
        </MainTitle>
        <SubTitle>
          <h3>어떤 장르를 좋아하나요?👀</h3>
          <p>좋아하는 장르 1개를 골라주세요</p>
        </SubTitle>
        <GenreContainer>
          {MovieGenre.map((item) => (
            <GenreBtn
              key={item.id}
              $isSelected={selectedGenreId === item.id}
              onClick={() => handleButtonClick(item.id)}
            >
              {item.genre}
            </GenreBtn>
          ))}
        </GenreContainer>
        <SubmitBtn>
          <button type="button" onClick={handleSubmit}>
            완료
          </button>
        </SubmitBtn>
        {showModal && (
          <Modal
            onClose={handleCloseModal}
            onPushNotification={handlePushNotification}
            onEmailNotification={handleEmailNotification}
          />
        )}
      </MainContainer>
    </>
  );
}

export default SignUpGenre;
